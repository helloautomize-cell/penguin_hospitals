// Hand-drawn badge art (Caesarean delivery). 48x48 grid, live area 40x40.
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
  <path d="M8 20a16 12 0 0 0 0 9c4 5 10 7 16 7s12-2 16-7a16 12 0 0 0 0-9"/>
  <path d="M12 12a12 7 0 0 1 24 0"/>
  <circle cx="24" cy="22" r="4"/>
  <path d="M17 30c0-4 3-5 7-5s7 1 7 5" fill="var(--badge-accent-fill,#F9C9B6)" stroke="none"/>
  <path d="M17 30c0-4 3-5 7-5s7 1 7 5"/>
    </svg>
  );
}
