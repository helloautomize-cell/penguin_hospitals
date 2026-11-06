// Hand-drawn badge art (Newborn care). 48x48 grid, live area 40x40.
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
  <g fill="var(--badge-accent-fill,#F9C9B6)" stroke="none">
  <ellipse cx="17" cy="26" rx="5" ry="8"/><ellipse cx="31" cy="26" rx="5" ry="8"/>
  </g>
  <ellipse cx="17" cy="26" rx="5" ry="8"/><ellipse cx="31" cy="26" rx="5" ry="8"/>
  <g fill="var(--badge-main,#17407E)" stroke="none">
  <circle cx="12" cy="15" r="1.4"/><circle cx="16" cy="13.5" r="1.4"/><circle cx="20" cy="15" r="1.4"/><circle cx="14" cy="17" r="1.2"/><circle cx="22" cy="17" r="1.2"/>
  <circle cx="26" cy="15" r="1.4"/><circle cx="30" cy="13.5" r="1.4"/><circle cx="34" cy="15" r="1.4"/><circle cx="28" cy="17" r="1.2"/><circle cx="36" cy="17" r="1.2"/>
  </g>
  <path d="M8 38c4 4 12 5 16 5s12-1 16-5"/>
    </svg>
  );
}
