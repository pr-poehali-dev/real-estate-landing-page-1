import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import ContactModals, { PHONE, PHONE_DISPLAY, TG_LINK, MAX_LINK, onPhoneClick } from "@/components/ContactModals";
import LeadForm from "@/components/LeadForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LANDINGS, getLanding } from "@/data/landings";
import NotFound from "./NotFound";

const setMeta = (selector: string, attr: string, value: string, create?: () => HTMLElement) => {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el && create) { el = create(); document.head.appendChild(el); }
  el?.setAttribute(attr, value);
};

const LandingPage = () => {
  const slug = useLocation().pathname.replace(/^\/|\/$/g, "");
  const page = getLanding(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!page) return;
    const prevTitle = document.title;
    const url = `${window.location.origin}/${page.slug}`;
    document.title = page.title;
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('link[rel="canonical"]', "href", url, () => { const l = document.createElement("link"); l.rel = "canonical"; return l; });
    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "landing-ld";
    ld.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.h1,
        description: page.description,
        url,
        areaServed: "Ярославская область",
        provider: { "@type": "RealEstateAgent", name: "Фёдоров Дмитрий", telephone: "+7-916-102-27-27", address: { "@type": "PostalAddress", streetAddress: "ул. Победы, 37", addressLocality: "Ярославль", addressCountry: "RU" } },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: window.location.origin + "/" },
          { "@type": "ListItem", position: 2, name: page.short, item: url },
        ],
      },
    ]);
    document.head.appendChild(ld);
    return () => { document.title = prevTitle; ld.remove(); };
  }, [page]);

  if (!page) return <NotFound />;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <ContactModals />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[hsl(var(--border))] shadow-sm">
        <div className="w-full px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="whitespace-nowrap">
            <p className="font-body text-xs text-[hsl(var(--muted-foreground))] leading-tight">Эксперт по недвижимости</p>
            <p className="font-body text-sm font-semibold leading-tight">Фёдоров Дмитрий</p>
          </Link>
          <a href={`tel:${PHONE}`} onClick={onPhoneClick} className="px-4 py-2 bg-[var(--blue)] text-white text-sm rounded hover:bg-[var(--blue-dark)] transition-colors flex items-center gap-2 whitespace-nowrap">
            <Icon name="Phone" size={13} /> Позвонить
          </a>
        </div>
      </nav>

      <header className="pt-16 bg-[hsl(var(--foreground))]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <nav aria-label="Хлебные крошки" className="font-body text-xs text-gray-400 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-gray-300">{page.short}</span>
          </nav>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-light text-white leading-tight mb-5">{page.h1}</h1>
              <p className="font-body text-gray-300 leading-relaxed mb-8">{page.lead}</p>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${PHONE}`} onClick={onPhoneClick} className="px-6 py-3.5 bg-[var(--blue)] text-white font-body text-sm rounded hover:bg-[var(--blue-dark)] transition-colors flex items-center gap-2">
                  <Icon name="Phone" size={15} /> {PHONE_DISPLAY}
                </a>
                <a href={MAX_LINK} target="_blank" rel="noreferrer" className="px-5 py-3.5 border border-white/40 text-white font-body text-sm rounded hover:bg-white hover:text-[hsl(var(--foreground))] transition-colors flex items-center gap-2">
                  <img src="/max-logo.png" alt="MAX" width={16} height={16} className="rounded-[22%]" /> MAX
                </a>
                <a href={TG_LINK} target="_blank" rel="noreferrer" className="px-5 py-3.5 border border-white/40 text-white font-body text-sm rounded hover:bg-white hover:text-[hsl(var(--foreground))] transition-colors flex items-center gap-2">
                  <Icon name="Send" size={15} /> Telegram
                </a>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-7">
              <h2 className="font-display text-2xl text-white mb-1">{page.cta}</h2>
              <p className="font-body text-gray-400 text-sm mb-5">Перезвоню в течение 30 минут</p>
              <LeadForm darkMode source={`Страница: ${page.short}`} />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 max-w-6xl mx-auto px-6">
          <h2 className="font-display text-4xl font-light mb-10">Чем я помогу</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {page.points.map(p => (
              <div key={p.title} className="border border-[hsl(var(--border))] rounded-lg p-7 hover:border-[var(--blue)] hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded flex items-center justify-center bg-[var(--blue-light)] text-[var(--blue)] mb-4">
                  <Icon name="Check" size={18} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
                <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-[hsl(var(--secondary))]">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-4xl font-light mb-10">Как проходит работа</h2>
            <ol className="space-y-5">
              {page.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[var(--blue)] text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-body font-semibold">{s.title}</h3>
                    <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 max-w-3xl mx-auto px-6">
          <h2 className="font-display text-4xl font-light mb-8">Частые вопросы</h2>
          <Accordion type="single" collapsible className="w-full">
            {page.faq.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger className="text-left font-body text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="py-16 bg-[hsl(var(--secondary))]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-display text-3xl font-light mb-6">Другие услуги</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LANDINGS.filter(l => l.slug !== page.slug).map(l => (
                <Link key={l.slug} to={`/${l.slug}`} className="bg-white border border-[hsl(var(--border))] rounded-lg p-5 flex items-center gap-3 hover:border-[var(--blue)] hover:shadow-md transition-all">
                  <Icon name={l.icon} size={18} fallback="Home" className="text-[var(--blue)]" />
                  <span className="font-body text-sm font-medium">{l.short}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[hsl(var(--foreground))] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-body text-gray-500 text-xs">© 2025 Фёдоров Дмитрий. Ярославль, ул. Победы, 37 (этаж 1)</p>
          <Link to="/" className="font-body text-gray-400 text-xs hover:text-white transition-colors">На главную</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
