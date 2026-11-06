/** Small pill eyebrow with a dot (.tag / .tag.dk from shell.css). */
export function Tag({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={`tag${dark ? " dk" : ""} ${className}`}>
      <i aria-hidden />
      {children}
    </span>
  );
}

export function Chip({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex min-h-9 items-center rounded-full px-4 text-[14px] font-medium ${
        dark ? "bg-white/10 text-on-dark" : "bg-frost text-ink"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** Yellow chip marking an unconfirmed fact (.confirm from shell.css). */
export function ConfirmChip({ note, className = "" }: { note?: string; className?: string }) {
  if (process.env.NEXT_PUBLIC_HIDE_CONFIRMS === "1") return null;
  return (
    <span className={`confirm ${className}`} title={note ? `CONFIRM: ${note}` : "CONFIRM"}>
      CONFIRM{note ? `: ${note}` : ""}
    </span>
  );
}
