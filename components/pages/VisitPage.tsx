import Image from "next/image";
import Link from "next/link";
import { PgIconDefs, Ico } from "@/components/icons/PgIcons";
import { PagesFx } from "@/components/pages/PagesFx";
import { VisitHScroll } from "@/components/pages/VisitHScroll";
import { PackingList } from "@/components/pages/PackingList";
import { HoursWeek } from "@/components/pages/HoursWeek";
import { MapSection } from "@/components/pages/MapSection";
import { InsuranceCard } from "@/components/pages/InsuranceCard";
import { ConfirmChip } from "@/components/Tag";

const ADM = [
  {
    img: "/images/pages/general-ward.jpg",
    alt: "The general ward with curtained beds",
    icon: "file",
    b: "Before admission",
    p: (
      <>
        The desk explains the room options and gives an estimate of costs before you are admitted.{" "}
        <ConfirmChip note="room types" />
      </>
    ),
  },
  {
    img: "/images/pages/postnatal-care.jpg",
    alt: "A mother resting with her newborn",
    icon: "people",
    b: "One family member stays",
    p: (
      <>
        One companion can usually stay with you. In the labour room and theatre, the team tells you
        when. <ConfirmChip />
      </>
    ),
  },
  {
    img: "/images/doctors/dr-ashish-recovery.jpg",
    alt: "Dr. Ashish walking with a recovering patient",
    icon: "check",
    b: "Going home",
    p: (
      <>
        You get a discharge summary, your medicines and a follow-up date. Keep the summary safe;
        your future doctors will ask for it.
      </>
    ),
  },
];

export function VisitPage() {
  return (
    <div className="pgs">
      <PgIconDefs />
      <PagesFx />

      <div className="wrap v-hero">
        <div className="txt">
          <p className="crumb">
            <Link href="/">Home</Link> / Plan your visit
          </p>
          <h1 className="h-xl">Plan your visit</h1>
          <p className="lead">
            A little planning makes your visit shorter and calmer. What to bring, when to come, and
            what happens if you are admitted.
          </p>
          <div className="status">
            <span className="t" data-clock>
              --:--
            </span>
            <div className="rows">
              <span id="opdState">OPD open now</span>
              <span>Emergency open, day and night</span>
            </div>
          </div>
          <nav className="jump" aria-label="On this page">
            <a href="#v-first">
              <Ico n="clock" />
              Your first visit
            </a>
            <a href="#v-pack">
              <Ico n="file" />
              What to bring
            </a>
            <a href="#v-hours">
              <Ico n="cal" />
              Hours
            </a>
            <a href="#v-map">
              <Ico n="pin" />
              Getting here
            </a>
            <a href="#v-adm">
              <Ico n="bed" />
              If admitted
            </a>
            <a href="#v-ins">
              <Ico n="shield" />
              Insurance
            </a>
          </nav>
        </div>
        <div className="v-photo">
          <div className="main">
            <Image
              src="/images/real/real-reception.jpg"
              alt="The Penguin Hospital reception desk with the hospital logo"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />
            <span className="realtag">Real photo</span>
          </div>
          <div className="ticket">
            <svg viewBox="0 0 62 62" aria-hidden="true">
              <circle cx="31" cy="31" r="28" fill="none" stroke="#E7EEF8" strokeWidth="6" />
              <circle className="arc" cx="31" cy="31" r="28" transform="rotate(-90 31 31)" />
              <text
                x="31"
                y="37"
                textAnchor="middle"
                fontFamily="Instrument Serif"
                fontSize="20"
                fill="#001F43"
              >
                1h
              </text>
            </svg>
            <div>
              <b>A first visit takes about an hour</b>
              <span>Registration, checks, your doctor, and often a scan the same day.</span>
            </div>
          </div>
        </div>
      </div>

      <VisitHScroll />

      <section className="band" id="v-pack">
        <div className="wrap">
          <p className="kicker">What to bring</p>
          <h2 className="h-l" style={{ marginTop: 12, maxWidth: "18ch" }}>
            Pack the bag. Tick as you go.
          </h2>
          <PackingList />
        </div>
      </section>

      <section className="band night" id="v-hours">
        <div className="wrap hours">
          <div style={{ display: "grid", gap: 18 }}>
            <p className="kicker">When to come</p>
            <h2 className="h-l">The lights are on more often than not.</h2>
            <p className="lead">
              OPD Monday to Saturday, and a short Sunday evening session. Emergency is open every
              hour of every day, including for women in labour.
            </p>
            <p style={{ color: "#9DB0CC", fontSize: "14.5px" }}>
              Hours below follow the Google profile.{" "}
              <ConfirmChip note="OPD hours and per-doctor timings" />
            </p>
          </div>
          <div>
            <HoursWeek />
            <div className="legend">
              <span>
                <i />
                OPD open
              </span>
              <span>
                <i className="c" />
                Emergency, always
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="band" id="v-map">
        <div className="wrap">
          <p className="kicker">Getting here</p>
          <h2 className="h-l" style={{ marginTop: 12, maxWidth: "18ch" }}>
            Where are you coming from?
          </h2>
          <MapSection />
        </div>
      </section>

      <section className="band" id="v-adm" style={{ background: "var(--white)" }}>
        <div className="wrap">
          <p className="kicker">If you are admitted</p>
          <h2 className="h-l" style={{ marginTop: 12, maxWidth: "18ch" }}>
            No surprises, from admission to going home.
          </h2>
          <div className="adm">
            {ADM.map((c) => (
              <article className="acard prv" key={c.b}>
                <div className="im">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 860px) 100vw, 33vw"
                  />
                  <span className="abadge">
                    <Ico n={c.icon} />
                  </span>
                </div>
                <div className="tx">
                  <b>{c.b}</b>
                  <p>{c.p}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" id="v-ins" style={{ background: "var(--white)", paddingTop: 0 }}>
        <div className="wrap ins">
          <InsuranceCard />
          <div>
            <p className="kicker">Insurance and payment</p>
            <h2 className="h-l" style={{ marginTop: 12 }}>
              Know before you are admitted.
            </h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Many patients use health insurance with us. Our desk tells you before admission which
              way your policy works here.
            </p>
            <div className="paths">
              <div>
                <i>
                  <Ico n="shield" />
                </i>
                <p>
                  <b>Cashless</b>
                  <span>The insurer settles the bill with the hospital directly.</span>
                </p>
              </div>
              <div>
                <i>
                  <Ico n="card" />
                </i>
                <p>
                  <b>Reimbursement</b>
                  <span>You pay, then claim back from your insurer with our papers.</span>
                </p>
              </div>
            </div>
            <p style={{ fontSize: 14, marginTop: 14 }}>
              <ConfirmChip note="TPA and insurer panel, payment modes" />
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap faql">
          <div className="faside">
            <p className="kicker">Questions</p>
            <h2 className="h-l">Before you leave home.</h2>
            <div className="faph">
              <Image
                src="/images/pages/book.jpg"
                alt="A woman messaging the hospital on her phone"
                fill
                sizes="(max-width: 820px) 100vw, 42vw"
                style={{ objectPosition: "50% 30%" }}
              />
            </div>
          </div>
          <div>
            <details open>
              <summary>
                How long does a first visit take?<i />
              </summary>
              <p>
                Plan for about an hour, including registration, checks and any scan done the same
                day. Visits are longer if blood tests or a scan are needed. Follow-up visits are
                usually shorter.
              </p>
            </details>
            <details>
              <summary>
                Can I get my scan on the same day?<i />
              </summary>
              <p>
                Often, yes. Our ultrasound room is next to the consultation room. Some scans need a
                full bladder or a specific week of pregnancy, and the team will tell you when.
              </p>
            </details>
            <details>
              <summary>
                Is there a pharmacy?<i />
              </summary>
              <p>
                Yes. Penguin Pharmacy is part of the hospital, so you can collect your medicines
                before you leave. <ConfirmChip note="pharmacy hours" />
              </p>
            </details>
            <details>
              <summary>
                Can children visit an admitted patient?<i />
              </summary>
              <p>
                <ConfirmChip note="visiting rules" /> To protect newborns and patients after
                surgery, we may limit visitors at times.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
