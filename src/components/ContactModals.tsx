import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

export const PHONE = "+79161022727";
export const PHONE_DISPLAY = "8-916-102-27-27";
export const TG_LINK = "https://t.me/DSFedorov27";
export const MAX_LINK = "https://max.ru/u/f9LHodD0cOLhguFycVvDHmbjR2CHhvZr4nblSx36tByfQnLVqvDICzdnhMI";

type Kind = "phone" | "messengers";
const EVENT = "open-contact-modal";

export const openContactModal = (kind: Kind) => window.dispatchEvent(new CustomEvent(EVENT, { detail: kind }));

export const onPhoneClick = (e: React.MouseEvent) => {
  const isTouch = window.matchMedia("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (!isTouch) {
    e.preventDefault();
    openContactModal("phone");
  }
};

export default function ContactModals() {
  const [kind, setKind] = useState<Kind | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const h = (e: Event) => { setCopied(false); setKind((e as CustomEvent).detail); };
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, []);

  const copy = async () => {
    try { await navigator.clipboard.writeText(PHONE_DISPLAY); setCopied(true); } catch { /* noop */ }
  };

  return (
    <Dialog open={kind !== null} onOpenChange={o => !o && setKind(null)}>
      <DialogContent className="max-w-sm">
        {kind === "phone" && (
          <>
            <DialogHeader><DialogTitle className="font-display text-2xl">Позвонить Дмитрию</DialogTitle></DialogHeader>
            <p className="font-body text-3xl text-center py-4 text-[var(--blue)] select-all">{PHONE_DISPLAY}</p>
            <button onClick={copy} className="w-full py-3 bg-[var(--blue)] text-white text-sm rounded hover:bg-[var(--blue-dark)] transition-colors font-body flex items-center justify-center gap-2">
              <Icon name={copied ? "Check" : "Copy"} size={15} /> {copied ? "Номер скопирован" : "Скопировать номер"}
            </button>
          </>
        )}
        {kind === "messengers" && (
          <>
            <DialogHeader><DialogTitle className="font-display text-2xl">Написать Дмитрию</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <a href={MAX_LINK} target="_blank" rel="noreferrer" className="w-full py-3 border border-[hsl(var(--border))] rounded text-sm font-body flex items-center justify-center gap-2 hover:border-[var(--blue)] transition-colors">
                <img src="/max-logo.png" alt="MAX" width={18} height={18} className="rounded-[22%]" /> Написать в MAX
              </a>
              <a href={TG_LINK} target="_blank" rel="noreferrer" className="w-full py-3 border border-[hsl(var(--border))] rounded text-sm font-body flex items-center justify-center gap-2 hover:border-[var(--blue)] transition-colors">
                <Icon name="Send" size={16} /> Написать в Telegram
              </a>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
