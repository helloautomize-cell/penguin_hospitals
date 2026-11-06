import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: React.ReactNode };

/** FAQ accordion (.faq details/summary from pages.css). Works without JS. */
export function Accordion({ items, firstOpen = true }: { items: FaqItem[]; firstOpen?: boolean }) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.q} open={firstOpen && i === 0}>
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
