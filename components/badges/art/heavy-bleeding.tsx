// Hand-drawn badge art (Heavy periods). 48x48 grid, live area 40x40.
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
  <g transform="rotate(10 30 24)">
  <rect x="22" y="14" width="16" height="20" rx="5"/>
  <path d="M27 14v-4h6v4"/>
  <path d="M26 21c2-1.5 4-1.5 6 0M26 26c2-1.5 4-1.5 6 0"/>
  </g>
  <path d="M12 24s4 4.5 4 7a4 4 0 0 1-8 0c0-2.5 4-7 4-7z" fill="var(--badge-accent,#F4978E)" stroke="none"/>
    </svg>
  );
}
