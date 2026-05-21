import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const AGENT_PHOTO = "https://cdn.poehali.dev/projects/f54bcda6-20cc-4cba-a909-12537f4a91a8/files/9fc562b7-b26b-4a6a-9f74-4f54e8a0b823.jpg";
const APARTMENT_PHOTO = "https://cdn.poehali.dev/projects/f54bcda6-20cc-4cba-a909-12537f4a91a8/files/9c054b62-a78c-49eb-9886-9f4fcd91a005.jpg";

const PHONE = "+79161022727";
const PHONE_DISPLAY = "+7-916-102-27-27";
const WA_LINK = "https://wa.me/79161022727";
const TG_LINK = "https://t.me/+79161022727";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Проблемы", href: "#problems" },
  { label: "География", href: "#geography" },
  { label: "Обо мне", href: "#about" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const PROBLEMS = [
  {
    icon: "AlertCircle",
    fear: "«Мне везде отказывают в ипотеке...»",
    solution: "Слышу это часто. Умею договариваться с банками, когда кредитная история испорчена или доход «серый». Подадим заявку туда, где шанс одобрения выше всего.",
    tag: "Ипотека с плохой историей",
  },
  {
    icon: "BadgePercent",
    fear: "«Хочу новостройку, но бюджет ограничен»",
    solution: "Мои партнёрские скидки снижают цену. Вы получите ключи дешевле, чем если бы пришли в отдел продаж сами. Также работаю с военной ипотекой.",
    tag: "Скидки на новостройки",
  },
  {
    icon: "ShieldCheck",
    fear: "«Куплю ли я кота в мешке?»",
    solution: "Работаю через договор федеральной сети «Этажи». Вся история квартиры и собственников — как на ладони. Юридическая чистота гарантирована.",
    tag: "Юридическая защита",
  },
];

const SERVICES = [
  {
    icon: "Building2",
    title: "Новостройки",
    desc: "Поиск ликвидных ЖК в Ярославле. Доступ к закрытым акциям и военной ипотеке. Скидки от застройщиков через партнёрскую сеть.",
  },
  {
    icon: "Home",
    title: "Вторичное жильё",
    desc: "Продажа вашей квартиры за 30 дней. Торг с продавцом при покупке. Полное юридическое сопровождение.",
  },
  {
    icon: "Trees",
    title: "Дома и участки",
    desc: "Проверка подъездов, коммуникаций и юридического статуса земли. Загородная недвижимость по Ярославской области.",
  },
  {
    icon: "Briefcase",
    title: "Коммерческая",
    desc: "Офисы, склады, торговые точки. Инвестиционная привлекательность под ключ. Анализ доходности объекта.",
  },
];

const GEO_ITEMS = [
  {
    icon: "MapPin",
    title: "Ярославль и область",
    desc: "Знаю город наизусть — от Дядьково до Суздалки. Порекомендую район исходя из вашего образа жизни.",
  },
  {
    icon: "Map",
    title: "Вся Россия",
    desc: "Межрегиональные сделки через партнёрскую сеть «Этажи». Покупка и продажа в любом городе РФ.",
  },
  {
    icon: "Globe",
    title: "Турция и ОАЭ",
    desc: "Инвестиции в зарубежные апартаменты и получение ВНЖ. Полное сопровождение за рубежом.",
  },
];

const REVIEWS = [
  {
    name: "Александр М.",
    date: "Апрель 2024",
    text: "Хотел взять ипотеку после просрочек по кредитке. Знакомые риелторы разводили руками, а Дмитрий через 3 дня принёс положительное решение банка. Купил трёшку в новом доме!",
    stars: 5,
  },
  {
    name: "Ольга Р.",
    date: "Февраль 2024",
    text: "Продали квартиру ровно за 28 дней, как и обещал. Дмитрий сам договорился с покупателем о цене — сэкономил нам 150 000 рублей на торге.",
    stars: 5,
  },
  {
    name: "Сергей Н.",
    date: "Декабрь 2023",
    text: "Брали участок под дом в Ярославской области. Дмитрий проверил все документы, нашёл проблему с коммуникациями до покупки — не дал нам влипнуть.",
    stars: 5,
  },
];

function formatMoney(n: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n));
}

function MortgageCalc() {
  const [price, setPrice] = useState(5000000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(11);
  const [term, setTerm] = useState(20);

  const loanAmount = price * (1 - down / 100);
  const monthlyRate = rate / 100 / 12;
  const months = term * 12;
  const payment =
    monthlyRate === 0
      ? loanAmount / months
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
  const totalPay = payment * months;
  const overpay = totalPay - loanAmount;

  return (
    <div className="bg-white border border-[hsl(var(--border))] rounded-lg p-8 shadow-sm">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-7">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Стоимость жилья</span>
              <span className="font-display text-xl font-semibold text-[hsl(var(--foreground))]">{formatMoney(price)} ₽</span>
            </div>
            <input type="range" min={1000000} max={20000000} step={100000} value={price} onChange={e => setPrice(+e.target.value)} className="w-full"
              style={{ background: `linear-gradient(to right, var(--blue) ${((price - 1000000) / 19000000) * 100}%, hsl(var(--border)) 0%)` }} />
            <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1"><span>1 млн</span><span>20 млн</span></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Первоначальный взнос</span>
              <span className="font-display text-xl font-semibold text-[hsl(var(--foreground))]">{down}% — {formatMoney(price * down / 100)} ₽</span>
            </div>
            <input type="range" min={10} max={90} step={1} value={down} onChange={e => setDown(+e.target.value)} className="w-full"
              style={{ background: `linear-gradient(to right, var(--blue) ${((down - 10) / 80) * 100}%, hsl(var(--border)) 0%)` }} />
            <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1"><span>10%</span><span>90%</span></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Ставка по ипотеке</span>
              <span className="font-display text-xl font-semibold text-[hsl(var(--foreground))]">{rate}% годовых</span>
            </div>
            <input type="range" min={4} max={20} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} className="w-full"
              style={{ background: `linear-gradient(to right, var(--blue) ${((rate - 4) / 16) * 100}%, hsl(var(--border)) 0%)` }} />
            <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1"><span>4%</span><span>20%</span></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Срок кредита</span>
              <span className="font-display text-xl font-semibold text-[hsl(var(--foreground))]">{term} лет</span>
            </div>
            <input type="range" min={1} max={30} step={1} value={term} onChange={e => setTerm(+e.target.value)} className="w-full"
              style={{ background: `linear-gradient(to right, var(--blue) ${((term - 1) / 29) * 100}%, hsl(var(--border)) 0%)` }} />
            <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1"><span>1 год</span><span>30 лет</span></div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="bg-[var(--blue)] rounded-lg p-7 text-white mb-4">
            <p className="text-red-100 text-sm uppercase tracking-widest mb-1">Ежемесячный платёж</p>
            <p className="font-display text-5xl font-light mt-1">{formatMoney(payment)} <span className="text-2xl">₽</span></p>
          </div>
          <div className="grid grid-cols-2 gap-3">
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
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4 leading-relaxed">
            Расчёт приблизительный. Хотите точные условия — звоните, подберу банк под вашу ситуацию.
          </p>
          <a href={`tel:${PHONE}`} className="mt-4 flex items-center justify-center gap-2 py-3 border border-[var(--blue)] text-[var(--blue)] text-sm rounded hover:bg-[var(--blue)] hover:text-white transition-colors font-body">
            <Icon name="Phone" size={16} /> Обсудить ипотеку
          </a>
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-display text-xl font-semibold tracking-wide text-[hsl(var(--foreground))]">
            Фёдоров Дмитрий
          </a>
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link text-sm font-body text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                {l.label}
              </a>
            ))}
            <a href={`tel:${PHONE}`} className="ml-2 px-5 py-2 bg-[var(--blue)] text-white text-sm rounded hover:bg-[var(--blue-dark)] transition-colors flex items-center gap-2">
              <Icon name="Phone" size={14} /> Позвонить
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(v => !v)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-[hsl(var(--border))] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm font-body text-[hsl(var(--foreground))]">{l.label}</a>
            ))}
            <div className="flex gap-3">
              <a href={`tel:${PHONE}`} className="flex-1 px-4 py-2.5 bg-[var(--blue)] text-white text-sm rounded text-center flex items-center justify-center gap-2">
                <Icon name="Phone" size={14} /> Позвонить
              </a>
              <a href={WA_LINK} className="flex-1 px-4 py-2.5 border border-[hsl(var(--border))] text-sm rounded text-center flex items-center justify-center gap-2">
                💬 WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={APARTMENT_PHOTO} alt="Недвижимость" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/97 via-white/85 to-white/20" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-xl">
            <p className="animate-fade-up text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-4">
              Эксперт по недвижимости · Агентство «Этажи»
            </p>
            <h1 className="animate-fade-up-delay-1 font-display text-6xl md:text-7xl font-light leading-[1.05] mb-3">
              Фёдоров<br/>
              <span className="text-[var(--blue)]">Дмитрий</span>
            </h1>
            <a href={`tel:${PHONE}`} className="animate-fade-up-delay-1 inline-flex items-center gap-2 font-body text-lg text-[hsl(var(--muted-foreground))] hover:text-[var(--blue)] transition-colors mb-6">
              <Icon name="Phone" size={18} />
              {PHONE_DISPLAY}
            </a>
            <p className="animate-fade-up-delay-2 font-body text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-8 max-w-md">
              Решаю нестандартные задачи. Одобряю ипотеку с плохой кредитной историей. Продажа новостроек со скидкой.
            </p>
            <div className="animate-fade-up-delay-3 flex flex-wrap gap-3">
              <a href={`tel:${PHONE}`} className="px-7 py-3.5 bg-[var(--blue)] text-white font-body text-sm tracking-wide rounded hover:bg-[var(--blue-dark)] transition-colors shadow-lg shadow-red-100 flex items-center gap-2">
                📞 Позвонить
              </a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="px-7 py-3.5 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-body text-sm tracking-wide rounded hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors flex items-center gap-2">
                💬 Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-t border-[hsl(var(--border))]">
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-[hsl(var(--border))]">
            {[["200+", "сделок закрыто"], ["Этажи", "федеральная сеть"], ["Россия, Турция, ОАЭ", "география работы"]].map(([n, l]) => (
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
                  <Icon name={p.icon} size={12} fallback="AlertCircle" />
                  {p.tag}
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
          <h2 className="font-display text-5xl font-light">Мои услуги</h2>
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

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-[hsl(var(--secondary))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Планирование</p>
            <h2 className="font-display text-5xl font-light">Калькулятор ипотеки</h2>
            <p className="font-body text-[hsl(var(--muted-foreground))] mt-3 max-w-lg">
              Рассчитайте платёж прямо сейчас. Даже если история испорчена — я найду банк, который одобрит.
            </p>
          </div>
          <MortgageCalc />
        </div>
      </section>

      {/* GEOGRAPHY */}
      <section id="geography" className="py-24 max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Где работаю</p>
          <h2 className="font-display text-5xl font-light">География</h2>
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
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[hsl(var(--secondary))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={AGENT_PHOTO} alt="Фёдоров Дмитрий" className="w-full max-w-sm mx-auto rounded-lg object-cover aspect-[3/4]" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-4 bg-white border border-[hsl(var(--border))] shadow-lg px-5 py-3 rounded flex items-center gap-3 whitespace-nowrap">
                <span className="text-2xl">🏢</span>
                <div>
                  <p className="font-display text-base font-semibold text-[var(--blue)]">Этажи</p>
                  <p className="font-body text-xs text-[hsl(var(--muted-foreground))]">Федеральная сеть</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Кто я</p>
              <h2 className="font-display text-5xl font-light mb-6">Фёдоров Дмитрий</h2>
              <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed mb-5">
                Строю личный бренд на честности, профессионализме и умении решать нестандартные задачи. Ко мне приходят клиенты, которые уже отчаялись — я нахожу выход.
              </p>
              <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
                Работаю в агентстве «Этажи» — одной из крупнейших риэлторских сетей России. Это значит: официальное оформление, гарантии безопасности и юридической чистоты каждой сделки.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Агентство «Этажи»", "Федеральная сеть"],
                  ["Ипотека с плохой историей", "Найду решение для вас"],
                  ["Скидки на новостройки", "Партнёрские условия"],
                  ["Юрсопровождение", "Гарантия чистоты сделки"],
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

      {/* REVIEWS */}
      <section id="reviews" className="py-24 max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Клиенты о работе</p>
          <h2 className="font-display text-5xl font-light">Отзывы</h2>
          <p className="font-body text-[hsl(var(--muted-foreground))] mt-3 text-sm">Скриншоты из WhatsApp и Telegram — по запросу.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="border border-[hsl(var(--border))] rounded-lg p-7 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="font-body text-sm text-[hsl(var(--foreground))] leading-relaxed flex-1">«{r.text}»</p>
              <div className="flex justify-between items-center pt-2 border-t border-[hsl(var(--border))]">
                <p className="font-body text-sm font-medium">{r.name}</p>
                <p className="font-body text-xs text-[hsl(var(--muted-foreground))]">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[hsl(var(--foreground))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-red-400 font-body mb-3">Свяжитесь со мной</p>
              <h2 className="font-display text-5xl font-light text-white mb-4">Расскажите о вашей ситуации</h2>
              <p className="font-body text-gray-400 leading-relaxed mb-10">
                Я позвоню в ближайшее время, чтобы предложить решение. Даже если до этого вам везде отказывали.
              </p>
              <div className="space-y-4 mb-8">
                <a href={`tel:${PHONE}`} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded border border-white/10 flex items-center justify-center text-red-400 group-hover:bg-[var(--blue)] group-hover:border-[var(--blue)] transition-colors">
                    <Icon name="Phone" size={18} />
                  </div>
                  <div>
                    <p className="font-body text-white text-sm font-medium group-hover:text-red-300 transition-colors">{PHONE_DISPLAY}</p>
                    <p className="font-body text-gray-500 text-xs">Звонки</p>
                  </div>
                </a>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded border border-white/10 flex items-center justify-center text-red-400 group-hover:bg-[var(--blue)] group-hover:border-[var(--blue)] transition-colors">
                    <span className="text-lg">💬</span>
                  </div>
                  <div>
                    <p className="font-body text-white text-sm font-medium group-hover:text-red-300 transition-colors">WhatsApp</p>
                    <p className="font-body text-gray-500 text-xs">{PHONE_DISPLAY}</p>
                  </div>
                </a>
                <a href={TG_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded border border-white/10 flex items-center justify-center text-red-400 group-hover:bg-[var(--blue)] group-hover:border-[var(--blue)] transition-colors">
                    <span className="text-lg">✈️</span>
                  </div>
                  <div>
                    <p className="font-body text-white text-sm font-medium group-hover:text-red-300 transition-colors">Telegram</p>
                    <p className="font-body text-gray-500 text-xs">Написать в мессенджер</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h3 className="font-display text-2xl text-white mb-2">Оставьте заявку</h3>
              <p className="font-body text-gray-400 text-sm mb-6">Перезвоню в течение 30 минут</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Ваше имя</label>
                  <input type="text" placeholder="Иван Иванов" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors font-body" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors font-body" />
                </div>
                <button className="w-full py-3.5 bg-[var(--blue)] text-white text-sm font-body tracking-wide rounded hover:bg-[var(--blue-dark)] transition-colors mt-2">
                  Обсудить задачу
                </button>
                <p className="text-center text-gray-600 text-xs pt-1">Или свяжитесь напрямую:</p>
                <div className="flex gap-3">
                  <a href={`tel:${PHONE}`} className="flex-1 py-2.5 border border-white/10 text-white text-xs rounded text-center hover:border-red-500 transition-colors flex items-center justify-center gap-1.5">
                    📞 Позвонить
                  </a>
                  <a href={WA_LINK} target="_blank" rel="noreferrer" className="flex-1 py-2.5 border border-white/10 text-white text-xs rounded text-center hover:border-red-500 transition-colors flex items-center justify-center gap-1.5">
                    💬 WhatsApp
                  </a>
                  <a href={TG_LINK} target="_blank" rel="noreferrer" className="flex-1 py-2.5 border border-white/10 text-white text-xs rounded text-center hover:border-red-500 transition-colors flex items-center justify-center gap-1.5">
                    ✈️ Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(var(--foreground))] border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="font-display text-white text-lg mb-1">Фёдоров Дмитрий — ваш личный риелтор</p>
              <p className="font-body text-gray-500 text-xs">Партнёр федеральной сети «Этажи»</p>
              <p className="font-body text-gray-600 text-xs mt-1">Скоро: Telegram-канал «Недвижимость без рисков»</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <a href={`tel:${PHONE}`} className="font-body text-white/80 hover:text-white text-sm transition-colors flex items-center gap-2">
                <Icon name="Phone" size={14} /> {PHONE_DISPLAY}
              </a>
              <p className="font-body text-gray-600 text-xs">© 2024. Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;