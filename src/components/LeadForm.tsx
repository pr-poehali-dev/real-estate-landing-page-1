import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PHONE, TG_LINK, MAX_LINK, onPhoneClick } from "@/components/ContactModals";

const LEAD_URL = "https://functions.poehali.dev/909c7aec-190d-4922-9a3d-cdb7250eac12";

const MaxIcon = ({ size = 16 }: { size?: number }) => (
  <img src="/max-logo.png" alt="MAX" width={size} height={size} className="rounded-[22%]" />
);

const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.153.68-.555.847-1.124.527l-3.1-2.284-1.495 1.438c-.165.165-.305.305-.625.305l.223-3.164 5.754-5.196c.25-.223-.054-.346-.387-.123L7.04 14.748l-3.064-.957c-.666-.208-.68-.666.14-.987l11.97-4.614c.555-.2 1.04.124.877.985z"/>
  </svg>
);

export default function LeadForm({ source = "Форма на сайте", darkMode = false }: { source?: string; darkMode?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputCls = darkMode
    ? "w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[var(--blue)] transition-colors font-body"
    : "w-full border border-[hsl(var(--border))] rounded px-4 py-3 text-sm font-body focus:outline-none focus:border-[var(--blue)] transition-colors";
  const labelCls = darkMode ? "block text-xs uppercase tracking-wider text-gray-400 mb-2" : "block text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2";

  const submit = async () => {
    if (!name || !phone) return;
    setLoading(true);
    try {
      await fetch(LEAD_URL, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, source }) });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) return (
    <div className="text-center py-8">
      <div className="w-14 h-14 rounded-full bg-[var(--blue)] flex items-center justify-center mx-auto mb-4">
        <Icon name="Check" size={24} className="text-white" />
      </div>
      <p className={`font-display text-2xl mb-2 ${darkMode ? "text-white" : ""}`}>Заявка отправлена!</p>
      <p className={`font-body text-sm ${darkMode ? "text-gray-400" : "text-[hsl(var(--muted-foreground))]"}`}>
        Дмитрий перезвонит в течение 30 минут
      </p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className={labelCls}>Ваше имя</label>
        <input type="text" placeholder="Иван Иванов" value={name} onChange={e => setName(e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Телефон</label>
        <input type="tel" placeholder="+7 (___) ___-__-__" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Сообщение (необязательно)</label>
        <textarea rows={3} placeholder="Кратко опишите вашу ситуацию..." value={message} onChange={e => setMessage(e.target.value)}
          className={inputCls + " resize-none"} />
      </div>
      <button onClick={submit} disabled={loading}
        className="w-full py-3.5 bg-[var(--blue)] text-white text-sm font-body tracking-wide rounded hover:bg-[var(--blue-dark)] transition-colors disabled:opacity-60">
        {loading ? "Отправляем..." : "Обсудить задачу"}
      </button>
      <p className={`text-center text-xs pt-1 ${darkMode ? "text-gray-600" : "text-[hsl(var(--muted-foreground))]"}`}>
        Или свяжитесь напрямую:
      </p>
      <div className="flex gap-3">
        <a href={`tel:${PHONE}`} onClick={onPhoneClick} className={`flex-1 py-2.5 border text-xs rounded text-center flex items-center justify-center gap-1.5 transition-colors ${darkMode ? "border-white/10 text-white hover:border-white/30" : "border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[var(--blue)]"}`}>
          <Icon name="Phone" size={13} /> Позвонить
        </a>
        <a href={MAX_LINK} target="_blank" rel="noreferrer" className={`flex-1 py-2.5 border text-xs rounded text-center flex items-center justify-center gap-1.5 transition-colors ${darkMode ? "border-white/10 text-white hover:border-white/30" : "border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[var(--blue)]"}`}>
          <MaxIcon size={14} /> MAX
        </a>
        <a href={TG_LINK} target="_blank" rel="noreferrer" className={`flex-1 py-2.5 border text-xs rounded text-center flex items-center justify-center gap-1.5 transition-colors ${darkMode ? "border-white/10 text-white hover:border-white/30" : "border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[var(--blue)]"}`}>
          <TelegramIcon /> Telegram
        </a>
      </div>
    </div>
  );
}

