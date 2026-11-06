// Hand-drawn badge art (Irregular periods). 48x48 grid, live area 40x40.
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
  <circle cx="24" cy="24" r="15" strokeDasharray="6 4"/>
  <path d="M37 33l3-2-1 4z" fill="var(--badge-main,#17407E)" stroke="none"/>
  <path d="M24 15s5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 5-9 5-9z" fill="var(--badge-accent,#F4978E)" stroke="none"/>
    </svg>
  );
}
