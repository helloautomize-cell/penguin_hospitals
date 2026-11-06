// npm run images:doctors
// Reports every doctor image slot (resources/docs/DOCTOR-IMAGES.md): whether
// the file exists in public/images/doctors/, its pixel size, and whether its
// aspect ratio matches the slot (mismatch over 3% is flagged).
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { DOCTOR_IMAGE_SLOTS } from "../lib/doctor-images.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "public", "images", "doctors");

const RATIOS = { "4/5": 4 / 5, "1/1": 1, "16/9": 16 / 9, "3/2": 3 / 2 };

const rows = [];
let missing = 0;
let flagged = 0;

for (const [slot, s] of Object.entries(DOCTOR_IMAGE_SLOTS)) {
  const p = path.join(DIR, s.file);
  const present = existsSync(p);
  let size = "-";
  let dims = "-";
  let flag = "";
  if (present) {
    size = `${(statSync(p).size / 1024).toFixed(0)} KB`;
    try {
      const meta = await sharp(p).metadata();
      dims = `${meta.width}x${meta.height}`;
      const want = RATIOS[s.ratio];
      const got = meta.width / meta.height;
      if (Math.abs(got - want) / want > 0.03) {
        flag = `ratio ${got.toFixed(2)} != ${s.ratio} (>3%)`;
        flagged++;
      }
    } catch {
      flag = "unreadable";
      flagged++;
    }
  } else {
    missing++;
  }
  rows.push({ slot, file: s.file, ratio: s.ratio, present, size, dims, flag });
}

const w = (k) => Math.max(...rows.map((r) => String(r[k]).length), k.length);
console.log(
  `${"slot".padEnd(w("slot"))}  ${"file".padEnd(w("file"))}  ${"ratio".padEnd(5)}  ${"status".padEnd(8)}  ${"size".padEnd(8)}  ${"dims".padEnd(11)}  note`,
);
for (const r of rows) {
  console.log(
    `${r.slot.padEnd(w("slot"))}  ${r.file.padEnd(w("file"))}  ${r.ratio.padEnd(5)}  ${(r.present ? "present" : "missing").padEnd(8)}  ${r.size.padEnd(8)}  ${r.dims.padEnd(11)}  ${r.flag}`,
  );
}
console.log(
  `\n${rows.length} slots: ${rows.length - missing} present, ${missing} missing, ${flagged} flagged.`,
);
if (missing) {
  console.log(
    "Missing slots render their documented fallbacks (or nothing, for slots with no fallback).",
  );
}
process.exitCode = flagged ? 1 : 0;
