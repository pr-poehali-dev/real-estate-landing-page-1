import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { LANDINGS } from "@/data/landings";
import { PHONE, onPhoneClick } from "@/components/ContactModals";

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

function formatMoney(n: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n));
}

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

export default function ServicesBlock() {
  return (
    <>
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
    </>
  );
}
