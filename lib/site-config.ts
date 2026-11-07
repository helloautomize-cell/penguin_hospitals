/*
  Single source of truth for NAP, phones, hours and trust facts.
  Source: resources/content/00-plan.md 0.5. Anything marked CONFIRM
  is listed in TODO_CONFIRM and counted by `npm run launch-check`.
*/

export type DayHours = {
  /** 0 = Sunday ... 6 = Saturday */
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Decimal hours, e.g. 16 = 4 pm. null pair means closed. */
  opens: number;
  closes: number;
  /** true when the range covers the full 24 hours */
  allDay?: boolean;
  /** Display label, uses "to" for ranges, never a dash */
  label: string;
};

export const site = {
  name: "Dr. Lakshmi's Penguin Hospital",
  shortName: "Penguin Hospital",
  tagline: "Together through life.",
  area: "Chinchwad Gaon",
  city: "Pimpri-Chinchwad",
  state: "Maharashtra",
  country: "India",

  /** [CONFIRM] full street address */
  address: {
    line1: "Plot No. 59, New Pawana Nagar Society",
    line2: "Bijli Nagar Road, opposite Laxmi Medico and Mart",
    locality: "Chinchwad Gaon",
    city: "Pimpri-Chinchwad",
    region: "Maharashtra",
    postalCode: "411033",
    confirm: true,
  },

  phone: {
    display: "+91 95189 04156",
    nationalDisplay: "95189 04156",
    tel: "+919518904156",
  },
  landline: {
    display: "020 2735 1100",
    tel: "+912027351100",
  },
  whatsapp: {
    number: "919518904156",
    display: "+91 95189 04156",
  },
  /** [CONFIRM: domain email preferred] */
  email: {
    address: "penguinhospitals@gmail.com",
    confirm: "domain email preferred",
  },

  emergencyLine: "Medical emergency? Call 108 or 112",
  emergencyOpen: "Emergency open day and night",

  /**
   * OPD hours per weekday.
   * [CONFIRM] working assumption from the Google Business Profile hours:
   * Monday to Saturday open 24 hours, Sunday 4 pm to 6 pm.
   */
  opd: {
    confirm: "OPD hours per weekday; GBP shows Mon to Sat 24 hours, Sun 4 pm to 6 pm",
    days: [
      { day: 0, opens: 16, closes: 18, label: "4 pm to 6 pm" },
      { day: 1, opens: 0, closes: 24, allDay: true, label: "Open 24 hours" },
      { day: 2, opens: 0, closes: 24, allDay: true, label: "Open 24 hours" },
      { day: 3, opens: 0, closes: 24, allDay: true, label: "Open 24 hours" },
      { day: 4, opens: 0, closes: 24, allDay: true, label: "Open 24 hours" },
      { day: 5, opens: 0, closes: 24, allDay: true, label: "Open 24 hours" },
      { day: 6, opens: 0, closes: 24, allDay: true, label: "Open 24 hours" },
    ] as DayHours[],
  },
  hoursText:
    "Emergency: open day and night. OPD: Monday to Saturday [CONFIRM], Sunday 4 pm to 6 pm [CONFIRM].",

  areasServed: [
    "Pimpri",
    "Nigdi",
    "Akurdi",
    "Ravet",
    "Moshi",
    "Wakad",
    "Hinjawadi",
    "Punawale",
    "Tathawade",
  ],

  googleMapsUrl: "https://maps.app.goo.gl/StwJKYnv9kRLnd1k7",
  /**
   * Google Maps embed src for the Plan your visit map.
   * Fallback query URL until the business-listing embed code is supplied
   * (Share > Embed a map on the Google Maps listing pins the exact place).
   */
  mapEmbedSrc:
    "https://www.google.com/maps?q=Penguin+Hospital,+Bijli+Nagar+Road,+Chinchwad+Gaon,+Pimpri-Chinchwad,+Maharashtra+411033&z=16&output=embed",

  /** Year shown in the footer legal line. [CONFIRM: legal entity wording] */
  copyright: {
    year: 2026,
    entity: "Dr. Lakshmi's Penguin Hospital",
    confirm: "legal entity",
  },

  /** ISO date used by the 7 legal pages' "Last updated" line */
  legalLastUpdated: "2026-11-01",

  pcpndtLine:
    "Sex determination of the foetus is a crime under the PCPNDT Act. We do not disclose the sex of the baby.",

  formConsentLine:
    "I agree that Penguin Hospital may contact me about this request. Please do not include detailed medical information in this form.",

  educationDisclaimer:
    "Information on this site is for education. It does not replace a visit to a doctor.",
} as const;

/**
 * Every open [CONFIRM] item that lives in this file.
 * `npm run launch-check` fails while any remain.
 */
export const TODO_CONFIRM: string[] = [
  "Street address wording (Plot No. 59, New Pawana Nagar Society)",
  "Domain email (penguinhospitals@gmail.com is a placeholder)",
  "OPD hours per weekday (working assumption: Mon to Sat 24 hours, Sun 4 to 6 pm)",
  "Legal entity name for the copyright line",
  "Founding year",
];

export type Site = typeof site;
