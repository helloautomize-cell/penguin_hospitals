// Hand-drawn badge art (Heart valve surgery). 48x48 grid, live area 40x40.
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
  <circle cx="24" cy="24" r="15"/>
  <path d="M24 24c0-8 3-12 7-14M24 24c7 4 11 4 14 0M24 24c-7 4-11 4-14 0" stroke="var(--badge-accent,#F4978E)"/>
  <path d="M24 24l0-15M24 24l13 7.5M24 24l-13 7.5" opacity=".35"/>
    </svg>
  );
}
