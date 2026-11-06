"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";
import { ConfirmChip } from "@/components/Tag";

const NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ORDER = [1, 2, 3, 4, 5, 6, 0];
const OPD: Record<number, [number, number]> = { 0: [16, 18], 1: [0, 24], 2: [0, 24], 3: [0, 24], 4: [0, 24], 5: [0, 24], 6: [0, 24] };

const a24 = (hh: number, rad: number) => {
  const a = (hh / 24) * Math.PI * 2 - Math.PI / 2;
  return [+(210 + Math.cos(a) * rad).toFixed(2), +(210 + Math.sin(a) * rad).toFixed(2)];
};
function seg(h0: number, h1: number, rad: number, wd: number, col: string) {
  if (h1 - h0 >= 24)
    return <circle key={`c${rad}${col}`} cx="210" cy="210" r={rad} fill="none" stroke={col} strokeWidth={wd} />;
  const p0 = a24(h0, rad),
    p1 = a24(h1, rad);
  return (
    <path
      key={`s${h0}${rad}`}
      d={`M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${rad} ${rad} 0 ${h1 - h0 > 12 ? 1 : 0} 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`}
      fill="none"
      stroke={col}
      strokeWidth={wd}
      strokeLinecap="round"
    />
  );
}

function ist() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const o: Record<string, string> = {};
  parts.forEach((x) => (o[x.type] = x.value));
  return { d: NAMES.indexOf(o.weekday), h: +o.hour, m: +o.minute, t: +o.hour + +o.minute / 60 };
}

/** 24-hour hours dial + address card (.visit-grid). */
export function Visit() {
  const [now, setNow] = useState<{ d: number; h: number; m: number; t: number } | null>(null);
  const [sel, setSel] = useState(0);

  useEffect(() => {
    const n = ist();
    setNow(n);
    setSel(n.d);
    const id = setInterval(() => setNow(ist()), 30000);
    return () => clearInterval(id);
  }, []);

  const o = OPD[sel];
  const isToday = now !== null && sel === now.d;
  const open = isToday && now.t >= o[0] && now.t < o[1];

  return (
    <section className="pad" id="visit" aria-labelledby="v-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="l">
            <span className="tag">
              <i></i>Visit us
            </span>
            <h2 className="h2 rv" id="v-h">
              Open when you need us. <span className="soft">Which is any hour.</span>
            </h2>
          </div>
          <p className="lede rv">
            Pick a day to see the hours. The hand shows the time in Chinchwad right now.
          </p>
        </div>
        <div className="visit-grid">
          <div className="clockcard rv">
            <div className="days">
              {ORDER.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={d === sel}
                  className={now && d === now.d ? "today" : ""}
                  onClick={() => setSel(d)}
                >
                  {NAMES[d]}
                </button>
              ))}
            </div>
            <div className="h24">
              <svg viewBox="0 0 420 420">
                <circle cx="210" cy="210" r="180" fill="none" stroke="#E8F0FA" strokeWidth="20" />
                <circle cx="210" cy="210" r="150" fill="none" stroke="#E8F0FA" strokeWidth="20" />
                {seg(0, 24, 180, 20, "#F4978E")}
                {seg(o[0], o[1], 150, 20, "#001F43")}
                {Array.from({ length: 24 }, (_, hh) => {
                  const q = a24(hh, 204),
                    q2 = a24(hh, hh % 6 === 0 ? 196 : 200);
                  return (
                    <line key={hh} x1={q[0]} y1={q[1]} x2={q2[0]} y2={q2[1]} stroke="#C8D5E6" strokeWidth="1.4" />
                  );
                })}
                {[[0, "12 am"], [6, "6 am"], [12, "12 pm"], [18, "6 pm"]].map(([h, l]) => {
                  const q = a24(+h, 118);
                  return (
                    <text key={l as string} className="hl" x={q[0]} y={q[1] + 4}>
                      {l}
                    </text>
                  );
                })}
                {isToday && now && (
                  <>
                    <line x1="210" y1="210" x2={a24(now.t, 196)[0]} y2={a24(now.t, 196)[1]} stroke="#0B1A30" strokeWidth="3" strokeLinecap="round" />
                    <circle cx={a24(now.t, 196)[0]} cy={a24(now.t, 196)[1]} r="7" fill="#0B1A30" stroke="#fff" strokeWidth="3" />
                    <circle cx="210" cy="210" r="6" fill="#0B1A30" />
                  </>
                )}
                <circle cx="210" cy="210" r="86" fill="#fff" />
                {isToday && now ? (
                  <>
                    <text className="ct" x="210" y="214">
                      {`${now.h % 12 || 12}:${("0" + now.m).slice(-2)}`}
                    </text>
                    <text className="cs" x="210" y="244" fill={open ? "#2F7D5B" : "#77869C"}>
                      {`OPD ${open ? "open now" : "closed now"}`}
                    </text>
                  </>
                ) : (
                  <>
                    <text className="ct" x="210" y="214" style={{ fontSize: 40 }}>
                      {NAMES[sel]}
                    </text>
                    <text className="cs" x="210" y="244" fill="#77869C">
                      {o[1] - o[0] === 24 ? "OPD 24 hours" : "OPD 4 to 6 pm"}
                    </text>
                  </>
                )}
              </svg>
            </div>
            <div className="legend">
              <span>
                <i style={{ background: "var(--coral)" }}></i>Emergency
              </span>
              <span>
                <i style={{ background: "var(--navy)" }}></i>OPD <ConfirmChip />
              </span>
            </div>
          </div>
          <div className="addr rv" style={{ "--d": ".1s" } as React.CSSProperties}>
            <h3>Penguin Hospital, Chinchwad Gaon</h3>
            <p>
              {site.address.line1}, {site.address.line2}, {site.address.locality},{" "}
              {site.address.city} {site.address.postalCode}
            </p>
            <div className="minimap" aria-hidden="true">
              <svg viewBox="0 0 400 180" preserveAspectRatio="none">
                <g fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="12" strokeLinecap="round">
                  <path d="M-10 150 C100 130 160 60 410 40" />
                  <path d="M200 -10 L260 190" />
                </g>
                <g fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="5">
                  <path d="M-10 80H410" />
                  <path d="M80 -10V190" />
                  <path d="M330 -10V190" />
                </g>
              </svg>
              <span className="pin"></span>
              <span className="lb">Penguin Hospital</span>
            </div>
            <div className="rows">
              <div>
                <span>Phone and WhatsApp</span>
                <span className="sel">{site.phone.display}</span>
              </div>
              <div>
                <span>Landline</span>
                <span className="sel">{site.landline.display}</span>
              </div>
              <div>
                <span>Email</span>
                <span className="sel">
                  {site.email.address} <ConfirmChip />
                </span>
              </div>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <span style={{ fontSize: 14, color: "var(--on-dark-2)" }}>Families come to us from</span>
              <div className="areas">
                {site.areasServed.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-coral" href={site.googleMapsUrl}>
                <MapPin className="ico" aria-hidden="true" />
                Get directions
              </a>
              <a className="btn btn-glass" href={whatsappLink("a visit")}>
                <WhatsAppIcon className="ico" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
