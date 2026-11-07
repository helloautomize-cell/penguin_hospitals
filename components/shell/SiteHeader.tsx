"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, TriangleAlert, ArrowRight } from "lucide-react";
import { headerMenu, womenGroups, heartGroups, type NavGroup } from "@/lib/nav";
import { doctors } from "@/lib/doctors";
import { DoctorBadge } from "@/components/badges/ServiceBadge";
import { MobileMenu } from "./MobileMenu";

function Mega({ groups, doctorIndex, wide, img }: { groups: NavGroup[]; doctorIndex: number; wide: boolean; img?: string }) {
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
        <Image src={img ?? d.portrait} alt="" width={56} height={56} />
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
export function SiteHeader({ docImgs }: { docImgs?: [string, string] }) {
  const pathname = usePathname();
  const [small, setSmall] = useState(false);
  const [open, setOpen] = useState(false);
  const [hid, setHid] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const phone = () => matchMedia("(max-width:767px)").matches;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setSmall(y > 40);
        if (phone()) {
          const dy = y - lastY.current;
          if (dy > 12 && y > 120) setHid(true);
          else if (dy < -2 || y < 60) setHid(false);
        }
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }
  const [prevMenuOpen, setPrevMenuOpen] = useState(open);
  if (open !== prevMenuOpen) {
    setPrevMenuOpen(open);
    if (open) setHid(false);
  }

  const openMenu = () => {
    const b = burgerRef.current?.getBoundingClientRect();
    const sheet = document.getElementById("msheet");
    if (b && sheet) {
      sheet.style.setProperty("--cx", `${b.left + b.width / 2}px`);
      sheet.style.setProperty("--cy", `${b.top + b.height / 2}px`);
    }
    setOpen(true);
  };

  return (
    <>
      <header className={`navbar${small ? " small" : ""}${hid && !open ? " hid" : ""}`} id="navbar">
        <div className="wrap">
          <div className="pillnav">
            <Link href="/" aria-label="Dr. Lakshmi's Penguin Hospital, home">
              <Image
                className="logo"
                src="/images/brand/logo-penguin-hospital.png"
                alt="Dr. Lakshmi's Penguin Hospital"
                width={140}
                height={88}
                sizes="70px"
                priority
              />
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
                      img={item.mega === "women" ? docImgs?.[0] : docImgs?.[1]}
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
              ref={burgerRef}
              onClick={openMenu}
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
