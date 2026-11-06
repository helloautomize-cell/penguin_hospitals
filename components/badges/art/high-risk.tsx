// Hand-drawn badge art (High-risk pregnancy). 48x48 grid, live area 40x40.
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
  <path d="M24 6l13 5v11c0 8-5.5 13.5-13 16-7.5-2.5-13-8-13-16V11z"/>
  <circle cx="24" cy="17" r="3"/>
  <path d="M22 33c2-1 3-3 3-6-2 2-5 2-5-1 0-2 2-3 4-3l4-2c1 4 1 8-1 12z" fill="var(--badge-accent-fill,#F9C9B6)" stroke="none"/>
  <path d="M23 20c-1 4-1 8 0 13M25 20c2 3 3 6 2 10"/>
    </svg>
  );
}
