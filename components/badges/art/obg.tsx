// Hand-drawn badge art (Obstetrics and gynaecology). 48x48 grid, live area 40x40.
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
  <path d="M17 15c-1.5 9 .5 17 7 19 6.5-2 8.5-10 7-19"/>
  <path d="M18 18c-4-1-7-4-8-7M30 18c4-1 7-4 8-7"/>
  <ellipse cx="9" cy="13" rx="3" ry="2"/><ellipse cx="39" cy="13" rx="3" ry="2"/>
  <path d="M24 34v5"/>
  <path d="M24 28.5s-3-1.8-3-4a1.7 1.7 0 0 1 3-.9 1.7 1.7 0 0 1 3 .9c0 2.2-3 4-3 4z" fill="var(--badge-accent-fill,#F9C9B6)" stroke="var(--badge-accent,#F4978E)" strokeWidth="1.5"/>
    </svg>
  );
}
