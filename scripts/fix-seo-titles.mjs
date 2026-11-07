#!/usr/bin/env node
// One-shot: shorten frontmatter titles to <=60 (incl. "| Penguin Hospital")
// and trim descriptions to <=155 at a sentence boundary. In-place edit.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const TITLES = {
  "/appointment-policy/": "Appointment and refund policy | Penguin Hospital",
  "/av-fistula-for-dialysis/": "AV fistula surgery in Chinchwad | Penguin Hospital",
  "/caesarean-delivery/": "Caesarean delivery in Chinchwad | Penguin Hospital",
  "/doctors/dr-ashish-baviskar/": "Dr. Ashish Baviskar, heart surgeon | Penguin Hospital",
  "/doctors/dr-lakshmi-vijay-kalbande/": "Dr. Lakshmi Kalbande, gynaecologist | Penguin Hospital",
  "/fertility-evaluation/": "Fertility check-up in Chinchwad | Penguin Hospital",
  "/heart-check-up/": "Heart check-up in Chinchwad | Penguin Hospital",
  "/heart-valve-surgery/": "Heart valve surgery in Chinchwad | Penguin Hospital",
  "/laparoscopic-surgery/": "Laparoscopic surgery, Chinchwad | Penguin Hospital",
  "/lung-and-chest-surgery/": "Lung and chest surgery | Penguin Hospital",
  "/obstetrics-gynaecology/": "Obstetrics and gynaecology | Penguin Hospital",
  "/painless-delivery/": "Painless delivery in Chinchwad | Penguin Hospital",
  "/patients-from-pcmc/": "Patients from across PCMC | Penguin Hospital",
  "/pcos/": "PCOS treatment in Chinchwad | Penguin Hospital",
  "/peripheral-artery-disease/": "Peripheral artery disease | Penguin Hospital",
  "/preeclampsia-treatment/": "Preeclampsia care in pregnancy | Penguin Hospital",
  "/pregnancy-care/": "Pregnancy care in Chinchwad | Penguin Hospital",
  "/pregnancy-week-by-week/": "Pregnancy week by week | Penguin Hospital",
  "/uterine-fibroids/": "Fibroid treatment in Chinchwad | Penguin Hospital",
  "/health-library/signs-of-labour/": "Signs of labour: when to come in | Penguin Hospital",
};

const trim = (s) => {
  if (!s || s.length <= 155) return s;
  const cut = s.slice(0, 156);
  const sent = cut.match(/^(.*[.!?])\s[^.!?]*$/)?.[1];
  if (sent && sent.length > 90) return sent.trim();
  const word = cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "");
  return word.trim();
};

let changed = 0;
for (const dir of ["pages", "posts"]) {
  const d = path.join(root, "resources/content", dir);
  for (const f of readdirSync(d).filter((f) => f.endsWith(".md"))) {
    const p = path.join(d, f);
    let src = readFileSync(p, "utf8");
    const url = src.match(/^url:\s*(\S+)/m)?.[1];
    if (url && TITLES[url]) {
      src = src.replace(/^title:.*$/m, `title: ${TITLES[url]}`);
      changed++;
    }
    src = src.replace(/^description:\s*(.+)$/m, (_, desc) => `description: ${trim(desc)}`);
    writeFileSync(p, src);
  }
}
console.log(`titles rewritten: ${changed}`);
