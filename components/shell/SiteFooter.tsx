import Link from "next/link";
import { footerColumns } from "@/lib/nav";
import { site } from "@/lib/site-config";
import { ConfirmChip } from "@/components/Tag";

/** Footer (.foot) from the approved preview. */
export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <img className="logo" src="/images/brand/logo-penguin-hospital.png" alt="Dr. Lakshmi's Penguin Hospital" />
            <p>
              {site.address.line1},
              <br />
              {site.address.line2},
              <br />
              {site.address.locality}, {site.address.city} {site.address.postalCode}
            </p>
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
          {footerColumns.map((col) => (
            <div key={col.label}>
              <h4>{col.label}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
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
