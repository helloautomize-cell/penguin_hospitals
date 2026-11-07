import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: React.ReactNode };

/** FAQ accordion (.faq details/summary from pages.css). Works without JS.
 *  Same `name` on every <details> makes the group exclusive: opening one
 *  closes the others natively in the browser. */
export function Accordion({ items, firstOpen = true, name }: { items: FaqItem[]; firstOpen?: boolean; name?: string }) {
  const group = name ?? `faq-${items[0]?.q.replace(/[^a-z0-9]+/gi, "-").slice(0, 30).toLowerCase()}`;
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.q} name={group} open={firstOpen && i === 0}>
          <summary>
            {item.q}
            <i aria-hidden="true">
              <Plus className="ico" />
            </i>
          </summary>
          <div className="a">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
