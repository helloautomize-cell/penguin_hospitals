// Hand-drawn badge art (Painless delivery). 48x48 grid, live area 40x40.
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
  <path d="M12 30c0-8 5-14 12-14s12 6 12 14"/>
  <path d="M10 30h28" stroke="var(--badge-depth,#001F43)"/>
  <path d="M17 24c1 1.5 3 1.5 4 0M27 24c1 1.5 3 1.5 4 0"/>
  <path d="M14 37c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0" stroke="var(--badge-accent,#F4978E)"/>
    </svg>
  );
}
