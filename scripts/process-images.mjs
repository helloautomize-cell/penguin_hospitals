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
import { mkdir, copyFile, writeFile } from "node:fs/promises";
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
  "clinic/operation-theatre.jpg": "The operation theatre at Penguin Hospital",
  "clinic/ultrasound-room.jpg": "The ultrasound room at Penguin Hospital",
  "clinic/general-ward.jpg": "A general ward with curtained beds at Penguin Hospital",
  "clinic/labour-room.jpg": "The labour room at Penguin Hospital",
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
