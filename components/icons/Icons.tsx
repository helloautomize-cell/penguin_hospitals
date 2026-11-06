// UI icons ported 1:1 from the main-pages sprite (paths kept exactly).
// Rendering rules match .ico in shell.css.
import React from "react";

export type IconName = "cal" | "phone" | "arrow" | "alert" | "menu" | "wa" | "pin" | "plus" | "chev" | "check" | "shield" | "heart" | "pulse" | "drop" | "baby" | "sun" | "home" | "cycle" | "seed" | "scope" | "lungs" | "leg" | "arm" | "wave" | "gauge" | "bump" | "dot" | "dots" | "clock" | "doc" | "lock" | "users" | "moon" | "car" | "pause" | "play";

const PATHS: Record<IconName, React.ReactNode> = {
  cal: (<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>),
  phone: (<><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></>),
  arrow: (<><path d="M5 12h14M13 6l6 6-6 6"/></>),
  alert: (<><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/></>),
  menu: (<><path d="M4 8h16M4 16h16"/></>),
  wa: (<><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z"/></>),
  pin: (<><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></>),
  plus: (<><path d="M12 5v14M5 12h14"/></>),
  chev: (<><path d="M6 9l6 6 6-6"/></>),
  check: (<><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.5L16 9.5"/></>),
  shield: (<><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/></>),
  heart: (<><path d="M12 20s-8-4.9-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.1-8 11-8 11z"/></>),
  pulse: (<><path d="M3 12h4l2-5 3 10 2.5-7 1.5 2H21"/></>),
  drop: (<><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></>),
  baby: (<><circle cx="12" cy="8" r="4"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/><path d="M10.5 8.5h.01M13.5 8.5h.01"/></>),
  sun: (<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>),
  home: (<><path d="M4 11l8-7 8 7v9H4z"/><path d="M12 17s-3-1.8-3-3.6A1.6 1.6 0 0 1 12 12.6a1.6 1.6 0 0 1 3 .8C15 15.2 12 17 12 17z"/></>),
  cycle: (<><path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v4h-4"/><circle cx="12" cy="12" r="2"/></>),
  seed: (<><path d="M12 21v-8"/><path d="M12 13c0-4 3-7 7-7 0 4-3 7-7 7zM12 15c0-3-2.5-5.5-6-5.5 0 3 2.5 5.5 6 5.5z"/></>),
  scope: (<><path d="M4 20l9-9"/><circle cx="15.5" cy="8.5" r="3.5"/><path d="M18 6l2-2"/></>),
  lungs: (<><path d="M12 4v8M12 12c-1 0-2 1-3 1M12 12c1 0 2 1 3 1"/><path d="M9 7c-3 0-5 5-5 10 0 2 1.5 3 3 3s2-1 2-3zM15 7c3 0 5 5 5 10 0 2-1.5 3-3 3s-2-1-2-3z"/></>),
  leg: (<><path d="M10 3v10l-2 7h6l1-2"/><path d="M14 3v8c0 2 1 3 1 5"/><path d="M12 6c1 1 0 2 1 3s0 2 1 3"/></>),
  arm: (<><path d="M3 15h11a3 3 0 0 0 0-6H8"/><path d="M14 12c2 0 3-2 5-2h2M14 12c2 0 3 2 5 2h2"/></>),
  wave: (<><path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/><path d="M3 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0" opacity=".5"/></>),
  gauge: (<><path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/><circle cx="12" cy="16" r="1.4"/></>),
  bump: (<><circle cx="10" cy="5" r="2.5"/><path d="M9 9c-2 2-2 5 0 7v5M11 9c4 1 6 4 4 7h-4"/></>),
  dot: (<><path d="M6 5c0 6 2 9 6 9s6-3 6-9"/><path d="M12 14v6"/><circle cx="14.5" cy="8.5" r="2"/></>),
  dots: (<><path d="M6 5c0 6 2 9 6 9s6-3 6-9"/><path d="M12 14v6"/><path d="M4 12h.01M20 12h.01M8 17h.01M16 17h.01M12 3h.01"/></>),
  clock: (<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  doc: (<><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/></>),
  lock: (<><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>),
  users: (<><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14c2.8 0 5 2.2 5 5"/></>),
  moon: (<><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></>),
  car: (<><path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v3H3zM7 19v1M17 19v1M5 11h14"/></>),
  pause: (<><path d="M9 6v12M15 6v12"/></>),
  play: (<><path d="M8 5.5v13l10-6.5z"/></>),
};

export function Icon({
  name,
  size = 18,
  className = "ico",
}: {
  name: IconName;
  size?: 18 | 20 | 22 | 24 | 26 | 28 | number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}