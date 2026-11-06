// Hand-drawn badge art (Heart and vascular surgery). 48x48 grid, live area 40x40.
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
  <path d="M30 40c-10-4-18-12-18-22 0-7 5-12 11-12 4 0 6 2 7 4 2-3 5-5 9-5 6 0 9 5 9 11 0 10-8 18-18 24z" transform="rotate(-8 30 24)"/>
  <path d="M30 8c1-4 4-5 8-5M32 12c3-2 6-2 9-1"/>
  <path d="M8 26h8l3-6 4 12 3-8 2 2h12" stroke="var(--badge-accent,#F4978E)"/>
    </svg>
  );
}
