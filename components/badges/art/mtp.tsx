// Hand-drawn badge art (Medical termination of pregnancy). 48x48 grid, live area 40x40.
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
  <rect x="10" y="10" width="24" height="28" rx="3"/>
  <path d="M16 6v6M24 6v6M32 6v6"/>
  <path d="M15 20h4M15 25h4M15 30h4M22 20h4M22 25h4"/>
  <path d="M34 30l6 2v4c0 3-2.7 5.4-6 6-3.3-.6-6-3-6-6v-4z" fill="var(--badge-accent-fill,#F9C9B6)"/>
    </svg>
  );
}
