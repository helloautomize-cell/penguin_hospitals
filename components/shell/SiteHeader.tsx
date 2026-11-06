"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, TriangleAlert, ArrowRight } from "lucide-react";
import { headerMenu, womenGroups, heartGroups, type NavGroup } from "@/lib/nav";
import { doctors } from "@/lib/doctors";
import { DoctorBadge } from "@/components/badges/ServiceBadge";
import { MobileMenu } from "./MobileMenu";

function Mega({ groups, doctorIndex, wide }: { groups: NavGroup[]; doctorIndex: number; wide: boolean }) {
  const d = doctors[doctorIndex];
  return (
    <div className={`mega ${wide ? "mega-w" : "mega-h"}`}>
      {groups.map((g, gi) => (
        <div key={g.label}>
          <h5><DoctorBadge variant={doctorIndex === 0 ? "female" : "male"} />{g.label}</h5>
          <ul>
            {g.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            {gi === groups.length - 1 && (
              <li>
                <Link href={doctorIndex === 0 ? "/obstetrics-gynaecology/" : "/heart-and-vascular-surgery/"}>
                  All {doctorIndex === 0 ? "women's" : "heart"} care
                </Link>
              </li>
            )}
          </ul>
        </div>
      ))}
      <Link className="mdoc" href={d.profileHref}>
        <img src={d.portrait} alt="" />
        <span>
          <b>
            {d.name} {d.nameSoft}
          </b>
          {d.role}
        </span>
        <em>
          View profile <ArrowRight className="ico" aria-hidden="true" />
        </em>
      </Link>
    </div>
  );
}

/** Floating pill nav + hover mega menus, ported from main-pages shell.css. */
export function SiteHeader() {
  const pathname = usePathname();
  const [small, setSmall] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSmall(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className={`navbar${small ? " small" : ""}`} id="navbar">
        <div className="wrap">
          <div className="pillnav">
            <Link href="/" aria-label="Dr. Lakshmi's Penguin Hospital, home">
              <img className="logo" src="/images/brand/logo-penguin-hospital.png" alt="Dr. Lakshmi's Penguin Hospital" />
            </Link>
            <nav className="mainnav" aria-label="Main">
              {headerMenu.map((item) =>
                item.mega ? (
                  <div className="mi has" key={item.href}>
                    <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                      {item.label}
                      <ChevronDown className="ico chev" aria-hidden="true" />
                    </Link>
                    <Mega
                      groups={item.mega === "women" ? womenGroups : heartGroups}
                      doctorIndex={item.mega === "women" ? 0 : 1}
                      wide={item.mega === "women"}
                    />
                  </div>
                ) : (
                  <div className="mi" key={item.href}>
                    <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </div>
                ),
              )}
            </nav>
            <Link className="em" href="/emergency/">
              <TriangleAlert className="ico" aria-hidden="true" />
              Emergency 108 / 112
            </Link>
            <Link className="btn btn-navy" href="/book/">
              Book a visit<span className="dot"></span>
            </Link>
            <button
              className="burger"
              type="button"
              aria-label="Open menu"
              aria-controls="msheet"
              onClick={() => setOpen(true)}
            >
              <Menu className="ico" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
