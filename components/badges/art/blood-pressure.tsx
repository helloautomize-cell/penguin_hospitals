// Hand-drawn badge art (Preeclampsia). 48x48 grid, live area 40x40.
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
  <rect x="8" y="10" width="20" height="10" rx="4" transform="rotate(-15 18 15)"/>
  <path d="M24 22c4 4 8 6 10 10"/>
  <circle cx="36" cy="35" r="5"/>
  <circle cx="16" cy="15" r="5"/><path d="M16 15l2-3"/>
  <path d="M36 41s-3-1.5-3-3.6a1.7 1.7 0 0 1 3-.9 1.7 1.7 0 0 1 3 .9c0 2.1-3 3.6-3 3.6z" stroke="var(--badge-accent,#F4978E)" fill="none"/>
    </svg>
  );
}
