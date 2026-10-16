import {defineConfig, createServer} from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import {componentTagger} from "pp-tagger";
import {LANDINGS} from "./src/data/landings";

const SITE = "https://rieltor-yaroslavl.ru";
const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const prerenderLandings = {
    name: "prerender-landings",
    apply: "build" as const,
    enforce: "post" as const,
    generateBundle(_: unknown, bundle: Record<string, any>) {
        const tplAsset = bundle["index.html"];
        if (!tplAsset || tplAsset.type !== "asset") return;
        const tpl = String(tplAsset.source);
        for (const l of LANDINGS) {
            const url = `${SITE}/${l.slug}`;
            const ld = JSON.stringify([
                {"@context": "https://schema.org", "@type": "Service", name: l.h1, description: l.description, url, areaServed: "Ярославская область",
                    provider: {"@type": "RealEstateAgent", name: "Фёдоров Дмитрий", telephone: "+7-916-102-27-27"}},
                {"@context": "https://schema.org", "@type": "FAQPage", mainEntity: l.faq.map(f => ({"@type": "Question", name: f.q, acceptedAnswer: {"@type": "Answer", text: f.a}}))},
                {"@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
                    {"@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/`},
                    {"@type": "ListItem", position: 2, name: l.short, item: url},
                ]},
            ]).replace(/</g, "\\u003c");
            let html = tpl
                .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(l.title)}</title>`)
                .replace(/<meta name="description" content="[^"]*"\/?>/, `<meta name="description" content="${esc(l.description)}"/>`)
                .replace(/<link rel="canonical" href="[^"]*"\/?>/, `<link rel="canonical" href="${url}"/>`)
                .replace(/<meta property="og:url" content="[^"]*"\/?>/, `<meta property="og:url" content="${url}"/>`)
                .replace(/<meta property="og:title" content="[^"]*"\/?>/, `<meta property="og:title" content="${esc(l.title)}"/>`)
                .replace(/<meta property="og:description" content="[^"]*"\/?>/, `<meta property="og:description" content="${esc(l.description)}"/>`)
                .replace(/<meta name="twitter:title" content="[^"]*"\/?>/, `<meta name="twitter:title" content="${esc(l.title)}"/>`)
                .replace(/<meta name="twitter:description" content="[^"]*"\/?>/, `<meta name="twitter:description" content="${esc(l.description)}"/>`);
            html = html.replace("</head>", `<script type="application/ld+json" id="prerender-ld">${ld}</script>\n</head>`);
            html = html.replace('<div id="root"></div>', `<div id="root"><h1>${esc(l.h1)}</h1><p>${esc(l.lead)}</p></div>`);
            (this as any).emitFile({type: "asset", fileName: `${l.slug}/index.html`, source: html});
        }
    },
};

const prerenderApp = (() => {
    let outDir = "";
    let root = "";
    return {
        name: "prerender-app",
        apply: "build" as const,
        enforce: "post" as const,
        configResolved(c: any) {
            root = c.root;
            outDir = path.resolve(c.root, c.build.outDir);
        },
        async closeBundle() {
            let server: any;
            try {
                server = await createServer({
                    root,
                    configFile: false,
                    mode: "production",
                    logLevel: "error",
                    appType: "custom",
                    plugins: [],
                    esbuild: {jsx: "automatic", jsxDev: false},
                    resolve: {alias: {"@": path.resolve(root, "./src")}},
                    server: {middlewareMode: true, hmr: false, ws: false},
                });
                const {render} = await server.ssrLoadModule("/src/entry-server.tsx");
                const targets = [{url: "/", file: "index.html"}, ...LANDINGS.map(l => ({url: `/${l.slug}`, file: `${l.slug}/index.html`}))];
                for (const t of targets) {
                    const file = path.join(outDir, t.file);
                    if (!fs.existsSync(file)) continue;
                    const html = render(t.url);
                    if (!html || html.length < 500) continue;
                    const src = fs.readFileSync(file, "utf-8");
                    const out = src.replace(/<div id="root">[\s\S]*?<\/div>(?=\s*<script|\s*\n|\s*<\/body)/, () => `<div id="root">${html}</div>`);
                    if (out !== src) fs.writeFileSync(file, out);
                }
            } catch (e) {
                console.warn("[prerender-app] пропущено:", (e as Error).message);
            } finally {
                if (server) await server.close();
            }
        },
    };
})();

// HMR-сокет превью рвёт инфраструктура: ingress-nginx на каждом reload
// конфига (захват/освобождение любого dev-пода) через 30 с закрывает все
// соединения старых воркеров; DDoS Guard режет «тихие» соединения. Сам vite
// на любой обрыв перезагружает страницу. Плагин держит превью живым:
// - сервер шлёт состояние «boot:seq» сразу после каждой рассылки клиентам
//   (update, full-reload, error...) и раз в 5-9 с — это и двусторонний
//   keepalive для DDoS Guard (рандом — чтобы не ловить его фильтр одинаковых
//   интервалов). boot меняется на рестарте vite, seq — на каждой рассылке;
// - клиент (скрипт в index.html) подменяет сокет vite-hmr «вечным»: на
//   обрыве тихо переподключается и перезагружает страницу, только если за
//   время разрыва сервер рестартовал или что-то разослал. Не переподключился
//   с трёх попыток — отдаёт обрыв vite, дальше как раньше (ждёт сервер и
//   перезагружает).
// Клиентский ping понижен до 7 с через server.hmr.timeout ниже.
const hmrClient = `(() => {
    const NativeWebSocket = WebSocket;
    class HmrSocket extends EventTarget {
        OPEN = 1;
        readyState = 0;
        state = "";
        queue = [];
        constructor(url, protocols) {
            super();
            this.url = url;
            this.protocols = protocols;
            this.connect(0);
        }
        connect(attempt) {
            const ws = this.ws = new NativeWebSocket(this.url, this.protocols);
            let fresh = true;
            ws.onopen = () => {
                attempt = 0;
                this.queue.splice(0).forEach((data) => ws.send(data));
                if (this.readyState === 0) {
                    this.readyState = 1;
                    this.dispatchEvent(new Event("open"));
                }
            };
            ws.onmessage = (event) => {
                if (event.data.includes('"ezst:hmr"')) {
                    const state = JSON.parse(event.data).data;
                    if (fresh && this.state && this.state !== state) return location.reload();
                    fresh = false;
                    this.state = state;
                }
                this.dispatchEvent(new MessageEvent("message", {data: event.data}));
            };
            ws.onclose = (event) => {
                if (this.readyState === 3) return;
                if (!this.state || attempt === 3) {
                    this.readyState = 3;
                    return this.dispatchEvent(new CloseEvent("close", event));
                }
                setTimeout(() => this.connect(attempt + 1), attempt * 1000);
            };
        }
        send(data) {
            if (this.ws.readyState === 1) this.ws.send(data);
            else this.queue.push(data);
        }
        close(code, reason) {
            this.readyState = 3;
            this.ws.close(code, reason);
        }
    }
    window.WebSocket = new Proxy(NativeWebSocket, {
        construct: (target, args) => args[1] === "vite-hmr" ? new HmrSocket(...args) : new target(...args),
    });
})();`;

const hmrKeepalive = {
    name: 'hmr-ws-keepalive',
    apply: 'serve' as const,
    configureServer(server: any) {
        const boot = Date.now().toString(36);
        let seq = 0;
        const state = () => ({type: 'custom', event: 'ezst:hmr', data: `${boot}:${seq}`});
        const broadcast = server.ws.send.bind(server.ws);
        server.ws.send = (...args: any[]) => {
            seq++;
            broadcast(...args);
            broadcast(state());
        };
        server.ws.on('connection', (socket: any) => socket.send(JSON.stringify(state())));
        let timer: ReturnType<typeof setTimeout> | null = null;
        const tick = () => {
            broadcast(state());
            timer = setTimeout(tick, 5000 + Math.floor(Math.random() * 4000));
        };
        timer = setTimeout(tick, 5000 + Math.floor(Math.random() * 4000));
        server.httpServer?.on('close', () => {
            if (timer) clearTimeout(timer);
        });
    },
    transformIndexHtml: () => [{tag: 'script', children: hmrClient, injectTo: 'head-prepend' as const}],
};

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
    plugins: [
        react(),
        hmrKeepalive,
        prerenderLandings,
        prerenderApp,
        mode === 'development' &&
        componentTagger(),
    ].filter(Boolean),
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        allowedHosts: true,
        hmr: {
            overlay: false, // Disables the error overlay if you only want console errors
            timeout: 7000, // pingInterval @vite/client — нужен <30s для DDoS Guard
        }
    },
}));
