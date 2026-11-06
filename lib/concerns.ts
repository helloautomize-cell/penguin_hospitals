/**
 * Data for the /doctors/ concern picker ("Tell us what brings you in").
 * Copy from resources/reference/pages-v1/index.html; image names resolve to
 * /images/doctors/ (dr-*, doctors-*) or /images/pages/ (everything else).
 * `link` is the label of the "Read about it" button and `linkHref` its route.
 */

export type ConcernDoctor = {
  face: string;
  name: string;
  role: string;
  book: string;
  bookHref: string;
};

const L: ConcernDoctor = {
  face: "/images/doctors/dr-lakshmi-headshot.jpg",
  name: "Dr. Lakshmi Vijay Kalbande",
  role: "Obstetrician and gynaecologist",
  book: "Book with Dr. Lakshmi",
  bookHref: "/book/?doctor=dr-lakshmi-vijay-kalbande",
};

const A: ConcernDoctor = {
  face: "/images/doctors/dr-ashish-headshot.jpg",
  name: "Dr. Ashish A. Baviskar",
  role: "Cardiothoracic and vascular surgeon",
  book: "Book with Dr. Ashish",
  bookHref: "/book/?doctor=dr-ashish-baviskar",
};

export const EMERGENCY_DOCTOR: ConcernDoctor = {
  face: "/images/brand/logo-penguin-hospital.png",
  name: "Emergency, open now",
  role: "Call or come in: +91 95189 04156",
  book: "How to reach us",
  bookHref: "/emergency/",
};

export type Concern = {
  g: "W" | "H" | "E";
  i: string;
  t: string;
  d: ConcernDoctor | null;
  img: string;
  why: string;
  link: string;
  linkHref: string;
};

export const concerns: Concern[] = [
  { g: "W", i: "bump", t: "I'm pregnant", d: L, img: "dr-lakshmi-pregnancy", why: "Pregnancy care from the first scan to the first cuddle, with visits planned around your own risks. Normal and painless delivery are discussed with every mother.", link: "Pregnancy care", linkHref: "/pregnancy-care/" },
  { g: "W", i: "alert", t: "High-risk pregnancy", d: L, img: "dr-lakshmi-consult", why: "Twins, diabetes or high blood pressure in pregnancy, placenta previa, or a past loss. Each pregnancy gets its own plan, with closer visits.", link: "High-risk pregnancy", linkHref: "/high-risk-pregnancy/" },
  { g: "W", i: "cycle", t: "Irregular or heavy periods", d: L, img: "dr-lakshmi-review", why: "Most period problems settle with simple treatment once the cause is found. A scan is often done in the same visit.", link: "Period problems", linkHref: "/irregular-menstruation/" },
  { g: "W", i: "drop", t: "PCOS", d: L, img: "dr-lakshmi-note", why: "A plan for cycles, skin, weight and fertility, adjusted at each follow-up.", link: "PCOS", linkHref: "/pcos/" },
  { g: "W", i: "scope", t: "Fibroids or cysts", d: L, img: "dr-lakshmi-scrubs", why: "Watchful care or medicines first. When surgery is needed, keyhole (laparoscopic) surgery where it suits you.", link: "Fibroids", linkHref: "/uterine-fibroids/" },
  { g: "W", i: "sprout", t: "Trying for a baby", d: L, img: "dr-lakshmi-consult", why: "A fertility evaluation for both partners, starting with the simplest tests.", link: "Fertility evaluation", linkHref: "/fertility-evaluation/" },
  { g: "W", i: "moon", t: "Menopause", d: L, img: "dr-lakshmi-note", why: "Hot flushes, sleep, bones and heart health. Dr. Lakshmi is a member of the Indian Menopause Society.", link: "Menopause care", linkHref: "/menopause-care/" },
  { g: "H", i: "ecg", t: "Chest pain when I walk", d: A, img: "dr-ashish-ecg", why: "Start with a heart check-up: ECG, echo and a conversation. Many heart problems are managed without surgery.", link: "Heart check-up", linkHref: "/heart-check-up/" },
  { g: "H", i: "heart", t: "Told I need bypass or valve surgery", d: A, img: "dr-ashish-consult", why: "Bring your reports for a second look. If surgery is right, he explains it to you and your family, before and after.", link: "Bypass and valves", linkHref: "/bypass-surgery/" },
  { g: "H", i: "knife", t: "Is keyhole heart surgery possible?", d: A, img: "dr-ashish-scrubs", why: "Minimally invasive surgery through a small cut between the ribs, for suitable patients. He tells you honestly when open surgery is safer.", link: "Keyhole heart surgery", linkHref: "/keyhole-heart-surgery/" },
  { g: "H", i: "vein", t: "Swollen, twisted leg veins", d: A, img: "dr-ashish-recovery", why: "Varicose veins can ache, itch or cause ulcers. Treatment ranges from stockings to a short procedure.", link: "Varicose veins", linkHref: "/varicose-veins/" },
  { g: "H", i: "walk", t: "Leg pain when walking", d: A, img: "dr-ashish-consult", why: "Pain in the calf that eases with rest can mean narrowed leg arteries. A scan shows where and how much.", link: "Leg artery disease", linkHref: "/peripheral-artery-disease/" },
  { g: "H", i: "drop", t: "Need a fistula for dialysis", d: A, img: "dr-ashish-note", why: "An AV fistula gives dialysis a strong, lasting access point. It is planned weeks before dialysis starts.", link: "AV fistula", linkHref: "/av-fistula-for-dialysis/" },
  { g: "H", i: "lungs", t: "Lung or chest problem", d: A, img: "dr-ashish-night", why: "Lung growths, fluid or air around the lung, and chest injuries.", link: "Lung and chest surgery", linkHref: "/lung-and-chest-surgery/" },
  { g: "E", i: "alert", t: "Something is wrong right now", d: null, img: "night-corridor", why: "Come straight in. Our emergency team is here day and night, including for women in labour. If you cannot travel safely, call 108.", link: "Emergency care", linkHref: "/emergency/" },
];

export function concernImg(img: string): string {
  return `/images/${img.startsWith("dr-") || img.startsWith("doctors-") ? "doctors" : "pages"}/${img}.jpg`;
}

export function concernDoctor(c: Concern): ConcernDoctor {
  return c.d ?? EMERGENCY_DOCTOR;
}
