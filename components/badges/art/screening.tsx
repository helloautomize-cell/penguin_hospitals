// Hand-drawn badge art (Pap smear and colposcopy). 48x48 grid, live area 40x40.
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
  <circle cx="20" cy="20" r="10" fill="var(--badge-accent-fill,#F9C9B6)" fillOpacity=".6" stroke="none"/>
  <circle cx="20" cy="20" r="10"/><path d="M28 28l8 8"/>
  <circle cx="20" cy="20" r="5"/><ellipse cx="20" cy="20" rx="2" ry="3"/>
    </svg>
  );
}
