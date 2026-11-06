// Badge registry: slug -> title + hand-drawn art component.
// The `badge:` frontmatter on each service page provides the slug.
import type { ComponentType } from "react";

import obg_art from "@/components/badges/art/obg";
import pregnancy_art from "@/components/badges/art/pregnancy";
import high_risk_art from "@/components/badges/art/high-risk";
import blood_pressure_art from "@/components/badges/art/blood-pressure";
import birth_art from "@/components/badges/art/birth";
import epidural_art from "@/components/badges/art/epidural";
import caesarean_art from "@/components/badges/art/caesarean";
import postnatal_art from "@/components/badges/art/postnatal";
import pcos_art from "@/components/badges/art/pcos";
import cycle_art from "@/components/badges/art/cycle";
import heavy_bleeding_art from "@/components/badges/art/heavy-bleeding";
import fibroid_art from "@/components/badges/art/fibroid";
import ovary_art from "@/components/badges/art/ovary";
import endometriosis_art from "@/components/badges/art/endometriosis";
import menopause_art from "@/components/badges/art/menopause";
import laparoscopy_art from "@/components/badges/art/laparoscopy";
import fertility_art from "@/components/badges/art/fertility";
import screening_art from "@/components/badges/art/screening";
import mtp_art from "@/components/badges/art/mtp";
import newborn_art from "@/components/badges/art/newborn";
import heart_art from "@/components/badges/art/heart";
import heart_check_art from "@/components/badges/art/heart-check";
import mics_art from "@/components/badges/art/mics";
import cabg_art from "@/components/badges/art/cabg";
import valve_art from "@/components/badges/art/valve";
import veins_art from "@/components/badges/art/veins";
import arteries_art from "@/components/badges/art/arteries";
import fistula_art from "@/components/badges/art/fistula";
import lungs_art from "@/components/badges/art/lungs";
import doctor_female_art from "@/components/badges/art/doctor-female";
import doctor_male_art from "@/components/badges/art/doctor-male";

export const badges = {
  "obg": { title: "Obstetrics and gynaecology", Art: obg_art },
  "pregnancy": { title: "Pregnancy care", Art: pregnancy_art },
  "high-risk": { title: "High-risk pregnancy", Art: high_risk_art },
  "blood-pressure": { title: "Preeclampsia", Art: blood_pressure_art },
  "birth": { title: "Normal delivery", Art: birth_art },
  "epidural": { title: "Painless delivery", Art: epidural_art },
  "caesarean": { title: "Caesarean delivery", Art: caesarean_art },
  "postnatal": { title: "After birth", Art: postnatal_art },
  "pcos": { title: "PCOS", Art: pcos_art },
  "cycle": { title: "Irregular periods", Art: cycle_art },
  "heavy-bleeding": { title: "Heavy periods", Art: heavy_bleeding_art },
  "fibroid": { title: "Uterine fibroids", Art: fibroid_art },
  "ovary": { title: "Ovarian cysts", Art: ovary_art },
  "endometriosis": { title: "Endometriosis", Art: endometriosis_art },
  "menopause": { title: "Menopause care", Art: menopause_art },
  "laparoscopy": { title: "Laparoscopic surgery", Art: laparoscopy_art },
  "fertility": { title: "Fertility evaluation", Art: fertility_art },
  "screening": { title: "Pap smear and colposcopy", Art: screening_art },
  "mtp": { title: "Medical termination of pregnancy", Art: mtp_art },
  "newborn": { title: "Newborn care", Art: newborn_art },
  "heart": { title: "Heart and vascular surgery", Art: heart_art },
  "heart-check": { title: "Heart check-up", Art: heart_check_art },
  "mics": { title: "Keyhole heart surgery", Art: mics_art },
  "cabg": { title: "Bypass surgery", Art: cabg_art },
  "valve": { title: "Heart valve surgery", Art: valve_art },
  "veins": { title: "Varicose veins", Art: veins_art },
  "arteries": { title: "Leg artery disease", Art: arteries_art },
  "fistula": { title: "AV fistula for dialysis", Art: fistula_art },
  "lungs": { title: "Lung and chest surgery", Art: lungs_art },
  "doctor-female": { title: "Women's doctor", Art: doctor_female_art },
  "doctor-male": { title: "Heart surgeon", Art: doctor_male_art },
} as const satisfies Record<string, { title: string; Art: ComponentType<{ size?: number }> }>;

export type BadgeSlug = keyof typeof badges;

export function badgeArt(slug: string) {
  return (badges as Record<string, { title: string; Art: ComponentType<{ size?: number }> }>)[slug]?.Art;
}

export function badgeInitial(s: string) {
  return (s || "?").trim()[0]?.toUpperCase() ?? "?";
}
/** Map a card title or service URL slug to a badge slug. */
const TITLE_TO_SLUG: Record<string, BadgeSlug> = {
  "pregnancy care": "pregnancy",
  "high-risk pregnancy": "high-risk",
  "preeclampsia": "blood-pressure",
  "normal delivery": "birth",
  "painless delivery": "epidural",
  "caesarean delivery": "caesarean",
  "after birth": "postnatal",
  "postnatal care": "postnatal",
  "pcos": "pcos",
  "irregular periods": "cycle",
  "irregular menstruation": "cycle",
  "heavy periods": "heavy-bleeding",
  "fibroids": "fibroid",
  "uterine fibroids": "fibroid",
  "ovarian cysts": "ovary",
  "endometriosis": "endometriosis",
  "menopause care": "menopause",
  "laparoscopic surgery": "laparoscopy",
  "fertility evaluation": "fertility",
  "pap smear and colposcopy": "screening",
  "medical termination of pregnancy": "mtp",
  "newborn care": "newborn",
  "heart check-up": "heart-check",
  "keyhole heart surgery": "mics",
  "bypass surgery": "cabg",
  "heart valve surgery": "valve",
  "varicose veins": "veins",
  "leg artery disease": "arteries",
  "av fistula for dialysis": "fistula",
  "lung and chest surgery": "lungs",
  "obstetrics and gynaecology": "obg",
  "heart and vascular surgery": "heart",
};

/** URL leaf slug -> badge slug, for every service page. */
const URL_TO_BADGE: Record<string, BadgeSlug> = {
  "pregnancy-care": "pregnancy",
  "high-risk-pregnancy": "high-risk",
  "preeclampsia-treatment": "blood-pressure",
  "normal-delivery": "birth",
  "painless-delivery": "epidural",
  "caesarean-delivery": "caesarean",
  "postnatal-care": "postnatal",
  "newborn-care": "newborn",
  pcos: "pcos",
  "irregular-menstruation": "cycle",
  "heavy-periods": "heavy-bleeding",
  "uterine-fibroids": "fibroid",
  "ovarian-cysts": "ovary",
  endometriosis: "endometriosis",
  "menopause-care": "menopause",
  "laparoscopic-surgery": "laparoscopy",
  "fertility-evaluation": "fertility",
  "pap-smear-colposcopy": "screening",
  "medical-termination-of-pregnancy": "mtp",
  "obstetrics-gynaecology": "obg",
  "heart-and-vascular-surgery": "heart",
  "heart-check-up": "heart-check",
  "keyhole-heart-surgery": "mics",
  "bypass-surgery": "cabg",
  "heart-valve-surgery": "valve",
  "varicose-veins": "veins",
  "leg-artery-disease": "arteries",
  "peripheral-artery-disease": "arteries",
  "av-fistula-for-dialysis": "fistula",
  "lung-and-chest-surgery": "lungs",
};

export function slugFor(input: string): BadgeSlug | undefined {
  const dash = input.toLowerCase().replace(/^\//, "").replace(/\/$/, "").trim();
  if (dash in badges) return dash as BadgeSlug;
  if (dash in URL_TO_BADGE) return URL_TO_BADGE[dash];
  const key = dash.replace(/-/g, " ");
  if (key in badges) return key as BadgeSlug;
  return TITLE_TO_SLUG[key] ?? TITLE_TO_SLUG[key.replace(/s$/, "")];
}
