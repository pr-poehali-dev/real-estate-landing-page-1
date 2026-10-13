import Icon from "@/components/ui/icon";

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


export default function ProblemsSection() {
  return (
    <>
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
    </>
  );
}
