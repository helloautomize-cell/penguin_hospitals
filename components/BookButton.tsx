import { CalendarDays } from "lucide-react";
import { Button, type ButtonVariant } from "./Button";

/** The main book CTA. Always the brand gradient. */
export function BookButton({
  href = "/book/",
  children = "Book a visit",
  variant = "primary",
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Button href={href} variant={variant} className={className}>
      <CalendarDays aria-hidden className="size-[18px]" strokeWidth={1.75} />
      {children}
    </Button>
  );
}
