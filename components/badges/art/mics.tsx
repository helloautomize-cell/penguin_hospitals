// Hand-drawn badge art (Keyhole heart surgery). 48x48 grid, live area 40x40.
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
  <path d="M6 12c8-2 12 2 12 10M6 22c8-2 12 2 12 10M6 32c8-2 12 2 12 10" stroke="var(--badge-depth,#001F43)"/>
  <path d="M32 38c-6-2.5-11-7-11-13 0-4 3-7 7-7 2.4 0 3.7 1.2 4.3 2.4 1.2-1.8 3-3 5.5-3 3.7 0 5.5 3 5.5 7 0 6-5 11-11.3 14z"/>
  <path d="M10 27c1.5 0 3 .8 3.5 2" stroke="var(--badge-accent,#F4978E)" strokeWidth="2.5"/>
    </svg>
  );
}
