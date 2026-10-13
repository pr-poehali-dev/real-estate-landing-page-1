import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import LeadForm from "@/components/LeadForm";
import ShareButton from "@/components/ShareButton";
import { LANDINGS } from "@/data/landings";
import { PHONE, PHONE_DISPLAY, TG_LINK, MAX_LINK, onPhoneClick } from "@/components/ContactModals";
import { NAV_LINKS, MaxIcon, TelegramIcon } from "@/components/home/shared";

export default function ContactsFooter() {
  return (
    <>
    {/* CONTACTS */}
    <section id="contacts" className="py-24 bg-[hsl(var(--foreground))]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-body mb-3">Свяжитесь со мной</p>
            <h2 className="font-display text-5xl font-light text-white mb-4">Расскажите о вашей ситуации</h2>
            <p className="font-body text-gray-400 leading-relaxed mb-10">
              Я позвоню в ближайшее время, чтобы предложить решение. Даже если до этого вам везде отказывали.
            </p>
            <div className="space-y-4 mb-8">
              <a href={`tel:${PHONE}`} onClick={onPhoneClick} className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded border border-white/10 flex items-center justify-center text-white group-hover:bg-[var(--blue)] group-hover:border-[var(--blue)] transition-colors">
                  <Icon name="Phone" size={18} />
                </div>
                <div>
                  <p className="font-body text-white text-sm font-medium">{PHONE_DISPLAY}</p>
                  <p className="font-body text-gray-500 text-xs">Звонки</p>
                </div>
              </a>
              <a href={MAX_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded border border-white/10 flex items-center justify-center text-white group-hover:bg-[var(--blue)] group-hover:border-[var(--blue)] transition-colors">
                  <MaxIcon size={20} />
                </div>
                <div>
                  <p className="font-body text-white text-sm font-medium">MAX</p>
                  <p className="font-body text-gray-500 text-xs">Написать сообщение</p>
                </div>
              </a>
              <a href={TG_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded border border-white/10 flex items-center justify-center group-hover:bg-[var(--blue)] group-hover:border-[var(--blue)] transition-colors text-[#229ED9]">
                  <TelegramIcon />
                </div>
                <div>
                  <p className="font-body text-white text-sm font-medium">Telegram</p>
                  <p className="font-body text-gray-500 text-xs">Написать в мессенджер</p>
                </div>
              </a>
              <a href="mailto:89161022727@mail.ru" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded border border-white/10 flex items-center justify-center text-white group-hover:bg-[var(--blue)] group-hover:border-[var(--blue)] transition-colors">
                  <Icon name="Mail" size={18} />
                </div>
                <div>
                  <p className="font-body text-white text-sm font-medium">89161022727@mail.ru</p>
                  <p className="font-body text-gray-500 text-xs">Электронная почта</p>
                </div>
              </a>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h3 className="font-display text-2xl text-white mb-2">Оставьте заявку</h3>
            <p className="font-body text-gray-400 text-sm mb-6">Перезвоню в течение 30 минут</p>
            <LeadForm darkMode source="Форма в контактах" />
          </div>
        </div>
      </div>
    </section>

    {/* FOOTER */}
    <footer className="bg-[hsl(var(--foreground))] border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-8">
          <div>
            <p className="font-body text-white/80 text-sm font-medium mb-1">Фёдоров Дмитрий</p>
            <p className="font-body text-gray-500 text-xs leading-relaxed">Ваш специалист в сфере недвижимости.</p>
            <p className="font-body text-gray-600 text-xs mt-3">Скоро: Telegram-канал «Всё PRO-Недвижимость»</p>
            <ShareButton className="mt-4 font-body text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-2" />
          </div>
          <div>
            <p className="font-body text-white/60 text-xs uppercase tracking-wider mb-4">Контакты</p>
            <div className="space-y-2">
              <p className="font-body text-gray-400 text-sm flex items-start gap-2">
                <Icon name="MapPin" size={14} className="mt-0.5 shrink-0 text-[var(--blue)]" />
                г. Ярославль, ул. Победы, 37 (этаж 1)
              </p>
              <a href={`tel:${PHONE}`} onClick={onPhoneClick} className="font-body text-gray-400 text-sm flex items-center gap-2 hover:text-white transition-colors">
                <Icon name="Phone" size={14} className="shrink-0 text-[var(--blue)]" /> {PHONE_DISPLAY}
              </a>
              <a href="mailto:89161022727@mail.ru" className="font-body text-gray-400 text-sm flex items-center gap-2 hover:text-white transition-colors">
                <Icon name="Mail" size={14} className="shrink-0 text-[var(--blue)]" /> 89161022727@mail.ru
              </a>
            </div>
          </div>
          <div>
            <p className="font-body text-white/60 text-xs uppercase tracking-wider mb-4">Разделы</p>
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="font-body text-xs text-gray-500 hover:text-white/70 transition-colors">{l.label}</a>
              ))}
              {LANDINGS.map(l => (
                <Link key={l.slug} to={`/${l.slug}`} className="font-body text-xs text-gray-500 hover:text-white/70 transition-colors">{l.short}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-body text-gray-600 text-xs">© 2025 Фёдоров Дмитрий. Все права защищены.</p>
          <p className="font-body text-gray-600 text-xs">Риэлтор в Ярославле</p>
        </div>
      </div>
    </footer>
    </>
  );
}
