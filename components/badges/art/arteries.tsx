// Hand-drawn badge art (Leg artery disease). 48x48 grid, live area 40x40.
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
  <path d="M16 6v14l-3 14h9l1-4"/>
  <path d="M13 34l-5 4h8"/>
  <path d="M20 8v22" stroke="var(--badge-accent,#F4978E)"/>
  <ellipse cx="34" cy="34" rx="5" ry="8"/>
  <circle cx="30" cy="22" r="1.4"/><circle cx="34" cy="20.5" r="1.4"/><circle cx="38" cy="22" r="1.4"/>
    </svg>
  );
}
