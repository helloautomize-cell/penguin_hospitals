import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** "Under one roof" staggered photo cards (.under/.pstrip/.pcard). */
export function ChapterCards() {
  const cards = [
    {
      href: "/pregnancy-care/",
      src: "/images/services/pregnant-window.jpg",
      alt: "A pregnant woman by a window at dawn",
      k: "Nine months",
      t: "Pregnancy care, week by week",
    },
    {
      href: "/obstetrics-gynaecology/",
      src: "/images/services/newborn-hand.jpg",
      alt: "A newborn's hand holding a parent's finger",
      k: "Day one",
      t: "Delivery and newborn care",
    },
    {
      href: "/heart-and-vascular-surgery/",
      src: "/images/services/heart-grandfather.jpg",
      alt: "A grandfather laughing with his granddaughter",
      k: "The years after",
      t: "Heart and vascular care",
    },
  ];
  return (
    <section className="under" aria-labelledby="u-h">
      <div className="wrap">
        <div className="in">
          <div className="l">
            <span className="tag">
              <i></i>Under one roof
            </span>
            <h2 className="h2" id="u-h">
              Every chapter, <span className="soft">from the first flutter to the years after.</span>
            </h2>
            <p className="lede">
              Penguin Hospital is a family hospital in Chinchwad Gaon. Women come to us for periods,
              pregnancy and the years after. Their parents and husbands come to us for their hearts.
              Two specialists lead the care, and an emergency team is here around the clock.
            </p>
          </div>
          <div className="pstrip">
            {cards.map((c) => (
              <Link className="pcard" href={c.href} key={c.t}>
                <img src={c.src} alt={c.alt} loading="lazy" />
                <span className="go">
                  <ArrowRight className="ico" aria-hidden="true" />
                </span>
                <span className="cap">
                  <small>{c.k}</small>
                  <b>{c.t}</b>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
