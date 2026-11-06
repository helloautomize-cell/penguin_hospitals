// Hand-drawn badge art (AV fistula for dialysis). 48x48 grid, live area 40x40.
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
  <path d="M4 20h26l4 6v8" stroke="var(--badge-depth,#001F43)"/>
  <path d="M4 24h22l6 8"/>
  <path d="M10 20c10 0 16 2 18 8"/>
  <path d="M30 28c-2 2-4 2-6 0" stroke="var(--badge-accent,#F4978E)"/>
  <path d="M34 22l4 6M34 34v-2"/>
    </svg>
  );
}
