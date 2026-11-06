// Hand-drawn badge art (Bypass surgery). 48x48 grid, live area 40x40.
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
  <path d="M30 38c-9-3.5-16-10.5-16-19.5 0-6 4.5-10.5 10-10.5 3.5 0 5.4 1.8 6.4 3.5 1.8-2.7 4.5-4.5 8-4.5 5.4 0 8.6 4.4 8.6 10 0 9-7.5 16-17 21z"/>
  <path d="M22 14c0 6 3 9 8 12l6 4" stroke="var(--badge-depth,#001F43)"/>
  <path d="M30 22h3M30 25h3"/>
  <path d="M20 10c8-4 16-2 20 4" stroke="var(--badge-accent,#F4978E)"/>
    </svg>
  );
}
