// Hand-drawn badge art (Uterine fibroids). 48x48 grid, live area 40x40.
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
  <g transform="translate(2.4 2.4) scale(.9)">
  <path d="M17 15c-1.5 9 .5 17 7 19 6.5-2 8.5-10 7-19"/>
  <path d="M18 18c-4-1-7-4-8-7M30 18c4-1 7-4 8-7"/>
  <ellipse cx="9" cy="13" rx="3" ry="2"/><ellipse cx="39" cy="13" rx="3" ry="2"/>
  <path d="M24 34v5"/>
  </g>
  <circle cx="30" cy="18" r="4" fill="var(--badge-accent-fill,#F9C9B6)"/>
    </svg>
  );
}
