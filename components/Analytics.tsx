"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeConsent,
} from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

type ConsentEvent =
  | "book_click" | "call_click" | "whatsapp_click" | "directions_click"
  | "map_load" | "video_play" | "generate_lead";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

/** GA4 + Consent Mode v2. Loads gtag only after an Accept decision. */
export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);

  useEffect(() => {
    if (!GA_ID) return;
    // Consent Mode v2 defaults: everything denied until Accept
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });
    gtag("js", new Date());
  }, []);

  useEffect(() => {
    if (!GA_ID || !consent) return;
    gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }, [consent]);

  // strip query strings except utm_* before any page view is sent
  useEffect(() => {
    if (!GA_ID) return;
    const url = new URL(window.location.href);
    for (const k of [...url.searchParams.keys()]) {
      if (!k.startsWith("utm_")) url.searchParams.delete(k);
    }
    gtag("set", "page_location", url.toString());
    gtag("config", GA_ID, { send_page_view: false });
  }, []);

  // delegated event tracking for outbound action links
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href]");
      if (!a) return;
      const href = (a as HTMLAnchorElement).href;
      let ev: ConsentEvent | null = null;
      if (href.startsWith("tel:")) ev = "call_click";
      else if (href.includes("wa.me") || href.includes("whatsapp")) ev = "whatsapp_click";
      else if (href.includes("maps.google") || href.includes("maps.app.goo.gl")) ev = "directions_click";
      else if (href.includes("/book/")) ev = "book_click";
      if (ev) gtag("event", ev);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID || !consent?.analytics) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      {process.env.VERCEL_ENV !== "preview" && <script defer src="/_vercel/speed-insights/script.js" data-route="/" />}
    </>
  );
}
