import Icon from "@/components/ui/icon";

const AGENT_PHOTO = "/agent.jpg";

export default function AboutSection() {
  return (
    <>
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
    </>
  );
}
