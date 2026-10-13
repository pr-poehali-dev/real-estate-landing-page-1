export const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Проблемы", href: "#problems" },
  { label: "География", href: "#geography" },
  { label: "Обо мне", href: "#about" },
  { label: "Бонусы", href: "#bonus" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Новости", href: "#news" },
  { label: "Контакты", href: "#contacts" },
];

export const MaxIcon = ({ size = 16 }: { size?: number }) => (
  <img src="/max-logo.png" alt="MAX" width={size} height={size} className="rounded-[22%]" />
);

export const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.153.68-.555.847-1.124.527l-3.1-2.284-1.495 1.438c-.165.165-.305.305-.625.305l.223-3.164 5.754-5.196c.25-.223-.054-.346-.387-.123L7.04 14.748l-3.064-.957c-.666-.208-.68-.666.14-.987l11.97-4.614c.555-.2 1.04.124.877.985z"/>
  </svg>
);
