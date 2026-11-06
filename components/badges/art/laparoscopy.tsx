// Hand-drawn badge art (Laparoscopic surgery). 48x48 grid, live area 40x40.
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
  <path d="M14 38L38 14" stroke="var(--badge-depth,#001F43)"/>
  <path d="M36 12l2-2"/>
  <circle cx="11" cy="40" r="3"/><circle cx="16" cy="42" r="3"/>
  <path d="M13 37l-2-6"/>
  <circle cx="34" cy="10" r="1.8" fill="var(--badge-accent,#F4978E)" stroke="none"/>
  <circle cx="40" cy="16" r="1.8" fill="var(--badge-accent,#F4978E)" stroke="none"/>
  <circle cx="42" cy="8" r="1.8" fill="var(--badge-accent,#F4978E)" stroke="none"/>
    </svg>
  );
}
