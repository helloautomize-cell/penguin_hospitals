// Doctor image slots (resources/docs/DOCTOR-IMAGES.md). Pure data: safe for
// client bundles. Resolution against public/images/doctors/ lives in
// lib/doctor-images.server.ts (node fs). When the real photos arrive they are
// dropped into public/images/doctors/ under `file` and every slot switches
// from its fallback with no code change.

export type DoctorSlotRatio = "4/5" | "1/1" | "16/9" | "3/2";

export type DoctorSlotId =
  | "lakshmiHero"
  | "lakshmiHeadshot"
  | "lakshmiCutout"
  | "lakshmiConsult"
  | "lakshmiPregnancy"
  | "lakshmiScrubs"
  | "lakshmiCorridor"
  | "lakshmiNote"
  | "lakshmiReview"
  | "ashishHero"
  | "ashishHeadshot"
  | "ashishCutout"
  | "ashishConsult"
  | "ashishEcg"
  | "ashishScrubs"
  | "ashishRecovery"
  | "ashishNote"
  | "ashishNight"
  | "together";

export type DoctorSlot = {
  file: string;
  ratio: DoctorSlotRatio;
  alt: string;
  usedOn: string[];
  /** Public-path fallback while the real file is missing; null = hide. */
  fallback: string | null;
  /** object-position so the face stays in frame on cropped fallbacks. */
  fallbackPos?: string;
  /** Canonical object-position for this slot; faces stay in frame at any crop. */
  focus: string;
  priority: "Launch" | "Nice to have";
  /** "pair": two hero slots side by side inside the ratio box (together). */
  pair?: [DoctorSlotId, DoctorSlotId];
};

const PORTRAIT_L = "/images/clinic/dr-lakshmi-portrait.jpg";
const PORTRAIT_A = "/images/clinic/dr-ashish-portrait.jpg";
const FB = "/images/doctors/fallbacks";

export const DOCTOR_IMAGE_SLOTS: Record<DoctorSlotId, DoctorSlot> = {
  lakshmiHero: {
    file: "dr-lakshmi-hero.jpg",
    ratio: "4/5",
    focus: "50% 22%",
    alt: "Dr. Lakshmi Vijay Kalbande, obstetrician and gynaecologist",
    usedOn: ["Dr. Lakshmi page hero", "Doctors page card", "home doctor section"],
    fallback: PORTRAIT_L,
    priority: "Launch",
  },
  lakshmiHeadshot: {
    file: "dr-lakshmi-headshot.jpg",
    ratio: "1/1",
    focus: "50% 32%",
    alt: "Dr. Lakshmi Vijay Kalbande",
    usedOn: [
      '"With Dr. Lakshmi" chips (incl. chapters 1 to 3)',
      "mega menu card",
      "reviewer box on women's pages",
      "blog author",
    ],
    fallback: PORTRAIT_L,
    fallbackPos: "50% 14%",
    priority: "Launch",
  },
  lakshmiCutout: {
    file: "dr-lakshmi-cutout.jpg",
    ratio: "4/5",
    focus: "50% 16%",
    alt: "Dr. Lakshmi Vijay Kalbande at Penguin Hospital",
    usedOn: ['Home "two specialists" block'],
    fallback: PORTRAIT_L,
    priority: "Launch",
  },
  lakshmiConsult: {
    file: "dr-lakshmi-consult.jpg",
    ratio: "16/9",
    focus: "53% 28%",
    alt: "Dr. Lakshmi Vijay Kalbande talking with a patient across her desk",
    usedOn: ['Dr. Lakshmi page "how she works"', "Book page", "First visit step 3"],
    fallback: `${FB}/step-3-consultation.jpg`,
    priority: "Launch",
  },
  lakshmiPregnancy: {
    file: "dr-lakshmi-pregnancy.jpg",
    ratio: "16/9",
    focus: "38% 20%",
    alt: "Dr. Lakshmi Vijay Kalbande with a pregnant patient",
    usedOn: ["Pregnancy care", "High-risk pregnancy"],
    fallback: `${FB}/pregnancy-care.jpg`,
    priority: "Launch",
  },
  lakshmiScrubs: {
    file: "dr-lakshmi-scrubs.jpg",
    ratio: "4/5",
    focus: "40% 28%",
    alt: "Dr. Lakshmi Vijay Kalbande in scrubs",
    usedOn: ["Laparoscopic surgery", "Caesarean delivery", "Fibroids"],
    fallback: null,
    priority: "Nice to have",
  },
  lakshmiCorridor: {
    file: "dr-lakshmi-corridor.jpg",
    ratio: "3/2",
    focus: "50% 15%",
    alt: "Dr. Lakshmi Vijay Kalbande in the hospital corridor",
    usedOn: ["About page", "Emergency page"],
    fallback: null,
    priority: "Nice to have",
  },
  lakshmiNote: {
    file: "dr-lakshmi-note.jpg",
    ratio: "4/5",
    focus: "50% 28%",
    alt: "Dr. Lakshmi Vijay Kalbande, obstetrician and gynaecologist",
    usedOn: ['"A note from Dr. Lakshmi" (her page, women\'s hub)'],
    fallback: PORTRAIT_L,
    priority: "Nice to have",
  },
  lakshmiReview: {
    file: "dr-lakshmi-review.jpg",
    ratio: "16/9",
    focus: "50% 30%",
    alt: "Dr. Lakshmi Vijay Kalbande reviewing a report",
    usedOn: ["Ovarian cysts", "Endometriosis", "PCOS", "Pap smear", "library author block"],
    fallback: null,
    priority: "Nice to have",
  },
  ashishHero: {
    file: "dr-ashish-hero.jpg",
    ratio: "4/5",
    focus: "52% 18%",
    alt: "Dr. Ashish A. Baviskar, cardiothoracic and vascular surgeon",
    usedOn: ["Dr. Ashish page hero", "Doctors page card", "heart hub"],
    fallback: PORTRAIT_A,
    priority: "Launch",
  },
  ashishHeadshot: {
    file: "dr-ashish-headshot.jpg",
    ratio: "1/1",
    focus: "55% 30%",
    alt: "Dr. Ashish A. Baviskar",
    usedOn: [
      '"With Dr. Ashish" chips (incl. chapter 4)',
      "mega menu card",
      "reviewer box on heart pages",
      "blog author",
    ],
    fallback: PORTRAIT_A,
    fallbackPos: "50% 14%",
    priority: "Launch",
  },
  ashishCutout: {
    file: "dr-ashish-cutout.jpg",
    ratio: "4/5",
    focus: "55% 12%",
    alt: "Dr. Ashish A. Baviskar at Penguin Hospital",
    usedOn: ['Home "two specialists" block'],
    fallback: PORTRAIT_A,
    priority: "Launch",
  },
  ashishConsult: {
    file: "dr-ashish-consult.jpg",
    ratio: "16/9",
    focus: "48% 22%",
    alt: "Dr. Ashish A. Baviskar explaining a heart model to a patient and his daughter",
    usedOn: ["Dr. Ashish page", "Heart check-up", "Bypass surgery"],
    fallback: `${FB}/heart-check-up.jpg`,
    priority: "Launch",
  },
  ashishEcg: {
    file: "dr-ashish-ecg.jpg",
    ratio: "16/9",
    focus: "42% 25%",
    alt: "Dr. Ashish A. Baviskar reading an ECG trace",
    usedOn: ["Heart check-up", "Heart valve surgery", "heart map section (mobile)"],
    fallback: null,
    priority: "Nice to have",
  },
  ashishScrubs: {
    file: "dr-ashish-scrubs.jpg",
    ratio: "4/5",
    focus: "38% 22%",
    alt: "Dr. Ashish A. Baviskar in scrubs",
    usedOn: ["Keyhole heart surgery", "Bypass surgery", "Lung and chest surgery"],
    fallback: null,
    priority: "Nice to have",
  },
  ashishRecovery: {
    file: "dr-ashish-recovery.jpg",
    ratio: "3/2",
    focus: "58% 15%",
    alt: "Dr. Ashish A. Baviskar with a patient recovering after heart surgery",
    usedOn: ["About page", 'Keyhole heart surgery "after surgery"', "Varicose veins"],
    fallback: `${FB}/keyhole-heart-surgery.jpg`,
    priority: "Nice to have",
  },
  ashishNote: {
    file: "dr-ashish-note.jpg",
    ratio: "4/5",
    focus: "45% 22%",
    alt: "Dr. Ashish A. Baviskar, cardiothoracic and vascular surgeon",
    usedOn: ['"A note from Dr. Ashish" (his page, heart hub)'],
    fallback: PORTRAIT_A,
    priority: "Nice to have",
  },
  ashishNight: {
    file: "dr-ashish-night.jpg",
    ratio: "16/9",
    focus: "28% 20%",
    alt: "Dr. Ashish A. Baviskar on a night round at Penguin Hospital",
    usedOn: ["Emergency page", 'heart hub "day and night"'],
    fallback: "/images/hero/night-corridor.jpg",
    priority: "Nice to have",
  },
  together: {
    file: "doctors-together.jpg",
    ratio: "16/9",
    focus: "50% 18%",
    alt: "Dr. Lakshmi Vijay Kalbande and Dr. Ashish A. Baviskar together at Penguin Hospital",
    usedOn: ["About page hero", "Doctors page header", 'home "two specialists"'],
    fallback: null,
    pair: ["lakshmiHero", "ashishHero"],
    priority: "Launch",
  },
};

export const DOCTOR_SLOT_IDS = Object.keys(DOCTOR_IMAGE_SLOTS) as DoctorSlotId[];

/** Which doctor a slot prefix belongs to, from a slug, name or url. */
export function doctorPrefix(v: string): "lakshmi" | "ashish" {
  return /ashish/i.test(v) ? "ashish" : "lakshmi";
}

export type DoctorSlotKind = "Hero" | "Headshot" | "Cutout" | "Consult" | "Note";

/** Slot id for a doctor + photo kind: doctorSlot("dr-ashish-baviskar","Hero") -> "ashishHero". */
export function doctorSlot(who: string, kind: DoctorSlotKind): DoctorSlotId {
  return `${doctorPrefix(who)}${kind}` as DoctorSlotId;
}
