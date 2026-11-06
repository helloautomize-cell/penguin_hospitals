"use client";

import { useSyncExternalStore } from "react";
import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  resetConsent,
  setConsent,
  subscribeConsent,
} from "@/lib/consent";
import { useEffect, useState } from "react";

function useConsent() {
  return useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);
}

/** Wire the footer "Cookie settings" button to reopen the banner. */
export function CookieSettingsLink() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cookie-settings]")) resetConsent();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

/**
 * Consent card, bottom left above the mobile bar.
 * Nothing (analytics, maps, video) loads before a choice is stored.
 */
export function CookieBanner() {
  const consent = useConsent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  if (consent?.decided) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie settings"
      className="fixed bottom-20 left-4 right-4 z-[75] max-w-sm rounded-card border border-line bg-white p-5 shadow-lg lg:bottom-6 lg:left-6 lg:right-auto"
    >
      <p className="text-[15px] font-semibold text-ink">Cookies on this site</p>
      <p className="mt-1.5 text-[14px] leading-[1.5] text-ink-2">
        We use essential cookies to run the site. Analytics cookies help us improve it, and only run
        if you say yes.
      </p>
      {settingsOpen ? (
        <div className="mt-4 grid gap-3">
          <label className="flex items-center justify-between text-[15px] text-ink">
            Essential <span className="text-[13px] text-ink-2">always on</span>
          </label>
          <label className="flex min-h-12 cursor-pointer items-center justify-between text-[15px] text-ink">
            Analytics
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="size-5 accent-blue"
            />
          </label>
          <button
            type="button"
            onClick={() => setConsent(analytics)}
            className="min-h-12 rounded-full bg-[image:var(--grad-brand)] text-[15px] font-semibold text-white"
          >
            Save choices
          </button>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setConsent(true)}
            className="min-h-12 flex-1 rounded-full bg-[image:var(--grad-brand)] px-4 text-[15px] font-semibold text-white"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => setConsent(false)}
            className="min-h-12 flex-1 rounded-full border-[1.5px] border-line px-4 text-[15px] font-semibold text-ink"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="min-h-12 w-full rounded-full border-[1.5px] border-line px-4 text-[15px] font-semibold text-ink-2"
          >
            Settings
          </button>
        </div>
      )}
    </div>
  );
}
