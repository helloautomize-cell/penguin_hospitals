// Hand-drawn badge art (Normal delivery). 48x48 grid, live area 40x40.
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
  <g transform="rotate(35 24 24)">
  <ellipse cx="24" cy="24" rx="13" ry="9" fill="var(--badge-accent-fill,#F9C9B6)" stroke="none"/>
  <ellipse cx="24" cy="24" rx="13" ry="9"/>
  <circle cx="15" cy="24" r="5"/>
  <path d="M20 20c4-2 8-2 11 0M20 28c4 2 8 2 11 0"/>
  </g>
    </svg>
  );
}
