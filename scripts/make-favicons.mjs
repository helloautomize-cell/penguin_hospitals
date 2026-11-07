// Builds the site favicons from the live penguinhospitals.com site icon.
// Run from the repo root: node scripts/make-favicons.mjs
// Needs: sharp (already in the repo for the image script). Node 18+ (global fetch).
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";

const BASE = "https://penguinhospitals.com/wp-content/uploads/2024/04/";
// WordPress stores the site icon at these names. Try the largest first.
const CANDIDATES = [
  "cropped-PENGUIN-SITE-ICON.png",
  "cropped-PENGUIN-SITE-ICON-512x512.png",
  "cropped-PENGUIN-SITE-ICON-270x270.png",
  "cropped-PENGUIN-SITE-ICON-192x192.png",
];

async function getSource() {
  for (const name of CANDIDATES) {
    try {
      const res = await fetch(BASE + name);
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      const meta = await sharp(buf).metadata();
      console.log(`Using ${name} (${meta.width}x${meta.height})`);
      return buf;
    } catch {}
  }
  throw new Error(
    "Could not download the site icon. Open https://penguinhospitals.com, find the <link rel=\"icon\"> URL in the page source, save it as resources/brand/site-icon-source.png and rerun with SRC=resources/brand/site-icon-source.png"
  );
}

// Minimal ICO writer: PNG-compressed entries (supported by every current browser).
function toIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  pngs.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...pngs.map((p) => p.buf)]);
}

const src = process.env.SRC
  ? await sharp(process.env.SRC).toBuffer()
  : await getSource();

await mkdir("resources/brand", { recursive: true });
await writeFile("resources/brand/site-icon-source.png", src);

// Square it on a transparent canvas without cropping the mark.
const square = (size, bg = { r: 0, g: 0, b: 0, alpha: 0 }) =>
  sharp(src)
    .resize(size, size, { fit: "contain", background: bg })
    .png({ compressionLevel: 9 })
    .toBuffer();

const ico = toIco(
  await Promise.all([16, 32, 48].map(async (s) => ({ size: s, buf: await square(s) })))
);
await writeFile("app/favicon.ico", ico);
await writeFile("app/icon.png", await square(512));
// iOS ignores transparency and paints it black, so the apple icon gets a white background.
await writeFile("app/apple-icon.png", await square(180, { r: 255, g: 255, b: 255, alpha: 1 }));
await mkdir("public/icons", { recursive: true });
await writeFile("public/icons/icon-192.png", await square(192));
await writeFile("public/icons/icon-512.png", await square(512));
console.log("Wrote app/favicon.ico, app/icon.png, app/apple-icon.png, public/icons/icon-192.png, public/icons/icon-512.png");
