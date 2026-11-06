// Hand-drawn badge art (Varicose veins). 48x48 grid, live area 40x40.
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
  <path d="M18 6v14l-3 16h9l1-4"/>
  <path d="M15 36l-6 4h9"/>
  <path d="M21 8c2 2 0 4 2 6s0 4 2 6-1 4 1 6" stroke="var(--badge-accent,#F4978E)"/>
    </svg>
  );
}
