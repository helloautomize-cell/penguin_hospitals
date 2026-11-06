// Hand-drawn badge art (Fertility evaluation). 48x48 grid, live area 40x40.
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
  <path d="M8 36c4-2 8-2 10 0l6-6c3-3 8-3 8 0s-5 9-8 9-8-3-8-3"/>
  <path d="M8 36c-2-4-2-8 0-10 2-2 5-2 7 0"/>
  <path d="M40 36c-3 0-6-2-8-4" stroke="var(--badge-depth,#001F43)"/>
  <path d="M24 34v-5M24 29c0-2.5 2-4.5 4.5-4.5 0 2.5-2 4.5-4.5 4.5zM24 30c0-2-1.5-3.5-4-3.5 0 2 1.5 3.5 4 3.5z" stroke="var(--badge-accent,#F4978E)"/>
    </svg>
  );
}
