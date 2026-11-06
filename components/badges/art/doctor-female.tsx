// Hand-drawn badge art (Women's doctor). 48x48 grid, live area 40x40.
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
  <path d="M18 12c0-4 2.5-7 6-7s6 3 6 7c0 6 2 8 3 10"/>
  <path d="M15 22c0 6-2 9-3 11"/>
  <path d="M12 44v-6c0-6 5-10 12-10s12 4 12 10v6"/>
  <path d="M19 30l5 4 5-4"/>
  <path d="M18 38c-3 1-4 3-4 5M30 38c3 1 4 3 4 5"/>
  <path d="M20 34c-2 3-1 6 1 8M28 34c2 3 1 6-1 8" stroke="var(--badge-depth,#001F43)"/>
  <circle cx="24" cy="40" r="2" fill="var(--badge-accent,#F4978E)" stroke="none"/>
    </svg>
  );
}
