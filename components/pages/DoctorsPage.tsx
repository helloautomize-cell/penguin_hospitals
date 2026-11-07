import Link from "next/link";
import Image from "next/image";
import { ConfirmChip } from "@/components/Tag";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PgIconDefs, Ico } from "@/components/icons/PgIcons";
import { ConcernPicker } from "@/components/pages/ConcernPicker";
import { JourneyScene } from "@/components/pages/JourneyScene";
import { PagesFx } from "@/components/pages/PagesFx";
import { doctorImage } from "@/lib/doctor-images.server";
import type { DoctorSlotId } from "@/lib/doctor-images";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";

/** Resolve a doctor slot to { src, alt, objectPosition } for next/image fill. */
function slotImg(slot: DoctorSlotId) {
  const v = doctorImage(slot);
  if (v.kind !== "single") return null;
  return { src: v.src, alt: v.alt, pos: v.objectPosition };
}

type Treat = { label: string; icon: string; href: string };

const LAKSHMI_TREATS: Treat[] = [
  { label: "Pregnancy care", icon: "bump", href: "/pregnancy-care/" },
  { label: "High-risk pregnancy", icon: "alert", href: "/high-risk-pregnancy/" },
  { label: "Normal and painless delivery", icon: "baby", href: "/normal-delivery/" },
  { label: "PCOS", icon: "cycle", href: "/pcos/" },
  { label: "Period problems", icon: "drop", href: "/irregular-menstruation/" },
  { label: "Fibroids and cysts", icon: "scope", href: "/uterine-fibroids/" },
  { label: "Fertility evaluation", icon: "sprout", href: "/fertility-evaluation/" },
  { label: "Menopause", icon: "moon", href: "/menopause-care/" },
];

const ASHISH_TREATS: Treat[] = [
  { label: "Heart check-up", icon: "ecg", href: "/heart-check-up/" },
  { label: "Bypass surgery", icon: "heart", href: "/bypass-surgery/" },
  { label: "Heart valve surgery", icon: "heart", href: "/heart-valve-surgery/" },
  { label: "Keyhole heart surgery", icon: "knife", href: "/keyhole-heart-surgery/" },
  { label: "Lung and chest surgery", icon: "lungs", href: "/lung-and-chest-surgery/" },
  { label: "Varicose veins", icon: "vein", href: "/varicose-veins/" },
  { label: "Leg artery disease", icon: "walk", href: "/peripheral-artery-disease/" },
  { label: "AV fistula", icon: "drop", href: "/av-fistula-for-dialysis/" },
];

export function DoctorsPage() {
  const lHero = slotImg("lakshmiHero");
  const aHero = slotImg("ashishHero");
  const together = slotImg("together");
  const lMain = slotImg("lakshmiNote");
  const lStrip = [slotImg("lakshmiConsult"), slotImg("lakshmiScrubs")];
  const aMain = slotImg("ashishNote");
  const aStrip = [slotImg("ashishConsult"), slotImg("ashishRecovery")];

  return (
    <div className="pgs">
      <PgIconDefs />
      <PagesFx />

      <div className="wrap d-head">
        <div>
          <Breadcrumbs items={[{ label: "Doctors", href: "/doctors/" }]} />
          <h1 style={{ marginTop: 16 }}>
            <span className="ln">
              <span>Our</span>
            </span>
            <span className="ln">
              <span>doctors</span>
            </span>
          </h1>
        </div>
        <div className="side">
          <p className="lead">
            Two specialists lead the care at Penguin Hospital. You see them yourself, at your first
            visit and at every follow-up, and they explain each step in plain words before anything
            is decided.
          </p>
          <div className="d-nums">
            <div>
              <b>2</b>
              <span>Specialists, both seeing patients themselves</span>
            </div>
            <div>
              <b>15+</b>
              <span>Years of heart surgery, Dr. Ashish</span>
            </div>
            <div>
              <b>24h</b>
              <span>Emergency, day and night</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="duo">
          <Link className="pane" href="#lakshmi">
            <div className="pic">
              {lHero && (
                <Image
                  src={lHero.src}
                  alt={lHero.alt}
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  priority
                  style={{ objectFit: "cover", objectPosition: "50% 16%" }}
                />
              )}
            </div>
            <span className="lbl">
              <Ico n="bump" />
              Women and pregnancy
            </span>
            <div className="info">
              <h2>Dr. Lakshmi Vijay Kalbande</h2>
              <p className="role">Obstetrician and gynaecologist · Laparoscopic surgeon · Founder</p>
              <div className="row">
                <div className="tags">
                  <span>
                    <Ico n="baby" />
                    Pregnancy and birth
                  </span>
                  <span>
                    <Ico n="cycle" />
                    Periods and PCOS
                  </span>
                  <span>
                    <Ico n="scope" />
                    Keyhole surgery
                  </span>
                </div>
                <span className="arw">
                  <Ico n="arrow" />
                </span>
              </div>
            </div>
          </Link>
          <Link className="pane" href="#ashish">
            <div className="pic">
              {aHero && (
                <Image
                  src={aHero.src}
                  alt={aHero.alt}
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  loading="eager"
                  style={{ objectFit: "cover", objectPosition: "50% 16%" }}
                />
              )}
            </div>
            <span className="lbl">
              <Ico n="heart" />
              Heart, lungs and vessels
            </span>
            <div className="info">
              <h2>Dr. Ashish A. Baviskar</h2>
              <p className="role">Cardiothoracic and vascular surgeon (CTVS)</p>
              <div className="row">
                <div className="tags">
                  <span>
                    <Ico n="heart" />
                    Bypass and valves
                  </span>
                  <span>
                    <Ico n="lungs" />
                    Lung and chest
                  </span>
                  <span>
                    <Ico n="vein" />
                    Veins and arteries
                  </span>
                </div>
                <span className="arw">
                  <Ico n="arrow" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <section className="band">
        <div className="wrap">
          <div className="prv" style={{ display: "grid", gap: 12 }}>
            <p className="kicker">Not sure who to see?</p>
            <h2 className="h-l" style={{ maxWidth: "16ch" }}>
              Tell us what brings you in.
            </h2>
          </div>
          <ConcernPicker />
        </div>
      </section>

      <JourneyScene />

      <section className="band">
        <div className="wrap">
          <article className="prof" id="lakshmi">
            <div className="pp">
              <div className="main">
                {lMain && (
                  <Image
                    className="zoom"
                    src={lMain.src}
                    alt="Dr. Lakshmi Vijay Kalbande, obstetrician and gynaecologist, seated in her consultation room"
                    fill
                    sizes="(max-width: 860px) 100vw, 38vw"
                    style={{ objectFit: "cover", objectPosition: lMain.pos }}
                  />
                )}
                <span className="live">Sees every patient herself</span>
              </div>
              <div className="strip">
                <figure>
                  {lStrip[0] && (
                    <Image
                      src={lStrip[0].src}
                      alt="Dr. Lakshmi talking with a couple at her desk"
                      fill
                      sizes="(max-width: 860px) 50vw, 19vw"
                      style={{ objectFit: "cover", objectPosition: lStrip[0].pos }}
                    />
                  )}
                </figure>
                <figure>
                  {lStrip[1] && (
                    <Image
                      src={lStrip[1].src}
                      alt="Dr. Lakshmi in theatre scrubs"
                      fill
                      sizes="(max-width: 860px) 50vw, 19vw"
                      style={{ objectFit: "cover", objectPosition: "50% 22%" }}
                    />
                  )}
                </figure>
              </div>
            </div>
            <div className="pi">
              <div className="prv">
                <span className="kicker">Women and pregnancy</span>
                <h2 className="h-l">Dr. Lakshmi Vijay Kalbande</h2>
                <p className="role">
                  Obstetrician and gynaecologist · Laparoscopic surgeon · Founder, Penguin Hospital
                </p>
              </div>
              <p className="intro prv">
                Our founder. She looks after women from their first period
                problems through pregnancy, birth and menopause, and reads many scans herself, so
                you hear what they show in the same visit.
              </p>
              <div className="nums prv">
                <div>
                  <div className="n" data-count="3">
                    0
                  </div>
                  <div className="l">Qualifications, including an ultrasound fellowship</div>
                </div>
                <div>
                  <div className="n" data-count="2">
                    0
                  </div>
                  <div className="l">Memberships: Indian Menopause Society, IOTA group</div>
                </div>
                <div>
                  <div className="n" style={{ fontSize: 30, paddingTop: 10 }}>
                    <ConfirmChip />
                  </div>
                  <div className="l">
                    Years in practice. Old site says &ldquo;since 2017&rdquo; and &ldquo;12+&rdquo;
                  </div>
                </div>
              </div>
              <div className="prv">
                <p className="sub">How she works</p>
                <div className="hw">
                  <div>
                    <i>
                      <Ico n="file" />
                    </i>
                    <span>
                      <b>Your pregnancy, your plan</b>
                      <p>
                        Visits and scans are scheduled around your own risks, not a generic chart.
                      </p>
                    </span>
                  </div>
                  <div>
                    <i>
                      <Ico n="baby" />
                    </i>
                    <span>
                      <b>Normal birth first, when it is safe</b>
                      <p>A caesarean only when it is the safer way for mother or baby.</p>
                    </span>
                  </div>
                  <div>
                    <i>
                      <Ico n="scope" />
                    </i>
                    <span>
                      <b>Keyhole surgery when it is right</b>
                      <p>Simpler treatment first. Laparoscopy when it suits you.</p>
                    </span>
                  </div>
                  <div>
                    <i>
                      <Ico n="chat" />
                    </i>
                    <span>
                      <b>Questions are part of the visit</b>
                      <p>
                        Bring your list and your family. Nothing is decided until you understand it.
                      </p>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="sub">Training path</p>
                <ol className="tsteps prv">
                  <li>
                    <b>MBBS</b>
                    <span>
                      <ConfirmChip />
                    </span>
                  </li>
                  <li>
                    <b>DNB, Obstetrics and Gynaecology</b>
                    <span>
                      <ConfirmChip />
                    </span>
                  </li>
                  <li>
                    <b>Ultrasound fellowship</b>
                    <span>FOGSI recognised, Bangalore</span>
                  </li>
                  <li>
                    <b>Consultant</b>
                    <span>Amrutha Multi-specialty Hospital, Telangana</span>
                  </li>
                  <li>
                    <b>Founder</b>
                    <span>
                      Penguin Hospital <ConfirmChip note="year" />
                    </span>
                  </li>
                </ol>
              </div>
              <dl className="kv prv">
                <dt>Registration</dt>
                <dd>
                  2013/04/1086 <ConfirmChip note="council" />
                </dd>
                <dt>Languages</dt>
                <dd>
                  <ConfirmChip />
                </dd>
                <dt>OPD</dt>
                <dd>
                  <ConfirmChip note="days and times" />
                </dd>
              </dl>
              <div className="prv">
                <p className="sub">She treats</p>
                <div className="treats">
                  {LAKSHMI_TREATS.map((t) => (
                    <Link key={t.label} href={t.href}>
                      <Ico n={t.icon} />
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pacts prv">
                <Link className="btn btn-navy" href="/book/?doctor=dr-lakshmi-vijay-kalbande">
                  <Ico n="cal" />
                  Book with Dr. Lakshmi
                </Link>
                <Link className="btn btn-ghost" href="/doctors/dr-lakshmi-vijay-kalbande/">
                  Full profile
                </Link>
              </div>
            </div>
          </article>

          <article className="prof flip" id="ashish">
            <div className="pp">
              <div className="main">
                {aMain && (
                  <Image
                    className="zoom"
                    src={aMain.src}
                    alt="Dr. Ashish A. Baviskar, cardiothoracic and vascular surgeon, seated by a window"
                    fill
                    sizes="(max-width: 860px) 100vw, 38vw"
                    style={{ objectFit: "cover", objectPosition: aMain.pos }}
                  />
                )}
                <span className="live">Sees every patient himself</span>
              </div>
              <div className="strip">
                <figure>
                  {aStrip[0] && (
                    <Image
                      src={aStrip[0].src}
                      alt="Dr. Ashish explaining a heart model to a patient and his daughter"
                      fill
                      sizes="(max-width: 860px) 50vw, 19vw"
                      style={{ objectFit: "cover", objectPosition: aStrip[0].pos }}
                    />
                  )}
                </figure>
                <figure>
                  {aStrip[1] && (
                    <Image
                      src={aStrip[1].src}
                      alt="Dr. Ashish walking with a recovering patient"
                      fill
                      sizes="(max-width: 860px) 50vw, 19vw"
                      style={{ objectFit: "cover", objectPosition: aStrip[1].pos }}
                    />
                  )}
                </figure>
              </div>
            </div>
            <div className="pi">
              <div className="prv">
                <span className="kicker">Heart, lungs and vessels</span>
                <h2 className="h-l">Dr. Ashish A. Baviskar</h2>
                <p className="role">Cardiothoracic and vascular surgeon (CTVS)</p>
              </div>
              <p className="intro prv">
                A surgeon for the heart, the lungs and the blood vessels. Many patients come to him
                worried about an operation. Often the first step is simply tests and a clear
                explanation.
              </p>
              <div className="nums prv">
                <div>
                  <div className="n">
                    <span data-count="15">0</span>+
                  </div>
                  <div className="l">Years of practice in hospitals across India</div>
                </div>
                <div>
                  <div className="n" data-count="3">
                    0
                  </div>
                  <div className="l">Areas: heart, lungs and chest, blood vessels</div>
                </div>
                <div>
                  <div className="n">MCh</div>
                  <div className="l">Super-speciality degree in CTVS</div>
                </div>
              </div>
              <div className="prv">
                <p className="sub">How he works</p>
                <div className="hw">
                  <div>
                    <i>
                      <Ico n="ecg" />
                    </i>
                    <span>
                      <b>Tests and a conversation first</b>
                      <p>No decision until the reports are in and you have understood them.</p>
                    </span>
                  </div>
                  <div>
                    <i>
                      <Ico n="heart" />
                    </i>
                    <span>
                      <b>Keyhole when it suits you</b>
                      <p>Minimally invasive heart surgery where your heart and body allow it.</p>
                    </span>
                  </div>
                  <div>
                    <i>
                      <Ico n="people" />
                    </i>
                    <span>
                      <b>Your family is in the room</b>
                      <p>Heart surgery affects the whole household. Bring them along.</p>
                    </span>
                  </div>
                  <div>
                    <i>
                      <Ico n="walk" />
                    </i>
                    <span>
                      <b>Recovery is planned too</b>
                      <p>Medicines, wound care, walking and follow-up visits, written down.</p>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="sub">Training path</p>
                <ol className="tsteps prv">
                  <li>
                    <b>MBBS</b>
                    <span>
                      <ConfirmChip />
                    </span>
                  </li>
                  <li>
                    <b>MS, General Surgery</b>
                    <span>
                      <ConfirmChip />
                    </span>
                  </li>
                  <li>
                    <b>MCh, CTVS</b>
                    <span>
                      <ConfirmChip />
                    </span>
                  </li>
                  <li>
                    <b>15+ years</b>
                    <span>Hospitals in several Indian cities</span>
                  </li>
                  <li>
                    <b>Penguin Hospital</b>
                    <span>Heart, lung and vascular surgery</span>
                  </li>
                </ol>
              </div>
              <dl className="kv prv">
                <dt>Registration</dt>
                <dd>
                  <ConfirmChip note="number and council" />
                </dd>
                <dt>Languages</dt>
                <dd>
                  <ConfirmChip />
                </dd>
                <dt>OPD</dt>
                <dd>
                  <ConfirmChip note="days and times" />
                </dd>
              </dl>
              <div className="prv">
                <p className="sub">He treats</p>
                <div className="treats">
                  {ASHISH_TREATS.map((t) => (
                    <Link key={t.label} href={t.href}>
                      <Ico n={t.icon} />
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pacts prv">
                <Link className="btn btn-navy" href="/book/?doctor=dr-ashish-baviskar">
                  <Ico n="cal" />
                  Book with Dr. Ashish
                </Link>
                <Link className="btn btn-ghost" href="/doctors/dr-ashish-baviskar/">
                  Full profile
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="band" style={{ background: "var(--white)" }}>
        <div className="wrap">
          <div className="prv" style={{ display: "grid", gap: 14, maxWidth: 760 }}>
            <p className="kicker">Around them</p>
            <h2 className="h-l">A team that joins in when you need it.</h2>
            <p className="lead">
              Visiting consultants work with our doctors when needed. Your own doctor arranges them
              and stays in charge of your care. <ConfirmChip note="names and roles" />
            </p>
          </div>
          <div className="team">
            <div className="tm prv">
              <i>
                <Ico n="syringe" />
              </i>
              <b>Anaesthesia</b>
              <p>For epidurals, caesarean births and surgery.</p>
            </div>
            <div className="tm prv">
              <i>
                <Ico n="baby" />
              </i>
              <b>Paediatrics</b>
              <p>Your newborn is checked soon after birth.</p>
            </div>
            <div className="tm prv">
              <i>
                <Ico n="walk" />
              </i>
              <b>Physiotherapy</b>
              <p>Getting moving again after surgery or birth.</p>
            </div>
            <div className="tm prv">
              <i>
                <Ico n="apple" />
              </i>
              <b>Nutrition</b>
              <p>Food plans for pregnancy, diabetes and the heart.</p>
            </div>
          </div>
          <div className="pct" style={{ marginTop: 72 }}>
            {together && (
              <Image
                src={together.src}
                alt="Dr. Lakshmi Vijay Kalbande and Dr. Ashish A. Baviskar at the hospital reception"
                fill
                sizes="(max-width: 900px) 100vw, 1160px"
                style={{ objectFit: "cover", objectPosition: "70% 30%" }}
              />
            )}
            <div className="in-c">
              <h2 className="h-l">Talk to a specialist, not a switchboard.</h2>
              <p style={{ color: "#C9D5E6" }}>
                Book a visit, call {site.phone.display} or message us on WhatsApp.
              </p>
              <div className="acts">
                <Link className="btn btn-coral" href="/book/">
                  <Ico n="cal" />
                  Book a visit
                </Link>
                <a className="btn btn-ghost" href={whatsappLink("a visit")}>
                  <Ico n="wa" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
