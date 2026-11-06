// Hand-drawn badge art (Heart surgeon). 48x48 grid, live area 40x40.
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
  <circle cx="24" cy="14" r="6"/>
  <path d="M18 13c0-4.5 2.5-7 6-7s6 2.5 6 7"/>
  <path d="M10 44v-6c0-7 6-11 14-11s14 4 14 11v6"/>
  <path d="M18 30l6 5 6-5"/>
  <path d="M17 38c-3 1-4 3-4 5M31 38c3 1 4 3 4 5"/>
  <path d="M19 34c-2 3-1 6 1 8M29 34c2 3 1 6-1 8" stroke="var(--badge-depth,#001F43)"/>
  <circle cx="24" cy="41" r="2" fill="var(--badge-accent,#F4978E)" stroke="none"/>
    </svg>
  );
}
