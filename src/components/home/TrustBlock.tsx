import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import SeoFaq from "@/components/SeoFaq";
import { TG_LINK, openContactModal } from "@/components/ContactModals";
import { TelegramIcon } from "@/components/home/shared";

const BONUS_PHOTO = "/bonus.jpg";
const REVIEWS_URL = "https://functions.poehali.dev/b82c2320-1454-44af-b158-49b8e3ca37df";

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

export default function TrustBlock() {
  return (
    <>
    {/* BONUS */}
    <section id="bonus" className="py-24 max-w-6xl mx-auto px-6">
      <div className="mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)] font-body mb-3">Партнёрская программа</p>
        <h2 className="font-display text-5xl font-light">Заработайте 15 000 ₽</h2>
        <p className="font-body text-[hsl(var(--muted-foreground))] mt-3">Просто порекомендуйте меня — и получите вознаграждение.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <img src={BONUS_PHOTO} alt="Партнёрская программа Фёдоров Дмитрий" width={1300} height={743} loading="lazy" className="w-full rounded-lg object-cover shadow-md" />
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
    </>
  );
}
