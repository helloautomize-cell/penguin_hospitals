// Server-only: resolves doctor image slots against files physically present
// in public/images/doctors/ at render/build time. A dropped-in photo switches
// every slot with no code change; nothing here ships to the client.

import { existsSync } from "node:fs";
import path from "node:path";
import {
  DOCTOR_IMAGE_SLOTS,
  doctorSlot,
  type DoctorSlotId,
  type DoctorSlotRatio,
} from "./doctor-images";

const DOCTORS_DIR = path.join(process.cwd(), "public", "images", "doctors");

export type ResolvedDoctorImage = {
  /** Public URL of the resolved image (real file, else fallback). */
  src: string;
  /** True when the real file exists in public/images/doctors/. */
  hasFile: boolean;
  /** True when what renders is the fallback, not the slot file. */
  isFallback: boolean;
  alt: string;
  ratio: DoctorSlotRatio;
  /** object-position needed to keep the face framed on a cropped fallback. */
  objectPosition: string | undefined;
};

function fileExists(slot: DoctorSlotId) {
  return existsSync(path.join(DOCTORS_DIR, DOCTOR_IMAGE_SLOTS[slot].file));
}

function resolveSingle(slot: DoctorSlotId): ResolvedDoctorImage | null {
  const s = DOCTOR_IMAGE_SLOTS[slot];
  if (fileExists(slot)) {
    return {
      src: `/images/doctors/${s.file}`,
      hasFile: true,
      isFallback: false,
      alt: s.alt,
      ratio: s.ratio,
      objectPosition: s.focus,
    };
  }
  if (!s.fallback) return null;
  return {
    src: s.fallback,
    hasFile: false,
    isFallback: true,
    alt: s.alt,
    ratio: s.ratio,
    objectPosition: s.fallbackPos ?? s.focus,
  };
}

export type DoctorImageValue =
  | { kind: "none" }
  | ({ kind: "single" } & ResolvedDoctorImage)
  | {
      kind: "pair";
      left: ResolvedDoctorImage;
      right: ResolvedDoctorImage;
      alt: string;
      ratio: DoctorSlotRatio;
      hasFile: false;
      isFallback: true;
    };

/** Resolve a slot. Returns kind "none" when the file is missing and the slot
 *  has no fallback (nice-to-have slots render nothing). */
export function doctorImage(slot: DoctorSlotId): DoctorImageValue {
  const s = DOCTOR_IMAGE_SLOTS[slot];
  if (s.pair) {
    if (fileExists(slot)) {
      const one = resolveSingle(slot);
      if (one) return { kind: "single", ...one };
    }
    const left = resolveSingle(s.pair[0]);
    const right = resolveSingle(s.pair[1]);
    if (!left || !right) return { kind: "none" };
    return {
      kind: "pair",
      left,
      right,
      alt: s.alt,
      ratio: s.ratio,
      hasFile: false,
      isFallback: true,
    };
  }
  const r = resolveSingle(slot);
  return r ? { kind: "single", ...r } : { kind: "none" };
}

/** Just the resolved URL for drop-in use inside existing <img>/<Image> tags.
 *  Returns "" when the slot must render nothing (no file, no fallback). */
export function doctorImageSrc(slot: DoctorSlotId): string {
  const v = doctorImage(slot);
  return v.kind === "single" ? v.src : "";
}

/** Whether the real file exists for a slot (e.g. to gate hidden figures). */
export function doctorFilePresent(slot: DoctorSlotId): boolean {
  return fileExists(slot);
}

/** doctorImage for a doctor identified by slug/name/url + photo kind. */
export function doctorImageFor(
  who: string,
  kind: import("./doctor-images").DoctorSlotKind,
): DoctorImageValue {
  return doctorImage(doctorSlot(who, kind));
}

export function doctorImageSrcFor(
  who: string,
  kind: import("./doctor-images").DoctorSlotKind,
): string {
  return doctorImageSrc(doctorSlot(who, kind));
}
