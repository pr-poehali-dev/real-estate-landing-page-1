import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const AGENT_PHOTO = "https://cdn.poehali.dev/projects/f54bcda6-20cc-4cba-a909-12537f4a91a8/files/9fc562b7-b26b-4a6a-9f74-4f54e8a0b823.jpg";
const APARTMENT_PHOTO = "https://cdn.poehali.dev/projects/f54bcda6-20cc-4cba-a909-12537f4a91a8/files/8aba8cff-6ac2-4a81-9e47-dd16ef07d925.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "География", href: "#geography" },
  { label: "Обо мне", href: "#about" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "Home",
    title: "Покупка квартиры",
    desc: "Подберу объект под ваш бюджет и требования, проведу юридическую проверку и сопровожу сделку от начала до конца.",
  },
  {
    icon: "TrendingUp",
    title: "Продажа недвижимости",
    desc: "Оценю рыночную стоимость, подготовлю объявления, найду покупателя в сжатые сроки по максимальной цене.",
  },
  {
    icon: "Key",
    title: "Аренда",
    desc: "Помогу арендовать или сдать квартиру выгодно. Проверка арендаторов, подготовка договора, контроль платежей.",
  },
  {
    icon: "FileCheck",
    title: "Юридическое сопровождение",
    desc: "Проверка документов, оценка рисков, ипотечные сделки, материнский капитал — всё под ключ.",
  },
];

const GEO_DISTRICTS = [
  "Центральный АО", "Северный АО", "Северо-Западный АО",
  "Западный АО", "Юго-Западный АО", "Южный АО",
  "Юго-Восточный АО", "Восточный АО", "Новая Москва",
];

const REVIEWS = [
  {
    name: "Дмитрий К.",
    date: "Март 2024",
    text: "Анна помогла продать нашу квартиру за 3 недели — на 8% выше начальной цены. Всё очень профессионально: от оценки до нотариуса.",
    stars: 5,
  },
  {
    name: "Мария В.",
    date: "Январь 2024",
    text: "Искали квартиру с ипотекой — казалось, это нереально быстро. Анна нашла вариант за 10 дней и полностью сопроводила сделку.",
    stars: 5,
  },
  {
    name: "Алексей П.",
    date: "Ноябрь 2023",
    text: "Очень внимательный и честный специалист. Сразу предупредила о рисках по одному объекту, сэкономила мне большие деньги.",
    stars: 5,
  },
];

function formatMoney(n: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n));
}

function MortgageCalc() {
  const [price, setPrice] = useState(8000000);
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
            <input
              type="range" min={1000000} max={30000000} step={100000}
              value={price} onChange={e => setPrice(+e.target.value)}
              className="w-full"
              style={{ background: `linear-gradient(to right, var(--blue) ${((price - 1000000) / 29000000) * 100}%, hsl(var(--border)) 0%)` }}
            />
            <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1">
              <span>1 млн</span><span>30 млн</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Первоначальный взнос</span>
              <span className="font-display text-xl font-semibold text-[hsl(var(--foreground))]">{down}% — {formatMoney(price * down / 100)} ₽</span>
            </div>
            <input
              type="range" min={10} max={90} step={1}
              value={down} onChange={e => setDown(+e.target.value)}
              className="w-full"
              style={{ background: `linear-gradient(to right, var(--blue) ${((down - 10) / 80) * 100}%, hsl(var(--border)) 0%)` }}
            />
            <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1">
              <span>10%</span><span>90%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Ставка по ипотеке</span>
              <span className="font-display text-xl font-semibold text-[hsl(var(--foreground))]">{rate}% годовых</span>
            </div>
            <input
              type="range" min={4} max={20} step={0.1}
              value={rate} onChange={e => setRate(+e.target.value)}
              className="w-full"
              style={{ background: `linear-gradient(to right, var(--blue) ${((rate - 4) / 16) * 100}%, hsl(var(--border)) 0%)` }}
            />
            <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1">
              <span>4%</span><span>20%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Срок кредита</span>
              <span className="font-display text-xl font-semibold text-[hsl(var(--foreground))]">{term} лет</span>
            </div>
            <input
              type="range" min={1} max={30} step={1}
              value={term} onChange={e => setTerm(+e.target.value)}
              className="w-full"
              style={{ background: `linear-gradient(to right, var(--blue) ${((term - 1) / 29) * 100}%, hsl(var(--border)) 0%)` }}
            />
            <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1">
              <span>1 год</span><span>30 лет</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="bg-[var(--blue)] rounded-lg p-7 text-white mb-4">
            <p className="text-blue-100 text-sm uppercase tracking-widest mb-1">Ежемесячный платёж</p>
            <p className="font-display text-5xl font-light mt-1">{formatMoney(payment)} <span className="text-2xl">₽</span></p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-[hsl(var(--border))] rounded-lg p-4">
              <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-1">Сумма кредита</p>
              <p className="font-display text-lg font-semibold">{formatMoney(loanAmount)} ₽</p>
            </div>
            <div className="border border-[hsl(var(--border))] rounded-lg p-4">
              <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-1">Переплата</p>
              <p className="font-display text-lg font-semibold text-[hsl(var(--destructive))]">{formatMoney(overpay)} ₽</p>
            </div>
            <div className="border border-[hsl(var(--border))] rounded-lg p-4 col-span-2">
              <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-1">Общая выплата</p>
              <p className="font-display text-lg font-semibold">{formatMoney(totalPay)} ₽</p>
            </div>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4 leading-relaxed">
            Расчёт приблизительный. Уточните условия у банка или получите консультацию.
          </p>
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
            Анна Соколова
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link text-sm font-body text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contacts" className="ml-4 px-5 py-2 bg-[var(--blue)] text-white text-sm rounded hover:bg-[var(--blue-dark)] transition-colors">
              Связаться
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
            <a href="#contacts" onClick={() => setMobileOpen(false)} className="px-5 py-2 bg-[var(--blue)] text-white text-sm rounded text-center">
              Связаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={APARTMENT_PHOTO} alt="Недвижимость" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/20" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-xl">
            <p className="animate-fade-up text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-5">Риэлтор в Москве · 12 лет опыта</p>
            <h1 className="animate-fade-up-delay-1 font-display text-6xl md:text-7xl font-light leading-[1.05] mb-6">
              Найдём вашу<br/>
              <em className="not-italic text-[var(--blue)]">идеальную</em><br/>
              квартиру
            </h1>
            <p className="animate-fade-up-delay-2 font-body text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-10 max-w-sm">
              Профессиональное сопровождение покупки, продажи и аренды недвижимости в Москве и области.
            </p>
            <div className="animate-fade-up-delay-3 flex flex-wrap gap-4">
              <a href="#contacts" className="px-8 py-3.5 bg-[var(--blue)] text-white font-body text-sm tracking-wide rounded hover:bg-[var(--blue-dark)] transition-colors shadow-lg shadow-blue-200">
                Получить консультацию
              </a>
              <a href="#calculator" className="px-8 py-3.5 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-body text-sm tracking-wide rounded hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors">
                Калькулятор ипотеки
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-t border-[hsl(var(--border))]">
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-[hsl(var(--border))]">
            {[["320+", "сделок закрыто"], ["12 лет", "опыта в Москве"], ["98%", "довольных клиентов"]].map(([n, l]) => (
              <div key={n} className="px-6 first:pl-0 last:pr-0 text-center">
                <p className="font-display text-2xl font-semibold text-[var(--blue)]">{n}</p>
                <p className="font-body text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Что я делаю</p>
          <h2 className="font-display text-5xl font-light">Услуги</h2>
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
              Рассчитайте ежемесячный платёж прямо сейчас. Двигайте ползунки — результат обновляется мгновенно.
            </p>
          </div>
          <MortgageCalc />
        </div>
      </section>

      {/* GEOGRAPHY */}
      <section id="geography" className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Где работаю</p>
            <h2 className="font-display text-5xl font-light mb-6">География</h2>
            <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
              Работаю по всей Москве и области. Хорошо знаю каждый район: инфраструктуру, цены, тренды рынка. Это позволяет находить лучшие объекты быстрее.
            </p>
            <a href="#contacts" className="inline-flex items-center gap-2 text-sm text-[var(--blue)] font-body hover:gap-3 transition-all">
              Обсудить ваш район <Icon name="ArrowRight" size={16} />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {GEO_DISTRICTS.map((d) => (
              <div key={d} className="border border-[hsl(var(--border))] rounded px-3 py-2.5 text-center hover:border-[var(--blue)] hover:bg-[var(--blue-light)] transition-colors cursor-default">
                <span className="font-body text-xs text-[hsl(var(--foreground))] leading-tight block">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[hsl(var(--secondary))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={AGENT_PHOTO}
                alt="Анна Соколова"
                className="w-full max-w-sm mx-auto rounded-lg object-cover aspect-[3/4]"
              />
              <div className="absolute -bottom-4 -right-4 md:right-4 bg-[var(--blue)] text-white px-5 py-3 rounded shadow-lg">
                <p className="font-display text-2xl font-semibold">12</p>
                <p className="font-body text-xs uppercase tracking-wider text-blue-100">лет опыта</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Кто я</p>
              <h2 className="font-display text-5xl font-light mb-6">Анна Соколова</h2>
              <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed mb-5">
                Сертифицированный риэлтор с 12-летним опытом на московском рынке недвижимости. Специализируюсь на жилой недвижимости бизнес и комфорт-класса.
              </p>
              <p className="font-body text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
                Каждую сделку веду лично — без передачи другим сотрудникам. Всегда на связи, честна с клиентами, нацелена на долгосрочные отношения.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Член РГР", "Российская Гильдия Риэлторов"],
                  ["Эскроу-сделки", "Безопасные расчёты"],
                  ["Ипотека", "Все банки-партнёры"],
                  ["Субсидии", "Маткапитал, льготная ипотека"],
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
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="border border-[hsl(var(--border))] rounded-lg p-7 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="font-body text-sm text-[hsl(var(--foreground))] leading-relaxed flex-1">"{r.text}"</p>
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
              <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-body mb-3">Напишите мне</p>
              <h2 className="font-display text-5xl font-light text-white mb-6">Контакты</h2>
              <p className="font-body text-gray-400 leading-relaxed mb-10">
                Отвечаю в течение часа. Первая консультация — бесплатно. Расскажите о вашей задаче, и мы найдём лучшее решение.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "+7 (999) 000-00-00", sub: "Звонки и WhatsApp" },
                  { icon: "Mail", label: "anna@realty.ru", sub: "Электронная почта" },
                  { icon: "MapPin", label: "Москва, ЦАО", sub: "Район работы" },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-blue-400">
                      <Icon name={icon} size={18} fallback="Phone" />
                    </div>
                    <div>
                      <p className="font-body text-white text-sm font-medium">{label}</p>
                      <p className="font-body text-gray-500 text-xs">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h3 className="font-display text-2xl text-white mb-6">Оставьте заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Ваше имя</label>
                  <input type="text" placeholder="Иван Иванов" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-body" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-body" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Сообщение</label>
                  <textarea rows={4} placeholder="Расскажите о вашей задаче..." className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-body resize-none" />
                </div>
                <button className="w-full py-3.5 bg-[var(--blue)] text-white text-sm font-body tracking-wide rounded hover:bg-[var(--blue-dark)] transition-colors mt-2">
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(var(--foreground))] border-t border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-display text-white/60 text-sm">© 2024 Анна Соколова · Риэлтор</p>
          <div className="flex gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="font-body text-xs text-white/40 hover:text-white/70 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
