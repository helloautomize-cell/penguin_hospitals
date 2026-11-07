#!/usr/bin/env node
/*
  Image pre-treatment for Penguin Hospital (agency-standards 4.9).
  Reads resources/images/_source/, writes public/images/.
  - Never upscales.
  - Real photos: crop, light brightness/contrast, colour-cast fix only.
  - AI photos: copied verbatim so C2PA content credentials survive.
    (Re-encoding a JPEG drops the JUMBF box; keep originals byte-for-byte.)
  - Logo: transparent padding trimmed.
  - Strips EXIF/GPS from re-encoded outputs; keeps sRGB.
  Run: npm run images
*/
import sharp from "sharp";
import { mkdir, copyFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(root, "resources", "images", "_source");
const OUT = path.join(root, "public", "images");

const JPEG = { quality: 85, mozjpeg: true };

/** Warm a blue/cyan cast and gently grade: recomb channel gains + contrast. */
function deCyan(pipeline, { r = 1.09, g = 0.99, b = 0.86, brightness = 1.0, saturation = 1.02 } = {}) {
  return pipeline
    .recomb([
      [r, 0, 0],
      [0, g, 0],
      [0, 0, b],
    ])
    .modulate({ brightness, saturation })
    .linear(1.05, -4); // contrast +5, slight black lift
}

const jobs = [
  /* ---------------- brand ---------------- */
  {
    src: "brand/logo-penguin-hospital.png",
    out: "brand/logo-penguin-hospital.png",
    run: (s) => s.trim({ threshold: 10 }).png(),
  },
  /* ---------------- AI photos (placeholders, keep C2PA -> copy verbatim) ---------------- */
  { src: "ai-photos/hero-mother-newborn.jpg", out: "hero/hero-mother-newborn.jpg", copy: true },
  { src: "ai-photos/hero-first-look.jpg", out: "hero/hero-first-look.jpg", copy: true },
  { src: "ai-photos/heart-walk.jpg", out: "hero/heart-walk.jpg", copy: true },
  { src: "ai-photos/night-corridor.jpg", out: "hero/night-corridor.jpg", copy: true },
  { src: "ai-photos/pregnant-window.jpg", out: "services/pregnant-window.jpg", copy: true },
  { src: "ai-photos/newborn-hand.jpg", out: "services/newborn-hand.jpg", copy: true },
  { src: "ai-photos/heart-grandfather.jpg", out: "services/heart-grandfather.jpg", copy: true },
  /* -------- treatment-page heroes (lib/treatment-heroes.ts) -------- */
  { src: "ai-photos/hub-obg.jpg", out: "services/hub-obg.jpg", copy: true },
  { src: "ai-photos/pregnancy-care.jpg", out: "services/pregnancy-care.jpg", copy: true },
  { src: "ai-photos/high-risk-pregnancy.jpg", out: "services/high-risk-pregnancy.jpg", copy: true },
  { src: "ai-photos/preeclampsia.jpg", out: "services/preeclampsia.jpg", copy: true },
  { src: "ai-photos/normal-delivery.jpg", out: "services/normal-delivery.jpg", copy: true },
  { src: "ai-photos/painless-delivery.jpg", out: "services/painless-delivery.jpg", copy: true },
  { src: "ai-photos/caesarean-delivery.jpg", out: "services/caesarean-delivery.jpg", copy: true },
  { src: "ai-photos/postnatal-care.jpg", out: "services/postnatal-care.jpg", copy: true },
  { src: "ai-photos/pcos.jpg", out: "services/pcos.jpg", copy: true },
  { src: "ai-photos/irregular-periods.jpg", out: "services/irregular-periods.jpg", copy: true },
  { src: "ai-photos/heavy-periods.jpg", out: "services/heavy-periods.jpg", copy: true },
  { src: "ai-photos/fibroids.jpg", out: "services/fibroids.jpg", copy: true },
  { src: "ai-photos/ovarian-cysts.jpg", out: "services/ovarian-cysts.jpg", copy: true },
  { src: "ai-photos/endometriosis.jpg", out: "services/endometriosis.jpg", copy: true },
  { src: "ai-photos/menopause-care.jpg", out: "services/menopause-care.jpg", copy: true },
  { src: "ai-photos/laparoscopic-surgery.jpg", out: "services/laparoscopic-surgery.jpg", copy: true },
  { src: "ai-photos/fertility-evaluation.jpg", out: "services/fertility-evaluation.jpg", copy: true },
  { src: "ai-photos/pap-smear.jpg", out: "services/pap-smear.jpg", copy: true },
  { src: "ai-photos/newborn-care.jpg", out: "services/newborn-care.jpg", copy: true },
  { src: "ai-photos/heart-check-up.jpg", out: "services/heart-check-up.jpg", copy: true },
  { src: "ai-photos/keyhole-heart-surgery.jpg", out: "services/keyhole-heart-surgery.jpg", copy: true },
  { src: "ai-photos/bypass-surgery.jpg", out: "services/bypass-surgery.jpg", copy: true },
  { src: "ai-photos/heart-valve-surgery.jpg", out: "services/heart-valve-surgery.jpg", copy: true },
  { src: "ai-photos/varicose-veins.jpg", out: "services/varicose-veins.jpg", copy: true },
  { src: "ai-photos/peripheral-artery-disease.jpg", out: "services/peripheral-artery-disease.jpg", copy: true },
  { src: "ai-photos/av-fistula.jpg", out: "services/av-fistula.jpg", copy: true },
  { src: "ai-photos/lung-and-chest-surgery.jpg", out: "services/lung-and-chest-surgery.jpg", copy: true },
  /* -------- doctor slot fallbacks (DOCTOR-IMAGES.md; AI photos, keep C2PA) -------- */
  { src: "ai-photos/step-3-consultation.jpg", out: "doctors/fallbacks/step-3-consultation.jpg", copy: true },
  { src: "ai-photos/pregnancy-care.jpg", out: "doctors/fallbacks/pregnancy-care.jpg", copy: true },
  { src: "ai-photos/heart-check-up.jpg", out: "doctors/fallbacks/heart-check-up.jpg", copy: true },
  { src: "ai-photos/keyhole-heart-surgery.jpg", out: "doctors/fallbacks/keyhole-heart-surgery.jpg", copy: true },
  /* ---------------- real photos (corrections only, never upscale) ---------------- */
  {
    // Remove the door edge on the right, correct the cyan cast.
    src: "real-photos/operation-theatre.jpg",
    out: "clinic/operation-theatre.jpg",
    run: (s, meta) =>
      deCyan(
        s.extract({
          left: 0,
          top: 0,
          width: Math.round(meta.width * 0.92),
          height: meta.height,
        }),
        { brightness: 1.03, r: 1.12, b: 0.82 },
      ).jpeg(JPEG),
  },
  {
    // Overexposed wall: bring exposure down, warm, crop the bench edge at right.
    src: "real-photos/ultrasound-room.jpg",
    out: "clinic/ultrasound-room.jpg",
    run: (s, meta) =>
      deCyan(
        s.extract({
          left: 0,
          top: 0,
          width: Math.round(meta.width * 0.9),
          height: meta.height,
        }),
        { brightness: 0.93, saturation: 1.0, b: 0.92 },
      ).jpeg(JPEG),
  },
  {
    // Neutralise the blue tint.
    src: "real-photos/general-ward.jpg",
    out: "clinic/general-ward.jpg",
    run: (s) => deCyan(s, { brightness: 0.99 }).jpeg(JPEG),
  },
  {
    // Blue tint, slightly bright.
    src: "real-photos/labour-room.jpg",
    out: "clinic/labour-room.jpg",
    run: (s) => deCyan(s, { brightness: 0.96 }).jpeg(JPEG),
  },
  /* -------- real hospital photos (FIX-real-photos-and-map): no retouch, EXIF/GPS strip only -------- */
  { src: "real-photos/real-facade.jpg", out: "real/real-facade.jpg", run: (s) => s.jpeg(JPEG) },
  { src: "real-photos/real-labour-room.jpg", out: "real/real-labour-room.jpg", run: (s) => s.jpeg(JPEG) },
  { src: "real-photos/real-operation-theatre.jpg", out: "real/real-operation-theatre.jpg", run: (s) => s.jpeg(JPEG) },
  { src: "real-photos/real-pharmacy.jpg", out: "real/real-pharmacy.jpg", run: (s) => s.jpeg(JPEG) },
  { src: "real-photos/real-reception.jpg", out: "real/real-reception.jpg", run: (s) => s.jpeg(JPEG) },
  { src: "real-photos/real-ultrasound.jpg", out: "real/real-ultrasound.jpg", run: (s) => s.jpeg(JPEG) },
];

const alt = {
  "brand/logo-penguin-hospital.png": "Dr. Lakshmi's Penguin Hospital logo",
  "hero/hero-mother-newborn.jpg": "A mother holding her sleeping newborn by a sunlit window",
  "hero/hero-first-look.jpg": "New parents seeing their newborn for the first time",
  "hero/heart-walk.jpg": "An older couple laughing together on a morning walk",
  "hero/night-corridor.jpg": "A softly lit hospital corridor at night",
  "services/pregnant-window.jpg": "A pregnant woman standing by a window in soft light",
  "services/newborn-hand.jpg": "A newborn baby's hand holding a parent's finger",
  "services/heart-grandfather.jpg": "A grandfather laughing with his granddaughter",
  "services/hub-obg.jpg": "Three generations of women laughing together on a sofa",
  "services/pregnancy-care.jpg": "A pregnant woman smiling at her scan photo while her husband holds her",
  "services/high-risk-pregnancy.jpg": "A pregnant woman having her blood pressure checked by a nurse",
  "services/preeclampsia.jpg": "A pregnant woman checking her blood pressure reading at home",
  "services/normal-delivery.jpg": "A new father kissing the mother and their newborn in bed",
  "services/painless-delivery.jpg": "A mother resting calmly in labour while her own mother holds her hand",
  "services/caesarean-delivery.jpg": "A mother resting in a hospital bed with her newborn on her chest",
  "services/postnatal-care.jpg": "A new mother holding her sleeping baby in a rocking chair",
  "services/pcos.jpg": "A young woman walking in a green park in the morning",
  "services/irregular-periods.jpg": "A young woman checking a period tracker app on her phone",
  "services/heavy-periods.jpg": "A woman resting on a sofa with a hot water bag",
  "services/fibroids.jpg": "A gynaecologist explaining a uterus model to a patient",
  "services/ovarian-cysts.jpg": "An ultrasound probe and scan screen in a clinic",
  "services/endometriosis.jpg": "A woman sipping a warm drink by a rainy window",
  "services/menopause-care.jpg": "A woman in her fifties laughing with a friend after exercise",
  "services/laparoscopic-surgery.jpg": "A surgeon holding a laparoscopic instrument in theatre",
  "services/fertility-evaluation.jpg": "A couple sitting close together on a sofa",
  "services/pap-smear.jpg": "A gynaecologist talking a patient through a screening test",
  "services/newborn-care.jpg": "A parent's hands holding a newborn's feet",
  "services/heart-check-up.jpg": "A man with ECG leads smiling while a doctor talks him through the test",
  "services/keyhole-heart-surgery.jpg": "An older man walking the corridor with a nurse after surgery",
  "services/bypass-surgery.jpg": "An older couple sharing tea and the newspaper at home",
  "services/heart-valve-surgery.jpg": "A woman walking up steps with her young son",
  "services/varicose-veins.jpg": "A teacher standing in her classroom",
  "services/peripheral-artery-disease.jpg": "An older man tying his shoes on a park bench before a walk",
  "services/av-fistula.jpg": "A drawing of the forearm showing an artery joined to a vein",
  "services/lung-and-chest-surgery.jpg": "A man breathing deeply on a hilltop at sunrise",
  "clinic/operation-theatre.jpg": "The operation theatre at Penguin Hospital",
  "clinic/ultrasound-room.jpg": "The ultrasound room at Penguin Hospital",
  "clinic/general-ward.jpg": "A general ward with curtained beds at Penguin Hospital",
  "clinic/labour-room.jpg": "The labour room at Penguin Hospital",
  "real/real-facade.jpg": "The Penguin Hospital entrance with its blue and red sign",
  "real/real-labour-room.jpg": "The labour room with the newborn warming station",
  "real/real-operation-theatre.jpg": "The operation theatre",
  "real/real-pharmacy.jpg": "Penguin Pharmacy counter and waiting seats",
  "real/real-reception.jpg": "The Penguin Hospital reception desk with the hospital logo",
  "real/real-ultrasound.jpg": "The ultrasound room next to the consultation room",
};

async function main() {
  const results = [];
  for (const job of jobs) {
    const src = path.join(SRC, job.src);
    const out = path.join(OUT, job.out);
    await mkdir(path.dirname(out), { recursive: true });
    if (job.copy) {
      await copyFile(src, out);
      results.push(`${job.out}  (copied, C2PA preserved)`);
      continue;
    }
    const base = sharp(src).rotate(); // honour EXIF orientation before stripping
    const meta = await base.metadata();
    const buf = await job.run(base, meta).toBuffer();
    // strip EXIF/GPS, keep sRGB ICC
    await sharp(buf).withMetadata({ icc: "srgb" }).toFile(out);
    results.push(`${job.out}  (${meta.width}x${meta.height} source)`);
  }

  // Doctor slot files: agency drops real photos into
  // resources/images/_source/doctors/ (matching public/images/doctors/<file>
  // from DOCTOR-IMAGES.md). Re-encode to strip EXIF/GPS, keep sRGB, never
  // upscale and never touch faces.
  const doctorsSrc = path.join(SRC, "doctors");
  if (existsSync(doctorsSrc)) {
    for (const f of await readdir(doctorsSrc)) {
      if (!/\.(jpe?g|png|webp|avif)$/i.test(f)) continue;
      const out = path.join(OUT, "doctors", f);
      await mkdir(path.dirname(out), { recursive: true });
      const meta = await sharp(path.join(doctorsSrc, f)).rotate().metadata();
      await sharp(path.join(doctorsSrc, f))
        .rotate()
        .withMetadata({ icc: "srgb" })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(out);
      results.push(`doctors/${f}  (${meta.width}x${meta.height} source)`);
    }
  }

  await writeFile(
    path.join(OUT, "alt-text.json"),
    JSON.stringify(alt, null, 2) + "\n",
    "utf8",
  );

  console.log("Processed images:");
  for (const r of results) console.log(" -", r);
  console.log("\nWrote public/images/alt-text.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
