// Paired screenshots: approved preview (localhost:8080) vs build (localhost:3000).
// node scripts/preview-shots.mjs [page ...]   e.g. node scripts/preview-shots.mjs index book
// Writes review/diff/<page>-<preview|build>-<w>.png
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const PAGES = {
  index: ["index.html", "/"],
  about: ["about.html", "/about/"],
  "obstetrics-gynaecology": ["obstetrics-gynaecology.html", "/obstetrics-gynaecology/"],
  "heart-and-vascular-surgery": ["heart-and-vascular-surgery.html", "/heart-and-vascular-surgery/"],
  "pregnancy-care": ["pregnancy-care.html", "/pregnancy-care/"],
  "dr-lakshmi": ["dr-lakshmi-vijay-kalbande.html", "/doctors/dr-lakshmi-vijay-kalbande/"],
  emergency: ["emergency.html", "/emergency/"],
  book: ["book.html", "/book/"],
  doctors: ["doctors.html", "/doctors/"],
  "pregnancy-week-by-week": ["pregnancy-week-by-week.html", "/pregnancy-week-by-week/"],
  "health-library": ["health-library.html", "/health-library/"],
  "signs-of-labour": ["signs-of-labour.html", "/health-library/signs-of-labour/"],
  faqs: ["faqs.html", "/faqs/"],
  "privacy-policy": ["privacy-policy.html", "/privacy-policy/"],
};

const PREVIEW = "http://localhost:8080";
const BUILD = "http://localhost:3000";
const only = process.argv.slice(2);
mkdirSync("review/diff", { recursive: true });

const b = await chromium.launch();

async function shot(url, out, w) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  const errors = [];
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  p.on("pageerror", (e) => errors.push(String(e)));
  await p.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await p.evaluate(async () => {
    await new Promise((done) => {
      let y = 0;
      const step = () => {
        y += 700;
        scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 50);
        else done();
      };
      step();
    });
    scrollTo(0, 0);
    document.querySelectorAll('.pre,.hide').forEach(e=>e.classList.remove('pre','hide'));
  });
  await p.waitForTimeout(900);
  await p.waitForTimeout(150);
  await p.screenshot({ path: out, fullPage: true });
  await p.close();
  return errors;
}

for (const [name, [prev, real]] of Object.entries(PAGES)) {
  if (only.length && !only.includes(name)) continue;
  for (const w of [1440, 390]) {
    const e1 = await shot(`${PREVIEW}/${prev}`, `review/diff/${name}-preview-${w}.png`, w);
    const e2 = await shot(`${BUILD}${real}`, `review/diff/${name}-build-${w}.png`, w);
    const errs = [...e1.map((e) => `preview: ${e}`), ...e2.map((e) => `build: ${e}`)];
    if (errs.length) console.log(`${name} ${w}: console errors:\n  ${errs.join("\n  ")}`);
    else console.log(`${name} ${w}: ok`);
  }
}
await b.close();
