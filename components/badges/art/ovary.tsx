// Hand-drawn badge art (Ovarian cysts). 48x48 grid, live area 40x40.
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
  <path d="M4 18c5 0 8 2 12 5M6 14l3 4M6 22l2 3"/>
  <ellipse cx="32" cy="26" rx="9" ry="7"/>
  <circle cx="34" cy="25" r="4.5" fill="var(--badge-accent-fill,#F9C9B6)"/>
    </svg>
  );
}
