import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PHONE, PHONE_DISPLAY, TG_LINK, MAX_LINK, onPhoneClick } from "@/components/ContactModals";
import { NAV_LINKS, MaxIcon, TelegramIcon } from "@/components/home/shared";

const HERO_PHOTO = "/hero.jpg";

export default function HeroHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
    {/* NAV */}
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[hsl(var(--border))] shadow-sm">
      <div className="w-full px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3 shrink-0">
          <div className="whitespace-nowrap">
            <p className="font-body text-xs text-[hsl(var(--muted-foreground))] leading-tight">Эксперт по недвижимости</p>
            <p className="font-body text-sm font-semibold text-[hsl(var(--foreground))] leading-tight">Фёдоров Дмитрий</p>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-center">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="nav-link text-[13px] xl:text-sm font-body text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors whitespace-nowrap">
              {l.label}
            </a>
          ))}
        </div>
        <a href={`tel:${PHONE}`} onClick={onPhoneClick} className="hidden lg:flex shrink-0 px-4 py-2 bg-[var(--blue)] text-white text-[13px] xl:text-sm rounded hover:bg-[var(--blue-dark)] transition-colors items-center gap-2 whitespace-nowrap">
          <Icon name="Phone" size={13} /> Позвонить
        </a>
        <button className="lg:hidden" onClick={() => setMobileOpen(v => !v)} aria-label="Меню">
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[hsl(var(--border))] px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm font-body text-[hsl(var(--foreground))]">{l.label}</a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href={`tel:${PHONE}`} onClick={onPhoneClick} className="flex-1 py-2.5 bg-[var(--blue)] text-white text-sm rounded text-center flex items-center justify-center gap-2">
              <Icon name="Phone" size={14} /> Позвонить
            </a>
            <a href={MAX_LINK} target="_blank" rel="noreferrer" className="flex-1 py-2.5 border border-[hsl(var(--border))] text-sm rounded text-center flex items-center justify-center gap-2">
              <MaxIcon /> MAX
            </a>
            <a href={TG_LINK} target="_blank" rel="noreferrer" className="flex-1 py-2.5 border border-[hsl(var(--border))] text-sm rounded text-center flex items-center justify-center gap-2">
              <TelegramIcon /> Telegram
            </a>
          </div>
        </div>
      )}
    </nav>

    {/* HERO */}
    <section id="hero" className="pt-16 min-h-screen flex flex-col">
      <div className="flex-1 relative overflow-hidden flex">
        <img src={HERO_PHOTO} alt="Передача ключей от квартиры" width={1800} height={1004} fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "70% center" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,27,51,0.92) 0%, rgba(11,27,51,0.75) 40%, rgba(11,27,51,0.2) 75%, rgba(11,27,51,0) 100%)" }} />
        <div className="relative flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 w-full max-w-3xl">
          <p className="animate-fade-up text-xs uppercase tracking-[0.2em] text-blue-300 font-body mb-5">
            Ярославль · Россия · Турция · ОАЭ
          </p>
          <h1 className="animate-fade-up-delay-1 font-display text-6xl md:text-7xl font-light leading-[1.05] mb-5 text-white">
            <span className="sr-only">Риэлтор в Ярославле: </span>Фёдоров<br/><span className="text-blue-300">Дмитрий</span>
          </h1>
          <a href={`tel:${PHONE}`} onClick={onPhoneClick} className="animate-fade-up-delay-1 inline-flex items-center gap-2 font-body text-base text-white/80 hover:text-white transition-colors mb-5 w-fit">
            <Icon name="Phone" size={16} />{PHONE_DISPLAY}
          </a>
          <p className="animate-fade-up-delay-2 font-body text-base text-white/80 leading-relaxed mb-8 max-w-sm">
            Решаю нестандартные задачи. Одобряю ипотеку с плохой кредитной историей. Продажа новостроек со скидкой.
          </p>
          <div className="animate-fade-up-delay-3 flex flex-wrap gap-3">
            <a href={`tel:${PHONE}`} onClick={onPhoneClick} className="px-7 py-3.5 bg-[var(--blue)] text-white font-body text-sm rounded hover:bg-[var(--blue-dark)] transition-colors flex items-center gap-2">
              <Icon name="Phone" size={15} /> Позвонить
            </a>
            <a href={MAX_LINK} target="_blank" rel="noreferrer" className="px-6 py-3.5 border border-white/40 text-white font-body text-sm rounded hover:bg-white hover:text-[hsl(var(--foreground))] transition-colors flex items-center gap-2">
              <MaxIcon /> MAX
            </a>
            <a href={TG_LINK} target="_blank" rel="noreferrer" className="px-6 py-3.5 border border-white/40 text-white font-body text-sm rounded hover:bg-white hover:text-[hsl(var(--foreground))] transition-colors flex items-center gap-2">
              <TelegramIcon /> Telegram
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-[hsl(var(--border))]">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-[hsl(var(--border))]">
          {[["200+", "сделок закрыто"], ["5+ лет", "опыта в недвижимости"], ["Россия · Турция · ОАЭ", "география работы"]].map(([n, l]) => (
            <div key={n} className="px-6 first:pl-0 last:pr-0 text-center">
              <p className="font-display text-xl font-semibold text-[var(--blue)]">{n}</p>
              <p className="font-body text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
