"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarDays, Phone } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/** Mobile action bar (.mbar): fixed 3-up bar under 760px. */
export function MobileActionBar() {
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const fields = "input, select, textarea";
    const onIn = (e: FocusEvent) => (e.target as HTMLElement).matches(fields) && setTyping(true);
    const onOut = (e: FocusEvent) => (e.target as HTMLElement).matches(fields) && setTyping(false);
    document.addEventListener("focusin", onIn, true);
    document.addEventListener("focusout", onOut, true);
    return () => {
      document.removeEventListener("focusin", onIn, true);
      document.removeEventListener("focusout", onOut, true);
    };
  }, []);

  if (pathname === "/thank-you/" || typing) return null;

  return (
    <nav className="mbar" aria-label="Quick actions">
      <Link href="/book/">
        <CalendarDays className="ico" aria-hidden="true" />
        Book
      </Link>
      <a href="tel:+919518904156">
        <Phone className="ico" aria-hidden="true" />
        Call
      </a>
      <a href={whatsappLink("a visit")}>
        <WhatsAppIcon className="ico" />
        WhatsApp
      </a>
    </nav>
  );
}
