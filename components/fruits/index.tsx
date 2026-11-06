"use client";

// Fruit illustrations for the "For mothers-to-be" dial, ported exactly from
// resources/reference/sections-v2/ (same path data, gradient stops and clip
// paths). Gradient and clip-path ids are prefixed with useId() so several
// fruits on one page never collide.

import { useId } from "react";
import type { FruitId } from "@/lib/pregnancy-weeks";



export function FruitSvg({ id, ...props }: { id: FruitId } & React.SVGProps<SVGSVGElement>) {
  switch (id) {
    case "seed":
      return <FrSeed {...props} />;
    case "jamun":
      return <FrJamun {...props} />;
    case "lemon":
      return <FrLemon {...props} />;
    case "guava":
      return <FrGuava {...props} />;
    case "mango":
      return <FrMango {...props} />;
    case "papaya":
      return <FrPapaya {...props} />;
    case "coconut":
      return <FrCoconut {...props} />;
    case "watermelon":
      return <FrWatermelon {...props} />;
  }
}

function LeafGradient({ p }: { p: string }) {
  return (
    <linearGradient id={`${p}gLeaf`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#7DBB4F" />
      <stop offset="1" stopColor="#3E7B2C" />
    </linearGradient>
  );
}

function FrSeed(props: React.SVGProps<SVGSVGElement>) {
  const p = useId();
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={`${p}gSeed`} cx="38%" cy="40%" r="70%">
          <stop offset="0" stopColor="#FF8592" />
          <stop offset=".45" stopColor="#E02A48" />
          <stop offset="1" stopColor="#8E0F28" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="176" rx="44" ry="6" fill="#000" opacity=".08" />
      <path
        d="M98 34l44 26 14 50-24 50-46 10-38-34 2-58z"
        fill={`url(#${p}gSeed)`}
        stroke="#C0183A"
        strokeWidth="30"
        strokeLinejoin="round"
      />
      <path
        d="M98 34l2 52M142 60l-42 26M156 110l-56-24M50 78l50 8"
        fill="none"
        stroke="#FF9AA6"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".55"
      />
      <path
        d="M100 96c9 10 13 24 11 38-2 10-6 16-11 16s-9-6-11-16c-2-14 2-28 11-38z"
        fill="#FFE9DE"
        opacity=".6"
      />
      <path
        d="M66 90c6-18 18-32 32-40"
        fill="none"
        stroke="#fff"
        strokeWidth="9"
        strokeLinecap="round"
        opacity=".5"
      />
      <circle cx="134" cy="136" r="5" fill="#fff" opacity=".35" />
    </svg>
  );
}

function FrJamun(props: React.SVGProps<SVGSVGElement>) {
  const p = useId();
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={`${p}gJam`} cx="36%" cy="32%" r="75%">
          <stop offset="0" stopColor="#9C6BC0" />
          <stop offset=".45" stopColor="#55286F" />
          <stop offset="1" stopColor="#22102F" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="182" rx="40" ry="6" fill="#000" opacity=".08" />
      <ellipse cx="100" cy="112" rx="50" ry="66" fill={`url(#${p}gJam)`} />
      <path
        d="M76 82c6-14 16-22 26-24"
        fill="none"
        stroke="#fff"
        strokeWidth="10"
        strokeLinecap="round"
        opacity=".38"
      />
      <ellipse cx="128" cy="150" rx="7" ry="10" fill="#fff" opacity=".12" />
      <path d="M92 48l8-6 8 6-8 4z" fill="#3B2A1C" />
      <path
        d="M100 44c0-12 4-22 10-28"
        fill="none"
        stroke="#6B4A2E"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FrLemon(props: React.SVGProps<SVGSVGElement>) {
  const p = useId();
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={`${p}gLem`} cx="38%" cy="36%" r="72%">
          <stop offset="0" stopColor="#FFF6A6" />
          <stop offset=".5" stopColor="#F5D736" />
          <stop offset="1" stopColor="#D7A914" />
        </radialGradient>
        <LeafGradient p={p} />
      </defs>
      <ellipse cx="100" cy="160" rx="64" ry="7" fill="#000" opacity=".08" />
      <path
        d="M24 104c8-34 44-56 78-56s68 22 76 56c-8 34-42 52-76 52s-70-18-78-52z"
        fill={`url(#${p}gLem)`}
      />
      <path
        d="M174 96q16 2 18 8-2 6-18 8zM26 96q-16 2-18 8 2 6 18 8z"
        fill="#E2B81E"
      />
      <path
        d="M56 84c12-12 30-18 48-18"
        fill="none"
        stroke="#fff"
        strokeWidth="9"
        strokeLinecap="round"
        opacity=".45"
      />
      <g fill="#B98B0C" opacity=".22">
        <circle cx="70" cy="112" r="1.8" />
        <circle cx="92" cy="126" r="1.8" />
        <circle cx="120" cy="118" r="1.8" />
        <circle cx="140" cy="132" r="1.8" />
        <circle cx="110" cy="96" r="1.8" />
        <circle cx="150" cy="104" r="1.8" />
        <circle cx="80" cy="136" r="1.8" />
      </g>
      <path
        d="M112 52c10-26 40-36 62-30-8 24-36 38-62 30z"
        fill={`url(#${p}gLeaf)`}
      />
      <path
        d="M114 51c18-10 36-18 56-26"
        fill="none"
        stroke="#2E5F20"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  );
}

function FrGuava(props: React.SVGProps<SVGSVGElement>) {
  const p = useId();
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={`${p}gGua`} cx="38%" cy="34%" r="72%">
          <stop offset="0" stopColor="#D9EE9F" />
          <stop offset=".5" stopColor="#93C454" />
          <stop offset="1" stopColor="#5A8A2A" />
        </radialGradient>
        <LeafGradient p={p} />
      </defs>
      <ellipse cx="100" cy="182" rx="56" ry="7" fill="#000" opacity=".08" />
      <path
        d="M100 38c44 0 70 36 68 76-2 40-30 64-68 64s-66-24-68-64c-2-40 24-76 68-76z"
        fill={`url(#${p}gGua)`}
      />
      <path
        d="M60 86c10-20 26-30 44-32"
        fill="none"
        stroke="#fff"
        strokeWidth="10"
        strokeLinecap="round"
        opacity=".4"
      />
      <g fill="#4E7A24" opacity=".25">
        <circle cx="128" cy="96" r="2" />
        <circle cx="76" cy="120" r="2" />
        <circle cx="118" cy="140" r="2" />
        <circle cx="90" cy="150" r="2" />
        <circle cx="142" cy="128" r="2" />
      </g>
      <path
        d="M100 172l-6 6 6-2 6 2zM94 176l-6-2 4 4zM106 176l6-2-4 4z"
        fill="#4A3A22"
      />
      <path
        d="M100 40c-2-10 0-18 6-24"
        fill="none"
        stroke="#6B4A2E"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M104 26c14-14 36-14 48-6-14 12-34 14-48 6z"
        fill={`url(#${p}gLeaf)`}
      />
    </svg>
  );
}

function FrMango(props: React.SVGProps<SVGSVGElement>) {
  const p = useId();
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`${p}gMan`} x1=".2" y1="0" x2=".8" y2="1">
          <stop offset="0" stopColor="#FFE07A" />
          <stop offset=".55" stopColor="#FBB731" />
          <stop offset="1" stopColor="#EE8A16" />
        </linearGradient>
        <radialGradient id={`${p}gBlush`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F0562F" stopOpacity=".75" />
          <stop offset="1" stopColor="#F0562F" stopOpacity="0" />
        </radialGradient>
        <LeafGradient p={p} />
      </defs>
      <ellipse cx="102" cy="184" rx="58" ry="7" fill="#000" opacity=".08" />
      <g transform="rotate(-28 100 112)">
        <path
          d="M24 116c0-36 36-60 82-60 46 0 80 24 80 56 0 30-30 56-78 58-30 1-50-8-62-20-10-8-22-14-22-34z"
          fill={`url(#${p}gMan)`}
        />
        <ellipse cx="140" cy="88" rx="52" ry="32" fill={`url(#${p}gBlush)`} />
        <path
          d="M56 92c14-16 34-24 56-24"
          fill="none"
          stroke="#fff"
          strokeWidth="10"
          strokeLinecap="round"
          opacity=".4"
        />
      </g>
      <path
        d="M150 62c4-10 10-16 18-18"
        fill="none"
        stroke="#6B4A2E"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M166 46c8-24 2-38-8-44-10 18-8 34 8 44z"
        fill={`url(#${p}gLeaf)`}
      />
      <path
        d="M165 45c-2-14-3-26-7-40"
        fill="none"
        stroke="#2E5F20"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  );
}

const PAPAYA_SEEDS: [number, number][] = [
  [78, 96], [86, 104], [92, 92], [100, 108], [104, 96], [112, 90], [116, 104],
  [124, 96], [130, 108], [136, 94], [142, 102], [96, 116], [120, 114], [108, 84],
  [84, 90], [144, 110], [72, 104], [128, 84],
];

function FrPapaya(props: React.SVGProps<SVGSVGElement>) {
  const p = useId();
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`${p}gPapS`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6E9F35" />
          <stop offset=".6" stopColor="#C9B33A" />
          <stop offset="1" stopColor="#F0A03A" />
        </linearGradient>
        <radialGradient id={`${p}gPapF`} cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#FFC27A" />
          <stop offset=".7" stopColor="#FA8C3C" />
          <stop offset="1" stopColor="#EE6F2A" />
        </radialGradient>
      </defs>
      <ellipse cx="102" cy="158" rx="74" ry="7" fill="#000" opacity=".08" />
      <path
        d="M18 100c0-34 54-54 104-50 40 4 66 24 66 50s-26 46-66 50c-50 4-104-16-104-50z"
        fill={`url(#${p}gPapS)`}
      />
      <path
        d="M26 100c0-28 50-46 96-42 34 3 58 20 58 42s-24 39-58 42c-46 4-96-14-96-42z"
        fill={`url(#${p}gPapF)`}
      />
      <path
        d="M64 100c0-14 26-24 56-21 20 2 34 10 34 21s-14 19-34 21c-30 3-56-7-56-21z"
        fill="#E8642A"
      />
      <g fill="#1E1410">
        {PAPAYA_SEEDS.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="4.6" />
            <circle cx={x - 1.4} cy={y - 1.6} r="1.3" fill="#fff" opacity=".35" />
          </g>
        ))}
      </g>
      <path
        d="M30 92c6-14 20-24 38-28"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        opacity=".35"
      />
    </svg>
  );
}

function FrCoconut(props: React.SVGProps<SVGSVGElement>) {
  const p = useId();
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={`${p}gCoc`} cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor="#B98A5A" />
          <stop offset=".5" stopColor="#7E5230" />
          <stop offset="1" stopColor="#43291A" />
        </radialGradient>
        <clipPath id={`${p}cCoc`}>
          <path d="M100 30c50 0 74 44 72 84-2 42-32 66-72 66s-70-24-72-66c-2-40 22-84 72-84z" />
        </clipPath>
      </defs>
      <ellipse cx="100" cy="186" rx="60" ry="7" fill="#000" opacity=".08" />
      <path
        d="M100 30c50 0 74 44 72 84-2 42-32 66-72 66s-70-24-72-66c-2-40 22-84 72-84z"
        fill={`url(#${p}gCoc)`}
      />
      <g
        clipPath={`url(#${p}cCoc)`}
        fill="none"
        stroke="#E7C9A0"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".28"
      >
        <path d="M40 60c20 30 24 80 14 120M64 40c18 40 20 90 10 140M90 32c12 44 12 100 4 150M116 32c-4 50 0 100 10 150M140 40c-12 44-10 96 6 140M162 60c-16 36-18 80-6 116" />
      </g>
      <path
        d="M60 78c10-20 26-32 44-36"
        fill="none"
        stroke="#fff"
        strokeWidth="9"
        strokeLinecap="round"
        opacity=".2"
      />
      <circle cx="88" cy="64" r="7" fill="#2A1A0E" />
      <circle cx="112" cy="64" r="7" fill="#2A1A0E" />
      <circle cx="100" cy="84" r="7" fill="#2A1A0E" />
    </svg>
  );
}

function FrWatermelon(props: React.SVGProps<SVGSVGElement>) {
  const p = useId();
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={`${p}gWat`} cx="36%" cy="32%" r="75%">
          <stop offset="0" stopColor="#B8E08A" />
          <stop offset=".55" stopColor="#6BAA45" />
          <stop offset="1" stopColor="#3B7428" />
        </radialGradient>
        <clipPath id={`${p}cWat`}>
          <path d="M16 104C16 60 62 36 100 36s84 24 84 68-40 66-84 66-84-22-84-66z" />
        </clipPath>
      </defs>
      <ellipse cx="100" cy="178" rx="76" ry="8" fill="#000" opacity=".08" />
      <path
        d="M16 104C16 60 62 36 100 36s84 24 84 68-40 66-84 66-84-22-84-66z"
        fill={`url(#${p}gWat)`}
      />
      <g
        clipPath={`url(#${p}cWat)`}
        fill="none"
        stroke="#24561A"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".85"
      >
        <path d="M40 36c-8 16 6 26-2 42s6 28-2 44 8 30 0 48" />
        <path d="M72 30c-8 18 6 28-2 46s6 30-2 48 8 30 0 50" />
        <path d="M104 30c-8 18 6 28-2 46s6 30-2 48 8 30 0 50" />
        <path d="M136 30c-8 18 6 28-2 46s6 30-2 48 8 30 0 50" />
        <path d="M166 36c-8 16 6 26-2 42s6 28-2 44 8 30 0 48" />
      </g>
      <path
        d="M44 74c14-18 32-28 52-30"
        fill="none"
        stroke="#fff"
        strokeWidth="9"
        strokeLinecap="round"
        opacity=".3"
      />
      <path
        d="M100 36c0-8 3-14 8-18"
        fill="none"
        stroke="#5C7A2E"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
