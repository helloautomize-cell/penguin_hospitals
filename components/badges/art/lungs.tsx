// Hand-drawn badge art (Lung and chest surgery). 48x48 grid, live area 40x40.
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
  <path d="M24 6v12M24 18c-1.5 0-3 1.5-4.5 1.5M24 18c1.5 0 3 1.5 4.5 1.5"/>
  <path d="M18 12c-4.5 0-8 7.5-8 15 0 3 2 4.5 4.5 4.5S18 29.5 18 25z"/>
  <path d="M30 12c4.5 0 8 7.5 8 15 0 3-2 4.5-4.5 4.5S30 29.5 30 25z"/>
  <path d="M30 6c2-2 5-2 7 0M34 4c1.5-1.5 4-1.5 6 0" stroke="var(--badge-accent,#F4978E)"/>
    </svg>
  );
}
