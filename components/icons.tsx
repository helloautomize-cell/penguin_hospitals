/** Custom line icons not in Lucide's set. Stroke style matches Lucide 1.75. */

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z" />
    </svg>
  );
}

/** The penguin glyph from the approved reference, used as the hospital mark. */
export function PenguinMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 4c-7.5 0-12 6.5-12 16 0 9 4.6 16 12 16s12-7 12-16C32 10.5 27.5 4 20 4z"
        fill="#001F43"
      />
      <path
        d="M20 12c-4 0-6.5 4-6.5 9.5S16 32 20 32s6.5-5 6.5-10.5S24 12 20 12z"
        fill="#fff"
      />
      <circle cx="16.5" cy="10" r="1.4" fill="#fff" />
      <circle cx="23.5" cy="10" r="1.4" fill="#fff" />
      <path d="M18.8 12.4l1.2 2 1.2-2z" fill="#F9C9B6" />
      <path
        d="M20 28s-4.6-2.7-4.6-6a2.4 2.4 0 0 1 4.6-1 2.4 2.4 0 0 1 4.6 1c0 3.3-4.6 6-4.6 6z"
        fill="#E40913"
      />
    </svg>
  );
}
