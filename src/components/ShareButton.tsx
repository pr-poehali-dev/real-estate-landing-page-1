import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function ShareButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const data = { title: document.title, url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(data); return; } catch { return; }
    }
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  return (
    <button onClick={share} className={className}>
      <Icon name={copied ? "Check" : "Share2"} size={15} /> {copied ? "Ссылка скопирована" : "Поделиться"}
    </button>
  );
}
