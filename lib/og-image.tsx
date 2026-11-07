import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

async function fonts(): Promise<{ name: string; data: ArrayBuffer; weight: 400 | 700 }[]> {
  const list: { name: string; data: ArrayBuffer; weight: 400 | 700 }[] = [];
  try {
    // Figtree 700 straight from Google Fonts (build machines and Vercel have network)
    const css = await fetch("https://fonts.googleapis.com/css2?family=Figtree:wght@700&display=swap", {
      headers: { "User-Agent": "Mozilla/5.0" },
    }).then((r) => r.text());
    const url = css.match(/src: url\((https:[^)]+?\.woff2)\)/)?.[1];
    if (url) list.push({ name: "Figtree", data: await fetch(url).then((r) => r.arrayBuffer()), weight: 700 });
  } catch { /* offline build: fall through to bundled font */ }
  // Guaranteed fallback so ImageResponse never runs with zero fonts
  const geist = await readFile(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"));
  list.push({ name: "Figtree", data: geist.buffer.slice(geist.byteOffset, geist.byteOffset + geist.byteLength) as ArrayBuffer, weight: 400 });
  return list;
}

type FontList = { name: string; data: ArrayBuffer; weight: 400 | 700 }[];
let fontCache: Promise<FontList> | null = null;
const loadFonts = () => (fontCache ??= fonts());

export async function ogImage(title: string, kicker: string, imgPath?: string) {
  const fonts = await loadFonts();
  let imgData: string | null = null;
  if (imgPath) {
    try {
      const buf = await readFile(join(process.cwd(), "public", imgPath));
      imgData = `data:image/jpeg;base64,${buf.toString("base64")}`;
    } catch { /* skip the photo column */ }
  }
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#001F43",
          color: "white",
          fontFamily: "Figtree",
          padding: "64px",
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, paddingRight: imgData ? 48 : 0 }}>
          <div style={{ fontSize: 30, color: "#FF6B5E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>{kicker}</div>
          <div style={{ fontSize: title.length > 40 ? 60 : 72, fontWeight: 700, lineHeight: 1.08 }}>{title}</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 44, fontSize: 28, color: "rgba(255,255,255,0.75)" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FF6B5E", marginRight: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#001F43", fontWeight: 700 }}>P</div>
            Dr. Lakshmi&apos;s Penguin Hospital
          </div>
        </div>
        {imgData ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgData} width={420} height={630 - 128} style={{ borderRadius: 24, objectFit: "cover" }} alt="" />
        ) : null}
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
