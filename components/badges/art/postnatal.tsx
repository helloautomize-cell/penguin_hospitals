// Hand-drawn badge art (After birth). 48x48 grid, live area 40x40.
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
  <path d="M10 21l14-10 14 10v15H10z"/>
  <path d="M20 36v-7h8v7"/>
  <circle cx="21" cy="22" r="2.5"/><circle cx="26" cy="24" r="1.8"/>
  <path d="M18 29c1-2 4-2 6 0"/>
  <path d="M24 8.5s-3-1.8-3-4a1.7 1.7 0 0 1 3-.9 1.7 1.7 0 0 1 3 .9c0 2.2-3 4-3 4z" stroke="var(--badge-accent,#F4978E)" fill="var(--badge-accent-fill,#F9C9B6)" strokeWidth="1.5"/>
    </svg>
  );
}
