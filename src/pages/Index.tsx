import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import SeoFaq from "@/components/SeoFaq";
import LeadForm from "@/components/LeadForm";
import { Link } from "react-router-dom";
import { LANDINGS } from "@/data/landings";
import ContactModals, { PHONE, PHONE_DISPLAY, TG_LINK, MAX_LINK, onPhoneClick, openContactModal } from "@/components/ContactModals";

const AGENT_PHOTO = "/agent.jpg";
const BONUS_PHOTO = "/bonus.jpg";
const HERO_PHOTO = "/hero.jpg";
const REVIEWS_URL = "https://functions.poehali.dev/b82c2320-1454-44af-b158-49b8e3ca37df";


const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Проблемы", href: "#problems" },
  { label: "География", href: "#geography" },
  { label: "Обо мне", href: "#about" },
  { label: "Бонусы", href: "#bonus" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Новости", href: "#news" },
  { label: "Контакты", href: "#contacts" },
];

const PROBLEMS = [
  {
    icon: "AlertCircle",
    fear: "«Мне везде отказывают в ипотеке...»",
    solution: "Работают профессиональные ипотечные брокеры: подаём заявки сразу во все банки-партнёры и находим вариант с максимальным шансом одобрения — даже при плохой кредитной истории или «серых» доходах.",
    tag: "Ипотека с плохой историей",
  },
  {
    icon: "BadgePercent",
    fear: "«Хочу новостройку, но бюджет ограничен»",
    solution: "Партнёрские скидки от застройщиков снижают цену ниже, чем в офисе продаж. Работаем со всеми видами ипотеки: стандартной, военной, семейной, льготной.",
    tag: "Скидки на новостройки",
  },
  {
    icon: "ShieldCheck",
    fear: "«Куплю ли я кота в мешке?»",
    solution: "Работаем через договор! Полная юридическая проверка объекта и собственников. Предоставляем гарантийный сертификат на\u00A010\u00A0000\u00A0000\u00A0рублей.",
    tag: "Гарантия 10 млн ₽",
  },
];

const SERVICES = [
  {
    icon: "Building2",
    title: "Новостройки",
    desc: "Поиск ликвидных ЖК. Доступ к закрытым акциям застройщиков. Все виды ипотеки: стандартная, военная, семейная, льготная. Партнёрские скидки ниже рынка.",
  },
  {
    icon: "Home",
    title: "Вторичное жильё",
    desc: "Профессиональная оценка рыночной стоимости. Продажа в сжатые сроки при максимальной цене. Полное юридическое сопровождение и безопасное проведение сделки.",
  },
  {
    icon: "Trees",
    title: "Дома и участки",
    desc: "Инженерно-геологический анализ участка и юридическая проверка документов. Подбор проверенного подрядчика: сотрудничаем с более чем 30 организациями по строительству домов.",
  },
  {
    icon: "Briefcase",
    title: "Коммерческая",
    desc: "Офисы, склады, торговые помещения. Анализ инвестиционной привлекательности. Оценка арендного потока и доходности объекта под ключ.",
  },
];

const GEO_ITEMS = [
  {
    icon: "MapPin",
    title: "Ярославль и область",
    desc: "Глубокая экспертиза рынка Ярославля: актуальные цены, перспективные районы, новые ЖК. Подберём объект, который будет расти в цене.",
  },
  {
    icon: "Map",
    title: "Вся Россия",
    desc: "Межрегиональные сделки по всей стране. Покупка и продажа недвижимости в любом городе РФ без лишних посредников.",
  },
  {
    icon: "Globe",
    title: "Турция и ОАЭ",
    desc: "Инвестиции в зарубежную недвижимость, апартаменты у моря, получение ВНЖ. Сопровождение сделки от выбора объекта до оформления права собственности.",
  },
];

const REVIEWS = [
  { name: "Александр М.", date: "Апрель 2025", text: "Хотел взять ипотеку после просрочек по кредитке. Знакомые риелторы разводили руками, а Дмитрий через 3 дня принёс положительное решение банка. Купил трёшку в новом доме!", stars: 5 },
  { name: "Ольга Р.", date: "Февраль 2025", text: "Продали квартиру ровно за 28 дней. Дмитрий профессионально провёл переговоры с покупателем и обеспечил нам лучшие условия сделки. Очень довольны результатом.", stars: 5 },
  { name: "Сергей Н.", date: "Декабрь 2024", text: "Брали участок под дом в Ярославской области. Дмитрий организовал геологические изыскания, проверил все документы — нашёл проблему до покупки. Сэкономил нам большую сумму.", stars: 5 },
  { name: "Наталья П.", date: "Ноябрь 2024", text: "Покупали квартиру с военной ипотекой. Дмитрий знает все тонкости — провёл нас от выбора объекта до получения ключей. Ни одной задержки, всё по плану.", stars: 5 },
  { name: "Игорь В.", date: "Октябрь 2024", text: "Продавали коммерческое помещение — склад. Дмитрий нашёл покупателя за 3 недели, правильно оценил объект и организовал безопасный расчёт. Профессионал своего дела.", stars: 5 },
  { name: "Елена К.", date: "Август 2024", text: "Обратилась за помощью в выборе новостройки. Дмитрий подобрал несколько вариантов, объяснил плюсы и минусы каждого. Купила по цене ниже, чем в офисе застройщика.", stars: 5 },
  { name: "Михаил Д.", date: "Июль 2024", text: "Оформляли семейную ипотеку — думали, не пройдём по доходу. Дмитрий подал заявку в несколько банков одновременно, одобрили за 2 дня. Очень грамотный специалист.", stars: 5 },
  { name: "Татьяна С.", date: "Май 2024", text: "Продала квартиру через Дмитрия. Юридическое сопровождение — полное, документы проверили досконально. Сделка прошла быстро и без каких-либо нареканий. Рекомендую!", stars: 5 },
  { name: "Андрей Л.", date: "Март 2024", text: "Дмитрий помог купить дом с участком. Организовал проверку коммуникаций и геологию — всё оказалось чисто. Дополнительно подключил строительную компанию для проекта. Спасибо!", stars: 5 },
];

function formatMoney(n: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n));
}

const MaxIcon = ({ size = 16 }: { size?: number }) => (
  <img src="/max-logo.png" alt="MAX" width={size} height={size} className="rounded-[22%]" />
);

const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.153.68-.555.847-1.124.527l-3.1-2.284-1.495 1.438c-.165.165-.305.305-.625.305l.223-3.164 5.754-5.196c.25-.223-.054-.346-.387-.123L7.04 14.748l-3.064-.957c-.666-.208-.68-.666.14-.987l11.97-4.614c.555-.2 1.04.124.877.985z"/>
  </svg>
);

function MortgageCalc() {
  const [price, setPrice] = useState(6000000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(11);
  const [term, setTerm] = useState(20);

  const loanAmount = price * (1 - down / 100);
  const monthlyRate = rate / 100 / 12;
  const months = term * 12;
  const payment = monthlyRate === 0
    ? loanAmount / months
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPay = payment * months;
  const overpay = totalPay - loanAmount;

  const sliders = [
    { label: "Стоимость жилья", value: price, set: setPrice, min: 1000000, max: 80000000, step: 100000, fmt: (v: number) => `${formatMoney(v)} ₽`, minLabel: "1 млн", maxLabel: "80 млн", pct: (price - 1000000) / 79000000 },
    { label: "Первоначальный взнос", value: down, set: setDown, min: 1, max: 90, step: 1, fmt: (v: number) => `${v}% — ${formatMoney(price * v / 100)} ₽`, minLabel: "1%", maxLabel: "90%", pct: (down - 1) / 89 },
    { label: "Ставка по ипотеке", value: rate, set: setRate, min: 1, max: 30, step: 0.1, fmt: (v: number) => `${v}% годовых`, minLabel: "1%", maxLabel: "30%", pct: (rate - 1) / 29 },
    { label: "Срок кредита", value: term, set: setTerm, min: 1, max: 35, step: 1, fmt: (v: number) => `${v} лет`, minLabel: "1 год", maxLabel: "35 лет", pct: (term - 1) / 34 },
  ];

  return (
    <div className="bg-white border border-[hsl(var(--border))] rounded-lg p-8 shadow-sm">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-7">
          {sliders.map(s => (
            <div key={s.label}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">{s.label}</span>
                <span className="font-display text-lg font-semibold text-[hsl(var(--foreground))]">{s.fmt(s.value)}</span>
              </div>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                onChange={e => s.set(+e.target.value)} className="w-full"
                style={{ background: `linear-gradient(to right, var(--blue) ${s.pct * 100}%, hsl(var(--border)) 0%)` }} />
              <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1">
                <span>{s.minLabel}</span><span>{s.maxLabel}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between">
          <div className="bg-[var(--blue)] rounded-lg p-7 text-white mb-4">
            <p className="text-blue-200 text-xs uppercase tracking-widest mb-1">Ежемесячный платёж</p>
            <p className="font-display text-5xl font-light mt-1">{formatMoney(payment)} <span className="text-2xl">₽</span></p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="border border-[hsl(var(--border))] rounded-lg p-4">
              <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-1">Сумма кредита</p>
              <p className="font-display text-lg font-semibold">{formatMoney(loanAmount)} ₽</p>
            </div>
            <div className="border border-[hsl(var(--border))] rounded-lg p-4">
              <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-1">Переплата</p>
              <p className="font-display text-lg font-semibold text-[var(--blue)]">{formatMoney(overpay)} ₽</p>
            </div>
            <div className="border border-[hsl(var(--border))] rounded-lg p-4 col-span-2">
              <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-1">Общая выплата</p>
              <p className="font-display text-lg font-semibold">{formatMoney(totalPay)} ₽</p>
            </div>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mb-3">
            Все заявки подаются ипотечным брокером напрямую в банки-партнёры. Сотрудничаем со всеми ведущими банками России.
          </p>
          <a href={`tel:${PHONE}`} onClick={onPhoneClick} className="flex items-center justify-center gap-2 py-3 border border-[var(--blue)] text-[var(--blue)] text-sm rounded hover:bg-[var(--blue)] hover:text-white transition-colors font-body">
            <Icon name="Phone" size={16} /> Обсудить ипотеку
          </a>
        </div>
      </div>
    </div>
  );
}

function ReviewsCarousel() {
  const [showForm, setShowForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [reviewSent, setReviewSent] = useState(false);
  const [extra, setExtra] = useState<typeof REVIEWS>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(REVIEWS_URL).then(r => r.json()).then(d => setExtra(d.reviews || [])).catch(() => {});
  }, []);
  const all = [...extra, ...REVIEWS];
  const loop = [...all, ...all];

  return (
    <div>
      <style>{`
        @keyframes reviews-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .reviews-track { animation: reviews-scroll 70s linear infinite; }
        .reviews-viewport:hover .reviews-track { animation-play-state: paused; }
      `}</style>
      <div className="reviews-viewport overflow-hidden mb-8 -mx-6 px-6">
        <div className="reviews-track flex gap-6 w-max">
          {loop.map((r, i) => (
            <div key={r.name + i} className="w-[320px] md:w-[380px] shrink-0 border border-[hsl(var(--border))] bg-white rounded-lg p-7 flex flex-col gap-4">
              <div className="flex gap-0.5">{Array.from({ length: r.stars }).map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}</div>
              <p className="font-body text-sm text-[hsl(var(--foreground))] leading-relaxed flex-1">«{r.text}»</p>
              <div className="flex justify-between items-center pt-2 border-t border-[hsl(var(--border))]">
                <p className="font-body text-sm font-medium">{r.name}</p>
                <p className="font-body text-xs text-[hsl(var(--muted-foreground))]">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button onClick={() => setShowForm(v => !v)}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--blue)] text-[var(--blue)] text-sm rounded hover:bg-[var(--blue)] hover:text-white transition-colors font-body">
          <Icon name="PenLine" size={15} /> Оставить отзыв
        </button>
      </div>
      {showForm && !reviewSent && (
        <div className="mt-6 border border-[hsl(var(--border))] rounded-lg p-6 bg-white">
          <h4 className="font-display text-xl mb-4">Ваш отзыв</h4>
          <div className="space-y-3">
            <input value={reviewName} onChange={e => setReviewName(e.target.value)} placeholder="Ваше имя"
              className="w-full border border-[hsl(var(--border))] rounded px-4 py-3 text-sm font-body focus:outline-none focus:border-[var(--blue)] transition-colors" />
            <div>
              <p className="font-body text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2">Ваша оценка</p>
              <div className="flex gap-1" onMouseLeave={() => setHoverStars(0)}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} type="button" aria-label={`${n} из 5`} onClick={() => setReviewStars(n)} onMouseEnter={() => setHoverStars(n)}
                    className={`text-3xl leading-none transition-colors ${n <= (hoverStars || reviewStars) ? "text-amber-400" : "text-gray-300"}`}>★</button>
                ))}
              </div>
            </div>
            <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Расскажите о вашем опыте работы с Дмитрием..." rows={4}
              className="w-full border border-[hsl(var(--border))] rounded px-4 py-3 text-sm font-body focus:outline-none focus:border-[var(--blue)] transition-colors resize-none" />
            <button disabled={sending} onClick={async () => {
              if (!reviewName.trim() || !reviewText.trim()) return;
              if (!reviewStars) { setError(true); return; }
              setSending(true); setError(false);
              try {
                const r = await fetch(REVIEWS_URL, { method: "POST", headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: reviewName, text: reviewText, stars: reviewStars }) });
                if (!r.ok) throw new Error();
                setExtra(prev => [{ name: reviewName, text: reviewText, stars: reviewStars, date: "Только что" }, ...prev]);
                setReviewSent(true);
              } catch { setError(true); } finally { setSending(false); }
            }} className="px-6 py-2.5 bg-[var(--blue)] text-white text-sm rounded hover:bg-[var(--blue-dark)] transition-colors font-body disabled:opacity-60">
              {sending ? "Отправляем..." : "Отправить отзыв"}
            </button>
            {error && <p className="font-body text-sm text-red-600">{reviewStars ? "Не удалось отправить отзыв. Попробуйте ещё раз." : "Пожалуйста, поставьте оценку."}</p>}
          </div>
        </div>
      )}
      {reviewSent && (
        <div className="mt-6 border border-[var(--blue)] rounded-lg p-6 bg-[var(--blue-light)] text-center">
          <p className="font-body text-sm text-[var(--blue)]">Спасибо за отзыв! Он уже появился в списке.</p>
        </div>
      )}
    </div>
  );
}

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <ContactModals />

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
          <img src={HERO_PHOTO} alt="Передача ключей от квартиры" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "70% center" }} />
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

      {/* PROBLEMS */}
      <section id="problems" className="py-24 bg-[hsl(var(--secondary))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Частые ситуации</p>
            <h2 className="font-display text-5xl font-light">Боитесь, что что-то<br/>пойдёт не так?</h2>
            <p className="font-body text-[hsl(var(--muted-foreground))] mt-3">Закроем эти страхи.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROBLEMS.map((p) => (
              <div key={p.tag} className="bg-white border border-[hsl(var(--border))] rounded-lg p-7 hover:shadow-md transition-shadow">
                <div className="inline-flex items-center gap-2 bg-[var(--blue-light)] text-[var(--blue)] text-xs font-body uppercase tracking-wider px-3 py-1 rounded-full mb-5">
                  <Icon name={p.icon} size={12} fallback="AlertCircle" />{p.tag}
                </div>
                <p className="font-display text-xl font-semibold mb-3 leading-snug">{p.fear}</p>
                <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{p.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Что я делаю</p>
          <h2 className="font-display text-5xl font-light">Услуги риэлтора в Ярославле</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="group border border-[hsl(var(--border))] rounded-lg p-7 hover:border-[var(--blue)] hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded flex items-center justify-center bg-[var(--blue-light)] text-[var(--blue)] mb-5 group-hover:bg-[var(--blue)] group-hover:text-white transition-colors">
                <Icon name={s.icon} size={20} fallback="Home" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
              <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="landings" className="py-20 max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Подробнее об услугах</p>
          <h2 className="font-display text-4xl font-light">Что нужно именно вам?</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LANDINGS.map(l => (
            <Link key={l.slug} to={`/${l.slug}`} className="group border border-[hsl(var(--border))] rounded-lg p-6 hover:border-[var(--blue)] hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-10 h-10 rounded flex items-center justify-center bg-[var(--blue-light)] text-[var(--blue)] shrink-0 group-hover:bg-[var(--blue)] group-hover:text-white transition-colors">
                <Icon name={l.icon} size={20} fallback="Home" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold mb-1">{l.short}</p>
                <p className="font-body text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{l.lead}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-[hsl(var(--secondary))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Планирование</p>
            <h2 className="font-display text-5xl font-light">Ипотечный калькулятор Ярославль</h2>
            <p className="font-body text-[hsl(var(--muted-foreground))] mt-3 max-w-lg">
              Рассчитайте платёж прямо сейчас. Даже если история испорчена — найдём банк, который одобрит.
            </p>
          </div>
          <MortgageCalc />
        </div>
      </section>

      {/* GEOGRAPHY */}
      <section id="geography" className="py-24 max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Где работаю</p>
          <h2 className="font-display text-5xl font-light">Недвижимость в Ярославле и Ярославской области</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {GEO_ITEMS.map((g) => (
            <div key={g.title} className="border border-[hsl(var(--border))] rounded-lg p-7 hover:border-[var(--blue)] hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded flex items-center justify-center bg-[var(--blue-light)] text-[var(--blue)] mb-5">
                <Icon name={g.icon} size={20} fallback="MapPin" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{g.title}</h3>
              <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 border border-[hsl(var(--border))] rounded-lg p-7">
          <h3 className="font-display text-xl font-semibold mb-3">Районы Ярославля и города области, где помогаю с недвижимостью</h3>
          <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            Ярославль: Дзержинский, Фрунзенский, Заволжский, Красноперекопский, Кировский и Ленинский районы. Ярославская область: Рыбинск, Тутаев, Переславль-Залесский, Ростов, Углич, Гаврилов-Ям, Данилов, Мышкин, Любим. Купить квартиру в новостройке, продать вторичное жильё, оформить ипотеку, найти дом или участок.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[hsl(var(--secondary))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={AGENT_PHOTO} alt="Фёдоров Дмитрий — риэлтор Ярославль" className="w-full max-w-sm mx-auto rounded-lg object-cover aspect-[3/4]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Кто я</p>
              <h2 className="font-display text-5xl font-light mb-6">Фёдоров Дмитрий</h2>
              <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed mb-5">
                Стаж более 5 лет. Строю репутацию на честности, профессионализме и умении решать нестандартные задачи. Ко мне приходят клиенты, которые уже отчаялись — я нахожу выход.
              </p>
              <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
                Работаю по официальному договору. Это означает прозрачное оформление, гарантии безопасности и юридической чистоты каждой сделки.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Работа по договору", "Прозрачные условия"],
                  ["Ипотека с плохой историей", "Найду решение"],
                  ["Скидки на новостройки", "Партнёрские условия"],
                  ["Гарантийный сертификат", "на\u00A010\u00A0000\u00A0000\u00A0рублей"],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-[var(--blue-light)] flex items-center justify-center mt-0.5 shrink-0">
                      <Icon name="Check" size={12} />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium">{t}</p>
                      <p className="font-body text-xs text-[hsl(var(--muted-foreground))]">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BONUS */}
      <section id="bonus" className="py-24 max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Партнёрская программа</p>
          <h2 className="font-display text-5xl font-light">Заработайте 15 000 ₽</h2>
          <p className="font-body text-[hsl(var(--muted-foreground))] mt-3">Просто порекомендуйте меня — и получите вознаграждение.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <img src={BONUS_PHOTO} alt="Партнёрская программа Фёдоров Дмитрий" className="w-full rounded-lg object-cover shadow-md" />
          </div>
          <div className="space-y-5">
            <div className="bg-[var(--blue-light)] border border-[var(--blue)]/20 rounded-lg p-6">
              <p className="font-display text-3xl font-semibold text-[var(--blue)] mb-1">15 000 ₽</p>
              <p className="font-body text-sm text-[hsl(var(--muted-foreground))]">Ваше вознаграждение за каждого клиента, который выйдет на сделку по покупке новостройки</p>
            </div>
            <div className="space-y-3">
              {[
                ["1", "У вас есть знакомый, который думает о покупке квартиры в новостройке"],
                ["2", "Вы даёте ему мой контакт или пересылаете информацию обо мне"],
                ["3", "Я сам встречаю, показываю объекты, помогаю с ипотекой и веду до ключей"],
                ["4", "Клиент выходит на сделку — вы получаете 15 000 рублей"],
              ].map(([n, t]) => (
                <div key={n} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-[var(--blue)] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{n}</div>
                  <p className="font-body text-sm text-[hsl(var(--foreground))] leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-[hsl(var(--border))] space-y-1">
              {["Никаких регистраций", "Никаких смс", "Всё честно и прозрачно"].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-[var(--blue)]" />
                  <span className="font-body text-sm text-[hsl(var(--muted-foreground))]">{t}</span>
                </div>
              ))}
            </div>
            <button onClick={() => openContactModal("messengers")} className="flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--blue)] text-white text-sm font-body rounded hover:bg-[var(--blue-dark)] transition-colors">
              <Icon name="MessageCircle" size={16} /> Написать Дмитрию — участвую!
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-[hsl(var(--secondary))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Клиенты о работе</p>
            <h2 className="font-display text-5xl font-light">Отзывы клиентов о риэлторе в Ярославле</h2>
          </div>
          <ReviewsCarousel />
        </div>
      </section>

      <SeoFaq />

      {/* NEWS */}
      <section id="news" className="py-24 max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Актуальное</p>
          <h2 className="font-display text-5xl font-light">Новости</h2>
          <p className="font-body text-[hsl(var(--muted-foreground))] mt-3 max-w-lg">
            Скоро здесь появятся актуальные новости рынка недвижимости, обзоры новых ЖК и советы по ипотеке из моего Telegram-канала.
          </p>
        </div>
        <div className="border-2 border-dashed border-[hsl(var(--border))] rounded-lg p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--blue-light)] flex items-center justify-center mx-auto mb-4">
            <Icon name="Newspaper" size={24} className="text-[var(--blue)]" />
          </div>
          <p className="font-display text-2xl text-[hsl(var(--foreground))] mb-2">Скоро</p>
          <p className="font-body text-sm text-[hsl(var(--muted-foreground))] mb-6 max-w-sm mx-auto">
            Раздел будет наполняться новостями из Telegram-канала. Подписывайтесь, чтобы не пропустить важное.
          </p>
          <a href={TG_LINK} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--blue)] text-[var(--blue)] text-sm font-body rounded hover:bg-[var(--blue)] hover:text-white transition-colors">
            <TelegramIcon /> Подписаться на Telegram
          </a>
        </div>
      </section>

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

    </div>
  );
};

export default Index;