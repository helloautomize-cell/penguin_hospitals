import Link from "next/link";

export type Crumb = { label: string; href: string };

/** Breadcrumb trail (.crumbs) + BreadcrumbList JSON-LD. `dark` for photo heroes. */
export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const list = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `https://penguinhospitals.com${c.href}`,
    })),
  };
  return (
    <>
      <nav className={`crumbs${dark ? " dk" : ""}`} aria-label="Breadcrumb">
        {list.map((c, i) => {
          const last = i === list.length - 1;
          return (
            <span key={c.href} style={{ display: "contents" }}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {last ? (
                <span aria-current="page">{c.label}</span>
              ) : (
                <Link href={c.href}>{c.label}</Link>
              )}
            </span>
          );
        })}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
