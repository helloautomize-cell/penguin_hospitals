import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/** Floating WhatsApp circle (.wa), desktop only (hidden under 760px by CSS). */
export function FloatingWhatsApp() {
  return (
    <a className="wa" href={whatsappLink("a visit")} aria-label="Ask us on WhatsApp">
      <WhatsAppIcon className="ico" />
    </a>
  );
}
