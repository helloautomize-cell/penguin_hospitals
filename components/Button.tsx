import Link from "next/link";
import { forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "navy"
  | "secondary"
  | "glass"
  | "outline"
  | "line"
  | "whatsapp"
  | "emergency";

const variants: Record<ButtonVariant, string> = {
  primary: "btn btn-coral",
  navy: "btn btn-navy",
  secondary: "btn btn-navy",
  glass: "btn btn-glass",
  outline: "btn btn-line",
  line: "btn btn-line",
  whatsapp: "btn btn-wa",
  emergency: "btn btn-em",
};

const sizes = { md: "btn-md", lg: "btn-lg" } as const;
export type ButtonSize = keyof typeof sizes;

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = Common & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className"
  >;
type ButtonAsAnchor = Common & { href: string } & Omit<
    React.ComponentProps<"a">,
    "href" | "className"
  >;
type ButtonAsButton = Common & { href?: undefined } & Omit<
    React.ComponentProps<"button">,
    "className"
  >;

/** Shared button (.btn + variant + size). Internal hrefs use next/link,
 *  tel:/mailto:/http(s) hrefs render a plain anchor. */
export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonAsLink | ButtonAsAnchor | ButtonAsButton
>(function Button(
  { variant = "primary", size, className = "", children, ...rest },
  ref,
) {
  const cls = `${variants[variant]}${size ? ` ${sizes[size]}` : ""} ${className}`;
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest;
    if (/^(tel:|mailto:|https?:)/.test(href)) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cls}
          {...(linkRest as Omit<ButtonAsAnchor, keyof Common | "href">)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        {...(linkRest as Omit<ButtonAsLink, keyof Common | "href">)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={cls}
      {...(rest as Omit<ButtonAsButton, keyof Common>)}
    >
      {children}
    </button>
  );
});
