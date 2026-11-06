// Shared doctor data. Facts come from resources/content/01-core.md.
// `confirm` fields render a ConfirmChip in dev and preview.

export type Doctor = {
  slug: string;
  name: string;
  nameSoft: string;
  role: string;
  shortRole: string;
  marginNote: string;
  bookingLabel: string;
  profileHref: string;
  portrait: string;
  /** "Sees" line on the doctors hub card */
  sees: string;
  facts: { label: string; value: string; confirm?: string }[];
  principles: string[];
};

export const doctors: Doctor[] = [
  {
    slug: "dr-lakshmi-vijay-kalbande",
    name: "Dr. Lakshmi",
    nameSoft: "Vijay Kalbande",
    role: "Obstetrician and gynaecologist · Laparoscopic surgeon · Founder",
    shortRole: "Obstetrics and gynaecology",
    marginNote: "the \u201cLakshmi\u201d in our name.",
    bookingLabel: "Book with Dr. Lakshmi",
    profileHref: "/doctors/dr-lakshmi-vijay-kalbande/",
    portrait: "/images/clinic/dr-lakshmi-portrait.jpg",
    sees: "Pregnancy and delivery, high-risk pregnancy, PCOS, period problems, fibroids, cysts, menopause, keyhole surgery.",
    facts: [
      { label: "Qualifications", value: "MBBS, DNB (Obstetrics and Gynaecology)" },
      { label: "Fellowship", value: "Gynaecological and Obstetric Ultrasound, FOGSI recognised" },
      { label: "Registration", value: "2013/04/1086", confirm: "council" },
      { label: "Memberships", value: "Indian Menopause Society · IOTA group" },
      { label: "Languages", value: "", confirm: "languages" },
    ],
    principles: [
      "Every high-risk pregnancy gets its own plan",
      "Normal and painless birth discussed first, when safe",
      "Keyhole surgery only when it is the right step",
    ],
  },
  {
    slug: "dr-ashish-baviskar",
    name: "Dr. Ashish",
    nameSoft: "A. Baviskar",
    role: "Cardiothoracic and vascular surgeon (CTVS)",
    shortRole: "Heart and vascular surgery",
    marginNote: "does keyhole heart surgery.",
    bookingLabel: "Book with Dr. Ashish",
    profileHref: "/doctors/dr-ashish-baviskar/",
    portrait: "/images/clinic/dr-ashish-portrait.jpg",
    sees: "Heart bypass and valves, keyhole heart surgery, lung and chest surgery, varicose veins, leg arteries, AV fistula.",
    facts: [
      { label: "Qualifications", value: "MBBS, MS (General Surgery), MCh (CTVS)" },
      { label: "Experience", value: "More than 15 years, in hospitals across India" },
      { label: "Registration", value: "", confirm: "registration number" },
      { label: "Languages", value: "", confirm: "languages" },
    ],
    principles: [
      "Tests and a clear explanation before any decision",
      "Keyhole surgery offered when it suits you",
      "Your family is part of every conversation",
    ],
  },
];
