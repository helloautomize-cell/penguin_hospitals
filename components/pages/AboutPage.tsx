import Image from "next/image";
import Link from "next/link";
import { PgIconDefs, Ico } from "@/components/icons/PgIcons";
import { PagesFx } from "@/components/pages/PagesFx";
import { PenguinScene } from "@/components/pages/PenguinScene";
import { BuildingTour } from "@/components/pages/BuildingTour";
import { ConfirmChip } from "@/components/Tag";

const H1 = "A family hospital, named after the most devoted parents we know";

const STORY = [
  {
    yr: "20__",
    img: "/images/doctors/dr-lakshmi-review.jpg",
    alt: "Dr. Lakshmi reviewing reports",
    b: "Training in obstetrics",
    t: "MBBS, then a DNB in obstetrics and gynaecology.",
    now: false,
  },
  {
    yr: "20__",
    img: "/images/pages/ultrasound-room.jpg",
    alt: "The ultrasound room",
    b: "A fellowship in scans",
    t: "Gynaecological and obstetric ultrasound, Bangalore.",
    now: false,
  },
  {
    yr: "20__",
    img: "/images/doctors/dr-lakshmi-corridor.jpg",
    alt: "Dr. Lakshmi in a hospital corridor",
    b: "Consultant in Telangana",
    t: "Amrutha Multi-specialty Hospital.",
    now: false,
  },
  {
    yr: "20__",
    img: "/images/real/real-facade.jpg",
    alt: "The Penguin Hospital entrance",
    b: "Penguin Hospital opens",
    t: "Chinchwad Gaon, with a labour room and theatre.",
    now: false,
  },
  {
    yr: "Today",
    img: "/images/doctors/dr-ashish-recovery.jpg",
    alt: "Dr. Ashish with a recovering patient",
    b: "Heart care joins in",
    t: "Dr. Ashish Baviskar brings heart, lung and vascular surgery.",
    now: true,
  },
];

export function AboutPage() {
  return (
    <div className="pgs">
      <PgIconDefs />
      <PagesFx />

      <section className="a-hero">
        <Image
          src="/images/doctors/doctors-together.jpg"
          alt="Dr. Lakshmi Vijay Kalbande and Dr. Ashish A. Baviskar at Penguin Hospital"
          fill
          priority
          sizes="100vw"
        />
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link> / About
          </p>
          {/* word spaces come from .w::after in CSS: whitespace-only text nodes
              between elements are stripped from the streamed HTML, so the gap is
              generated content instead. aria-label keeps the full sentence for SRs. */}
          <h1
            className="h-l"
            aria-label={H1}
            style={{ maxWidth: "22ch", fontSize: "clamp(40px,5.4vw,78px)" }}
          >
            {H1.split(" ").map((w, i) => (
              <span key={i} className="w" aria-hidden="true" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
                {w}
              </span>
            ))}
          </h1>
          <p className="lead">
            Run by two specialists in Chinchwad Gaon. We look after women through pregnancy and
            beyond, and families through problems of the heart.
          </p>
          <div className="strip">
            <span>
              <Ico n="pin" />
              Chinchwad Gaon, PCMC
            </span>
            <span>
              <Ico n="steth" />
              Two specialists
            </span>
            <span>
              <Ico n="moon" />
              Open day and night
            </span>
          </div>
        </div>
      </section>

      <PenguinScene />

      <section className="band">
        <div className="wrap">
          <p className="kicker">How care works here</p>
          <h2 className="h-l" style={{ marginTop: 12, maxWidth: "18ch" }}>
            Four promises you can see on your first visit.
          </h2>
          <div className="pbento">
            <div className="tile ph t1">
              <Image
                src="/images/doctors/dr-lakshmi-consult.jpg"
                alt="Dr. Lakshmi listening to a couple at her desk"
                fill
                sizes="(max-width: 900px) 100vw, 66vw"
              />
              <div className="tx">
                <h3>You see your specialist.</h3>
                <p>Your visits are with Dr. Lakshmi or Dr. Ashish, not handed down a chain.</p>
              </div>
            </div>
            <div className="tile ph t2">
              <Image
                src="/images/doctors/dr-ashish-consult.jpg"
                alt="Dr. Ashish explaining a heart model"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                style={{ objectPosition: "40% 50%" }}
              />
              <div className="bubble" aria-hidden="true">
                <span>What is this test for?</span>
                <span>Here is what it shows.</span>
                <span>And our choices?</span>
              </div>
              <div className="tx">
                <h3>Explained in plain words.</h3>
                <p>Before any test or operation. Bring your family. Questions are welcome.</p>
              </div>
            </div>
            <div className="tile t3">
              <div className="roof" aria-hidden="true">
                <div className="rm">
                  <i>
                    <Ico n="steth" />
                  </i>
                  Consult
                </div>
                <div className="rm">
                  <i>
                    <Ico n="scan" />
                  </i>
                  Scan
                </div>
                <div className="rm">
                  <i>
                    <Ico n="baby" />
                  </i>
                  Labour
                </div>
                <div className="rm">
                  <i>
                    <Ico n="knife" />
                  </i>
                  Theatre
                </div>
                <div className="rm">
                  <i>
                    <Ico n="bed" />
                  </i>
                  Ward
                </div>
              </div>
              <div className="roofline" />
              <div className="tx" style={{ position: "relative" }}>
                <h3>Under one roof.</h3>
                <p>
                  Consultation, ultrasound, the labour room, the theatre and the wards are in the
                  same building. You are not sent across the city between steps.
                </p>
              </div>
            </div>
            <div className="tile ph t4">
              <Image
                src="/images/pages/night-corridor.jpg"
                alt="The hospital corridor lit at night"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <div className="clockchip">
                <span className="t" data-clock>
                  --:--
                </span>
                <small>Emergency open</small>
              </div>
              <div className="tx">
                <h3>Open at night.</h3>
                <p>
                  The emergency team is here around the clock. Labour does not wait for office
                  hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band night">
        <div className="wrap">
          <p className="kicker">What the building holds</p>
          <h2 className="h-l" style={{ marginTop: 12, maxWidth: "18ch" }}>
            Tap a floor to look inside.
          </h2>
          <BuildingTour />
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="kicker">Facts at a glance</p>
          <div className="pglance">
            <div className="gl">
              <Ico n="steth" />
              <div className="n" data-count="2">
                0
              </div>
              <div className="l">Specialists who see you themselves</div>
            </div>
            <div className="gl">
              <Ico n="clock" />
              <div className="n">
                <span data-count="24">0</span>h
              </div>
              <div className="l">Emergency care, every day</div>
            </div>
            <div className="gl">
              <Ico n="bldg" />
              <div className="n" data-count="1">
                0
              </div>
              <div className="l">Building for consult, scan, birth and surgery</div>
            </div>
            <div className="gl">
              <Ico n="heart" />
              <div className="n">
                <span data-count="15">0</span>+
              </div>
              <div className="l">Years of heart surgery practice, Dr. Ashish</div>
            </div>
            <div className="gl">
              <Ico n="flag" />
              <div className="n" style={{ fontSize: 30, paddingTop: 12 }}>
                <ConfirmChip />
              </div>
              <div className="l">
                Year founded. Registration under the Maharashtra Nursing Homes Act{" "}
                <ConfirmChip />
              </div>
            </div>
          </div>

          <h2 className="h-l" style={{ marginTop: 100 }}>
            Our story
          </h2>
          <p className="lead" style={{ marginTop: 12 }}>
            Swipe the timeline. Years and wording come from the founders.{" "}
            <ConfirmChip note="all milestones" />
          </p>
          <div className="pstory" tabIndex={0} aria-label="Our story timeline">
            <ol>
              {STORY.map((s) => (
                <li key={s.b} className={s.now ? "now" : ""}>
                  <div className="yr">
                    {s.yr === "20__" ? (
                      <>
                        20<span style={{ opacity: 0.35 }}>__</span>
                      </>
                    ) : (
                      s.yr
                    )}
                  </div>
                  <div className="scard">
                    <Image
                      src={s.img}
                      alt={s.alt}
                      width={300}
                      height={188}
                      sizes="(max-width: 760px) 78vw, 300px"
                      style={{ width: "100%", height: "auto", aspectRatio: "16/10", objectFit: "cover" }}
                    />
                    <div>
                      <b>{s.b}</b>
                      {s.t}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="band" style={{ background: "var(--white)" }}>
        <div className="wrap faql">
          <div className="faside">
            <p className="kicker">Questions</p>
            <h2 className="h-l">Asked at the front desk.</h2>
            <div className="faph">
              <Image
                src="/images/pages/faqs.jpg"
                alt="The front desk team on a call"
                fill
                sizes="(max-width: 820px) 100vw, 42vw"
                style={{ objectPosition: "50% 25%" }}
              />
            </div>
          </div>
          <div>
            <details open>
              <summary>
                Who owns and runs Penguin Hospital?<i />
              </summary>
              <p>
                The hospital is led by Dr. Lakshmi Vijay Kalbande, obstetrician and gynaecologist,
                together with Dr. Ashish A. Baviskar, cardiothoracic and vascular surgeon.{" "}
                <ConfirmChip note="ownership wording" /> Both see patients themselves.
              </p>
            </details>
            <details>
              <summary>
                Is Penguin Hospital only for women?<i />
              </summary>
              <p>
                No. Women&apos;s health and pregnancy are one half of what we do. The other half is
                heart, lung and vascular surgery for adults of any gender. Our emergency team sees
                anyone who needs urgent help.
              </p>
            </details>
            <details>
              <summary>
                Can my family stay with me?<i />
              </summary>
              <p>
                One family member can usually stay with an admitted patient. In the labour room and
                theatre, the team will tell you when a companion can be present.{" "}
                <ConfirmChip note="visitor rules" />
              </p>
            </details>
            <details>
              <summary>
                Is the hospital open at night?<i />
              </summary>
              <p>
                Yes. Emergency care is available day and night, including for women in labour. OPD
                consultations run at set hours, shown on the visit page.
              </p>
            </details>
            <div className="reviewer">
              <Image
                src="/images/doctors/dr-lakshmi-headshot.jpg"
                alt=""
                width={44}
                height={44}
                style={{ objectPosition: "50% 20%" }}
              />
              <span>
                Medically reviewed by <b>Dr. Lakshmi Vijay Kalbande</b>.{" "}
                <ConfirmChip note="date" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
