import Link from "next/link";
import { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "line" | "glass" | "whatsapp" | "emergency";

const variants: Record<ButtonVariant, string> = {
  primary: "btn btn-coral",
  secondary: "btn btn-navy",
  line: "btn btn-line",
  glass: "btn btn-glass",
  whatsapp: "btn btn-wa",
  emergency: "btn btn-em",
};

type Common = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = Common & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className"
  >;
type ButtonAsButton = Common & { href?: undefined } & Omit<
    React.ComponentProps<"button">,
    "className"
  >;

/** Buttons ported 1:1 from main-pages shell.css (.btn + variant). */
export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonAsLink | ButtonAsButton>(
  function Button({ variant = "primary", className = "", children, ...rest }, ref) {
    const cls = `${variants[variant]} ${className}`;
    if ("href" in rest && rest.href !== undefined) {
      const { href, ...linkRest } = rest as ButtonAsLink;
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} {...linkRest}>
          {children}
        </Link>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={cls}
        {...(rest as ButtonAsButton)}
      >
        {children}
      </button>
    );
  },
);
