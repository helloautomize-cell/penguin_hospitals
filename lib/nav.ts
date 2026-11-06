/*
  Navigation model, from resources/docs/site-plan.md section 8 and
  design-development-plan.md section 3.
  Pages marked hidden: true in content NEVER appear here:
  /newborn-care/, /lab-and-scans/, /nutrition-and-physiotherapy/,
  /pap-smear-colposcopy/, /medical-termination-of-pregnancy/.
*/

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; links: NavLink[] };

export const womenGroups: NavGroup[] = [
  {
    label: "Pregnancy and birth",
    links: [
      { label: "Pregnancy care", href: "/pregnancy-care/" },
      { label: "High-risk pregnancy", href: "/high-risk-pregnancy/" },
      { label: "Preeclampsia", href: "/preeclampsia-treatment/" },
      { label: "Normal delivery", href: "/normal-delivery/" },
      { label: "Painless delivery", href: "/painless-delivery/" },
      { label: "Caesarean delivery", href: "/caesarean-delivery/" },
      { label: "After birth", href: "/postnatal-care/" },
      { label: "Pregnancy week by week", href: "/pregnancy-week-by-week/" },
    ],
  },
  {
    label: "Gynaecology",
    links: [
      { label: "PCOS", href: "/pcos/" },
      { label: "Irregular periods", href: "/irregular-menstruation/" },
      { label: "Heavy periods", href: "/heavy-periods/" },
      { label: "Uterine fibroids", href: "/uterine-fibroids/" },
      { label: "Ovarian cysts", href: "/ovarian-cysts/" },
      { label: "Endometriosis", href: "/endometriosis/" },
      { label: "Menopause care", href: "/menopause-care/" },
    ],
  },
  {
    label: "Surgery and fertility",
    links: [
      { label: "Laparoscopic surgery", href: "/laparoscopic-surgery/" },
      { label: "Fertility evaluation", href: "/fertility-evaluation/" },
    ],
  },
];

export const heartGroups: NavGroup[] = [
  {
    label: "Heart",
    links: [
      { label: "Heart check-up", href: "/heart-check-up/" },
      { label: "Keyhole heart surgery (MICS)", href: "/keyhole-heart-surgery/" },
      { label: "Bypass surgery (CABG)", href: "/bypass-surgery/" },
      { label: "Heart valve surgery", href: "/heart-valve-surgery/" },
      { label: "Lung and chest surgery", href: "/lung-and-chest-surgery/" },
    ],
  },
  {
    label: "Vessels",
    links: [
      { label: "Varicose veins", href: "/varicose-veins/" },
      { label: "Leg artery disease", href: "/peripheral-artery-disease/" },
      { label: "AV fistula for dialysis", href: "/av-fistula-for-dialysis/" },
    ],
  },
];

/** Header menu (approved preview: mainnav order, Emergency is the .em link). */
export const headerMenu: (NavLink & { mega?: "women" | "heart" })[] = [
  { label: "Women and pregnancy", href: "/obstetrics-gynaecology/", mega: "women" },
  { label: "Heart and vessels", href: "/heart-and-vascular-surgery/", mega: "heart" },
  { label: "Doctors", href: "/doctors/" },
  { label: "About", href: "/about/" },
  { label: "Plan your visit", href: "/plan-your-visit/" },
];

/** Mobile sheet solo links (approved preview). */
export const sheetSoloLinks: NavLink[] = [
  { label: "Doctors", href: "/doctors/" },
  { label: "Health library", href: "/health-library/" },
  { label: "About", href: "/about/" },
  { label: "Plan your visit", href: "/plan-your-visit/" },
];

export const utilityBarLinks: NavLink[] = [
  { label: "Plan your visit", href: "/plan-your-visit/" },
  { label: "Health library", href: "/health-library/" },
];

/** Footer columns as in the approved preview. */
export const footerColumns: NavGroup[] = [
  {
    label: "Women and pregnancy",
    links: [
      { label: "Pregnancy care", href: "/pregnancy-care/" },
      { label: "High-risk pregnancy", href: "/high-risk-pregnancy/" },
      { label: "Painless delivery", href: "/painless-delivery/" },
      { label: "PCOS", href: "/pcos/" },
      { label: "Fibroids", href: "/uterine-fibroids/" },
      { label: "All women's care", href: "/obstetrics-gynaecology/" },
    ],
  },
  {
    label: "Heart and vessels",
    links: [
      { label: "Heart check-up", href: "/heart-check-up/" },
      { label: "Keyhole heart surgery", href: "/keyhole-heart-surgery/" },
      { label: "Bypass and valves", href: "/bypass-surgery/" },
      { label: "Varicose veins", href: "/varicose-veins/" },
      { label: "All heart care", href: "/heart-and-vascular-surgery/" },
    ],
  },
  {
    label: "Patient info",
    links: [
      { label: "Book a visit", href: "/book/" },
      { label: "Emergency", href: "/emergency/" },
      { label: "About us", href: "/about/" },
      { label: "Questions and answers", href: "/faqs/" },
      { label: "Health library", href: "/health-library/" },
      { label: "Privacy policy", href: "/privacy-policy/" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Terms of use", href: "/terms/" },
  { label: "Medical disclaimer", href: "/medical-disclaimer/" },
  { label: "Editorial and medical review policy", href: "/editorial-policy/" },
  { label: "Patient rights and responsibilities", href: "/patient-rights/" },
  { label: "Appointment, cancellation and refund", href: "/appointment-policy/" },
  { label: "Accessibility statement", href: "/accessibility/" },
];

/**
 * Every public route. Used by the Phase 2 placeholder catch-all and by tests.
 * Hidden pages are deliberately absent.
 */
export const allPageSlugs: string[] = [
  "/",
  "/about/",
  "/doctors/",
  "/doctors/dr-lakshmi-vijay-kalbande/",
  "/doctors/dr-ashish-baviskar/",
  "/book/",
  "/contact/",
  "/plan-your-visit/",
  "/emergency/",
  "/patients-from-pcmc/",
  "/pregnancy-week-by-week/",
  "/faqs/",
  "/services/",
  "/obstetrics-gynaecology/",
  "/pregnancy-care/",
  "/high-risk-pregnancy/",
  "/preeclampsia-treatment/",
  "/normal-delivery/",
  "/painless-delivery/",
  "/caesarean-delivery/",
  "/postnatal-care/",
  "/pcos/",
  "/irregular-menstruation/",
  "/heavy-periods/",
  "/uterine-fibroids/",
  "/ovarian-cysts/",
  "/endometriosis/",
  "/menopause-care/",
  "/laparoscopic-surgery/",
  "/fertility-evaluation/",
  "/heart-and-vascular-surgery/",
  "/heart-check-up/",
  "/keyhole-heart-surgery/",
  "/bypass-surgery/",
  "/heart-valve-surgery/",
  "/varicose-veins/",
  "/peripheral-artery-disease/",
  "/av-fistula-for-dialysis/",
  "/lung-and-chest-surgery/",
  "/privacy-policy/",
  "/terms/",
  "/medical-disclaimer/",
  "/editorial-policy/",
  "/patient-rights/",
  "/appointment-policy/",
  "/accessibility/",
  "/health-library/",
  "/thank-you/",
];

/** Routes whose hero sits on --night: header starts glass-on-dark there. */
export const darkHeroRoutes = new Set(["/", "/obstetrics-gynaecology/", "/heart-and-vascular-surgery/"]);
