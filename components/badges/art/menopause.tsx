// Hand-drawn badge art (Menopause care). 48x48 grid, live area 40x40.
// Strokes via CSS vars so the badge themes on dark surfaces; one warm accent.
export default function Art({ size = 32 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="var(--badge-main, #17407E)"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
  <circle cx="16" cy="18" r="6"/>
  <path d="M10 24c-4 2-6 8-6 14M22 24c2 4 2 9 1 14"/>
  <path d="M21 13c3 2 4 6 3 9"/>
  <path d="M40 14a6 6 0 1 1-8-8 5 5 0 0 0 8 8z"/>
  <circle cx="36" cy="8" r="3" stroke="var(--badge-accent,#F4978E)"/><path d="M36 2v2M42 8h2M40 3l1.5 1.5" stroke="var(--badge-accent,#F4978E)"/>
    </svg>
  );
}
