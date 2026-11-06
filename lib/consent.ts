/*
  Consent store (DPDP): essential cookies always on, analytics only
  after an explicit Accept. useSyncExternalStore consumers must get a
  CACHED snapshot object, so we keep a stable reference and only swap
  it when the stored choice actually changes.
*/

export type ConsentChoice = { analytics: boolean; decided: true };

const KEY = "ph-consent-v1";

type Listener = () => void;
const listeners = new Set<Listener>();

let snapshot: ConsentChoice | null = null;

function read(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { analytics?: unknown };
    return { analytics: parsed.analytics === true, decided: true };
  } catch {
    return null;
  }
}

function emit() {
  for (const l of listeners) l();
}

export function setConsent(analytics: boolean) {
  const next: ConsentChoice = { analytics, decided: true };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // private mode etc: keep in-memory consent for this session
  }
  snapshot = next;
  emit();
}

export function resetConsent() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  snapshot = null;
  emit();
}

export function subscribeConsent(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsentSnapshot(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  if (snapshot === null) {
    snapshot = read();
  }
  return snapshot;
}

export function getServerConsentSnapshot(): ConsentChoice | null {
  return null;
}
