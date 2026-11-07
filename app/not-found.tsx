import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="nf404">
      <div className="wrap nf404in">
        <Image
          className="nf404logo"
          src="/images/brand/logo-penguin-hospital.png"
          alt=""
          width={120}
          height={120}
          priority
        />
        <p className="nf404code">404</p>
        <h1 className="nf404h">This page has wandered off the ice</h1>
        <p className="nf404p">
          The page you asked for is not here. It may have moved, or the link may be
          old.
        </p>
        <div className="nf404cta">
          <Link className="btn nf404home" href="/">
            Home
          </Link>
          <Link className="btn nf404book" href="/book/">
            Book a visit
          </Link>
          <a className="btn nf404emg" href={`tel:${site.phone.tel}`}>
            Emergency? Call {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
