import Link from "next/link";
import Image from "next/image";
import { footerColumns } from "@/lib/nav";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { ConfirmChip } from "@/components/Tag";
import { MapPin, Phone, ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/Button";

/** Footer (.foot) from the approved preview; link groups are accordions on phones. */
export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <Image
              className="logo"
              src="/images/brand/logo-penguin-hospital.png"
              alt="Dr. Lakshmi's Penguin Hospital"
              width={140}
              height={88}
              sizes="104px"
            />
            <p>
              {site.address.line1},
              <br />
              {site.address.line2},
              <br />
              {site.address.locality}, {site.address.city} {site.address.postalCode}
            </p>
            <div className="facts">
              <Button variant="navy" className="dir" href={site.googleMapsUrl} target="_blank" rel="noopener">
                <MapPin className="ico" aria-hidden="true" />
                Directions
              </Button>
              <Button variant="primary" className="cal2" href={`tel:${site.phone.tel}`}>
                <Phone className="ico" aria-hidden="true" />
                Call
              </Button>
              <Button variant="whatsapp" className="wa2" href={whatsappLink("a visit")}>
                <WhatsAppIcon className="ico" />
                WhatsApp
              </Button>
            </div>
            <div className="hrs">
              <span>
                <b>Emergency</b> open day and night
              </span>
              <span>
                <b>OPD</b> Monday to Saturday <ConfirmChip />, Sunday 4 pm to 6 pm
              </span>
              <span>
                <b>Call or WhatsApp</b>{" "}
                <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
              </span>
            </div>
          </div>
          {footerColumns.map((col, i) => (
            <div className="fdet" key={col.label}>
              <input type="checkbox" className="fchk" id={`fc-${i}`} />
              <label className="fsum" htmlFor={`fc-${i}`}>
                {col.label}
                <ChevronDown className="ico" aria-hidden="true" />
              </label>
              <div className="fw">
                <div>
                  <ul>
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="pcpndt-f">{site.pcpndtLine}</p>
        <div className="legal">
          <span>
            © {site.copyright.year} {site.copyright.entity} <ConfirmChip note="legal entity" />
          </span>
          <span>{site.educationDisclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
