// Hand-drawn badge art (Pregnancy care). 48x48 grid, live area 40x40.
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
  <path d="M20 36c3-2 5-6 4-10-3 2-8 2-8-2 0-3 3-5 6-5l6-3c2 6 3 12 1 20z" fill="var(--badge-accent-fill,#F9C9B6)" stroke="none"/>
  <circle cx="22" cy="9" r="4"/>
  <path d="M21 13c-2 5-3 12-2 19v7"/>
  <path d="M24 13c4 4 6 8 5 13 0 5-3 8-7 8"/>
  <path d="M26 20c2 1 3 2 3 4"/>
    </svg>
  );
}
