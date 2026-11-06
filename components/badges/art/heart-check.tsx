// Hand-drawn badge art (Heart check-up). 48x48 grid, live area 40x40.
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
  <path d="M16 24s-8-4.9-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 24 13c0 6.1-8 11-8 11z"/>
  <path d="M11 15h3l1.5-3 3 8 2-4 1 1h4" stroke="var(--badge-accent,#F4978E)"/>
  <path d="M34 8c4 0 6 3 6 6v8c0 6-4 10-10 10"/>
  <circle cx="27" cy="32" r="5"/><circle cx="27" cy="32" r="2"/>
    </svg>
  );
}
