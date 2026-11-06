// Hand-drawn badge art (PCOS). 48x48 grid, live area 40x40.
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
  <ellipse cx="15" cy="24" rx="11" ry="8" fill="var(--badge-accent-fill,#F9C9B6)" stroke="none"/>
  <ellipse cx="15" cy="24" rx="11" ry="8"/>
  <circle cx="10" cy="21" r="2.2"/><circle cx="17" cy="20" r="2.2"/><circle cx="20" cy="27" r="2.2"/><circle cx="12" cy="28" r="2.2"/>
  <path d="M36 12v22M31 38h10M36 16l-6 8M36 16l6 8"/>
  <path d="M28 28a4 4 0 0 0 8 0"/>
    </svg>
  );
}
