import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Phone, Plus, TriangleAlert } from "lucide-react";
import type { PageDoc } from "@/lib/content";
import { renderBlocks, renderMarkdown, inline, type Block } from "@/lib/markdown";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ConfirmChip, Tag } from "@/components/Tag";
import { ServiceCard } from "@/components/Cards";
import { ServiceBadge } from "@/components/badges/ServiceBadge";
import { Icon } from "@/components/icons/Icons";
import { Accordion } from "@/components/Accordion";
import { ChatFaq } from "@/components/ChatFaq";
import { EmergencyCallout, ReviewerBox, CtaBand, PcpndtLine, DocBand } from "@/components/Callouts";
import { BigDocCard, DoctorCard } from "@/components/DoctorCard";
import { StepTracker } from "@/components/StepTracker";
import { doctors } from "@/lib/doctors";
import { site } from "@/lib/site-config";
import { doctorFor } from "@/lib/booking-context";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { allPages } from "@/lib/content";

const PREGNANCY = /pregnancy|delivery|postnatal|preeclampsia|scan|week|lab|newborn|fertility|pap|termination|obstetrics|gynaecology|pcos|periods|fibroids|cysts|endometriosis|menopause|laparoscopic/;

function crumbsFor(url: string) {
  const parts = url.split("/").filter(Boolean);
  return parts.slice(0, -1).map((p, i) => ({
    label: p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: "/" + parts.slice(0, i + 1).join("/") + "/",
  }));
}

function titleSlug(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Map a card title to a real page URL by fuzzy matching content pages. */
function pageFor(title: string, pages: PageDoc[]): string | undefined {
  const t = title.toLowerCase().replace(/[^a-z]/g, "");
  const hit = pages.find((p) => {
    const u = p.url.replace(/\//g, "").replace(/-/g, "");
    return u === t || u.includes(t) || t.includes(u.slice(0, 12));
  });
  return hit?.url;
}

function HiddenBanner() {
  return (
    <div className="bg-confirm-bg px-4 py-2 text-center text-[13px] font-semibold text-confirm-ink">
      Hidden page — visible in development and preview only. Not linked, not in the sitemap, 404 in
      production.
    </div>
  );
}

function FaqSection({ faqs, id = "faq-h" }: { faqs: { q: string; a: string }[]; id?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="sec white" aria-labelledby={id}>
      <div className="wrap">
        <div className="faqg">
          <div className="l">
            <Tag>Quick answers</Tag>
            <h2 className="h2" id={id}>
              Questions patients ask
            </h2>
            <div className="askcard">
              <p>
                Did not find your question? Ask us on WhatsApp. Please do not send detailed medical
                information in a message.
              </p>
              <a className="btn btn-wa" href={whatsappLink("a question")}>
                <WhatsAppIcon className="ico" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <Accordion items={faqs} />
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
            })),
          }),
        }}
      />
    </section>
  );
}

function RelatedCards({ related, doc }: { related: string[]; doc: PageDoc }) {
  const pages = allPages();
  const items = related
    .map((r) => {
      const p = pages.find((x) => x.url === `/${r}/`);
      return p ? { href: p.url, title: p.title.split("|")[0].trim(), text: p.description ?? "" } : null;
    })
    .filter(Boolean) as { href: string; title: string; text: string }[];
  if (!items.length) return null;
  return (
    <section className="sec" aria-labelledby="rel-h">
      <div className="wrap">
        <div className="shead">
          <div className="l">
            <Tag>Related care</Tag>
            <h2 className="h2" id="rel-h">
              Next on your <span className="soft">journey.</span>
            </h2>
          </div>
        </div>
        <div className="cards">
          {items.slice(0, 6).map((c, i) => (
            <ServiceCard key={c.href} href={c.href} title={c.title} text={c.text} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviewer({ doc }: { doc: PageDoc }) {
  if (doc.reviewer === null) return null;
  const docSlug = doctorFor(doc.url);
  const d = docSlug ? doctors.find((x) => x.slug === docSlug) : undefined;
  const name = d ? `${d.name} ${d.nameSoft}` : (doc.reviewer ?? "the Penguin Hospital team");
  return (
    <section className="sec tight white" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <ReviewerBox
          name={name}
          qualifications={d?.role ?? ""}
          lastReviewed={<ConfirmChip note="on sign-off" />}
          portrait={d?.portrait}
        />
      </div>
    </section>
  );
}

/** Render parsed blocks into preview markup (.prose sections and block components). */
function Prose({ blocks }: { blocks: Block[] }) {
  const out: React.ReactNode[] = [];
  let sec: { id: string; title: string; children: React.ReactNode[] } | null = null;
  const pages = allPages();
  const close = () => {
    if (sec && (sec.title ? true : sec.children.length))
      out.push(
        <section key={sec.id} id={sec.id} className="rv">
          <h2>{sec.title}</h2>
          {sec.children}
        </section>,
      );
    sec = null;
  };
  blocks.forEach((b, i) => {
    const put = (n: React.ReactNode) => {
      if (!sec) sec = { id: `s-${i}`, title: "", children: [] };
      sec.children.push(n);
    };
    switch (b.kind) {
      case "h2":
        close();
        sec = { id: b.id, title: b.title, children: [] };
        break;
      case "p":
        put(<p key={i}>{b.nodes}</p>);
        break;
      case "ul":
        put(
          <ul key={i}>
            {b.items.map((it, k) => (
              <li key={k}>{it}</li>
            ))}
          </ul>,
        );
        break;
      case "ol":
        put(
          <ol key={i}>
            {b.items.map((it, k) => (
              <li key={k}>{it}</li>
            ))}
          </ol>,
        );
        break;
      case "tri":
        put(
          <div className="tri" key={i}>
            {b.rows.map((r, k) => (
              <div key={k}>
                <b>{r.b}</b>
                <p>{r.p}</p>
              </div>
            ))}
          </div>,
        );
        break;
      case "callem":
        put(
          <div className="callem" role="note" key={i}>
            <TriangleAlert className="ico" aria-hidden="true" />
            <p>{b.nodes}</p>
          </div>,
        );
        break;
      case "pcp":
        put(<PcpndtLine key={i} />);
        break;
      case "cards":
        close();
        out.push(
          <div className="grp" key={i}>
            {b.group ? (
              <h3>
                <b>{String(i).padStart(2, "0")}</b>
                {b.group}
              </h3>
            ) : null}
            <div className="cards">
              {b.cards.map((c, k) => (
                <ServiceCard
                  key={c.title}
                  href={pageFor(c.title, pages) ?? "/services/"}
                  title={c.title}
                  text={c.text}
                  delay={(k % 4) * 0.06}
                />
              ))}
            </div>
          </div>,
        );
        break;
      case "steps":
        close();
        out.push(
          <section className="sec white" key={i}>
            <div className="wrap">
              <StepTracker steps={b.steps} />
            </div>
          </section>,
        );
        break;
      case "facts":
        close();
        out.push(
          <section className="sec tight" key={i}>
            <div className="wrap">
              <div className="facts rv">
                {b.items.map((f) => (
                  <div key={f}>
                    <Plus className="ico" aria-hidden="true" />
                    <b>{f}</b>
                  </div>
                ))}
              </div>
            </div>
          </section>,
        );
        break;
      case "chips":
        put(
          <div className="chips" key={i}>
            {b.items.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>,
        );
        break;
      case "tl":
        put(
          <ol className="tl" key={i}>
            {b.items.map((t, k) => (
              <li key={k}>{t}</li>
            ))}
          </ol>,
        );
        break;
      case "rooms":
        put(
          <div className="rooms" key={i}>
            {["operation-theatre", "ultrasound-room", "labour-room", "general-ward"].map((r) => (
              <figure key={r}>
                <img src={`/images/clinic/${r}.jpg`} alt={r.replace(/-/g, " ") + " at Penguin Hospital"} loading="lazy" />
                <figcaption>{r.replace(/-/g, " ")}</figcaption>
              </figure>
            ))}
          </div>,
        );
        break;
      case "confirm":
        put(
          <p key={i}>
            <ConfirmChip note={b.text || undefined} />
          </p>,
        );
        break;
      default:
        break;
    }
  });
  close();
  return <>{out}</>;
}

/* ================= templates ================= */

/** Service page (.chero + .art/.toc/.prose + .faqg + related + .cta). */
export function PageTemplate({ doc }: { doc: PageDoc }) {
  const { intro, blocks, faqs, h1 } = renderBlocks(doc.body);
  const isPreg = PREGNANCY.test(doc.url);
  const docSlug = doctorFor(doc.url);
  const d = (docSlug ? doctors.find((x) => x.slug === docSlug) : doctors[0])!;
  const toc = blocks.filter((b) => b.kind === "h2") as { kind: "h2"; id: string; title: string }[];

  return (
    <article>
      {doc.hidden ? <HiddenBanner /> : null}
      <section className="chero">
        <div className="wrap">
          <div className="g">
            <div>
              <Breadcrumbs items={crumbsFor(doc.url)} />
              {doc.badge ? <ServiceBadge slug={doc.badge} size="lg" /> : null}
              <h1>{h1 || doc.title.split("|")[0].trim()}</h1>
              <p className="intro">{intro}</p>
              <div className="ctas">
                <Link className="btn btn-navy" href={`/book/?from=${encodeURIComponent(doc.url)}`}>
                  <CalendarDays className="ico" aria-hidden="true" />
                  Book a visit
                </Link>
                <a className="btn btn-wa" href={whatsappLink(doc.url)}>
                  <WhatsAppIcon className="ico" />
                  WhatsApp
                </a>
              </div>
              <div className="meta">
                <span>
                  <img src={d.portrait} alt="" />
                  Reviewed by {d.name} {d.nameSoft}
                </span>
              </div>
            </div>
            <div className="cimg">
              <img src="/images/clinic/ultrasound-room.jpg" alt="Inside Penguin Hospital" />
              <div className="chip">
                <span>
                  <b>All under one roof</b>
                  Consultation, scans, labour room and theatre in the same building.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec white" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
        <div className="wrap">
          <div className="art">
            <aside className="toc">
              <nav aria-label="On this page">
                {toc.map((s) => (
                  <a key={s.id} href={`#${s.id}`}>
                    {s.title}
                  </a>
                ))}
                {faqs.length ? <a href="#faq-h">Questions</a> : null}
              </nav>
              <div className="bk">
                <b>Want to see {d.name.split(" ")[1] ?? "the doctor"}?</b>
                <small>Tell us what it is about, and we will give you the right slot.</small>
                <Link className="btn btn-coral" href="/book/">
                  Book a visit
                </Link>
              </div>
            </aside>
            <div className="prose">
              <Prose blocks={blocks} />
            </div>
          </div>
        </div>
      </section>
      <FaqSection faqs={faqs} />
      {isPreg ? null : null}
      {doc.related ? <RelatedCards related={doc.related} doc={doc} /> : null}
      <Reviewer doc={doc} />
      <CtaBand />
    </article>
  );
}

/** Hub (.phero/.win + .grp/.cards + .steps + .facts + .docband + .faqg + .rev + .cta). */
export function HubTemplate({ doc }: { doc: PageDoc }) {
  const { intro, blocks, faqs, h1 } = renderBlocks(doc.body);
  const isWomen = doc.url.includes("obstetrics") || doc.url.includes("gynaecology") || doc.url.includes("services");
  const d = doctors[isWomen ? 0 : 1];
  const heroImg = isWomen ? "/images/services/pregnant-window.jpg" : "/images/services/heart-grandfather.jpg";

  return (
    <article>
      <section className="phero">
        <div className="wrap">
          <div className="win" style={{ "--mp": "50% 18%" } as React.CSSProperties}>
            <img src={heroImg} alt="" fetchPriority="high" style={{ objectPosition: "50% 18%" }} />
            <div className="in">
              <div className="copy">
                <Breadcrumbs items={crumbsFor(doc.url)} dark />
                <Tag dark>{isWomen ? "Women and pregnancy" : "Heart and vessels"}</Tag>
                <h1>{h1 || doc.title.split("|")[0].trim()}</h1>
                <p className="intro">{intro}</p>
                <div className="ctas">
                  <Link className="btn btn-coral" href={`/book/?doctor=${d.slug}`}>
                    <CalendarDays className="ico" aria-hidden="true" />
                    Book with {d.name.split(" ")[1]}
                  </Link>
                  <a className="btn btn-glass" href={`tel:${site.phone.tel}`}>
                    <Phone className="ico" aria-hidden="true" />
                    {site.phone.nationalDisplay}
                  </a>
                </div>
              </div>
              <div className="gcard">
                <img src={d.portrait} alt="" />
                <div>
                  <b>
                    Led by {d.name} {d.nameSoft}
                  </b>
                  <small>{d.role}</small>
                </div>
                <Link href={d.profileHref}>
                  View profile <ArrowRight className="ico" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec" aria-labelledby="svc-h">
        <div className="wrap">
          <div className="shead">
            <div className="l">
              <Tag>How we can help</Tag>
              <h2 className="h2" id="svc-h">
                Care for every chapter,{" "}
                <span className="soft">{isWomen ? "from first period to menopause." : "from check-up to surgery."}</span>
              </h2>
            </div>
            <p className="lede">
              Choose a topic to see what happens at Penguin Hospital, how to prepare, and when to
              come in straight away.
            </p>
          </div>
          <Prose blocks={blocks} />
        </div>
      </section>
      <section className="sec tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <DocBand doctorIndex={isWomen ? 0 : 1} />
        </div>
      </section>
      <FaqSection faqs={faqs} />
      <Reviewer doc={doc} />
      <CtaBand />
    </article>
  );
}

/** Doctors hub (.ahead + .bigdocs). */
export function DoctorsHubTemplate({ doc }: { doc: PageDoc }) {
  const { h1, intro } = renderBlocks(doc.body);
  return (
    <article>
      <section className="chero">
        <div className="wrap">
          <div className="ahead">
            <div>
              <Breadcrumbs items={crumbsFor(doc.url)} />
              <h1>{h1 || "Our doctors"}</h1>
            </div>
            <p className="intro">{intro}</p>
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="bigdocs">
            <BigDocCard doctor={doctors[0]} />
            <BigDocCard doctor={doctors[1]} />
          </div>
          <p className="fnote" style={{ marginTop: 24 }}>
            Visiting consultants in anaesthesia, paediatrics and other fields work with our team when
            needed. <ConfirmChip note="names and roles if the client wants them listed" />
          </p>
        </div>
      </section>
      <CtaBand />
    </article>
  );
}

/** Doctor profile (.dhero/.kf + .two/.prin + .tl + .cg + .faqg). */
export function DoctorTemplate({ doc }: { doc: PageDoc }) {
  const { blocks, faqs, h1, intro } = renderBlocks(doc.body);
  const d = doctors.find((x) => doc.url.includes(x.slug)) ?? doctors[0];
  return (
    <article>
      <section className="dhero">
        <div className="wrap">
          <div className="g">
            <div className="ph">
              <img src={d.portrait} alt={`${d.name} ${d.nameSoft}`} />
              <span className="confirm">CONFIRM: new portrait</span>
              <span className="nm">{d.marginNote.replace(/\.$/, "")}</span>
            </div>
            <div>
              <Breadcrumbs items={crumbsFor(doc.url)} />
              <h1>
                {d.name} {d.nameSoft}
              </h1>
              <p className="role">{d.role}</p>
              <div className="kf">
                {d.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>
                      {f.value} {f.confirm ? <ConfirmChip note={f.confirm} /> : null}
                    </dd>
                  </div>
                ))}
              </div>
              <div className="ctas">
                <Link className="btn btn-coral" href={`/book/?doctor=${d.slug}`}>
                  <CalendarDays className="ico" aria-hidden="true" />
                  {d.bookingLabel}
                </Link>
                <a className="btn btn-line" href={whatsappLink(doc.url)}>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="prose" style={{ maxWidth: "72ch" }}>
            <Prose blocks={blocks} />
          </div>
        </div>
      </section>
      <FaqSection faqs={faqs} />
      <CtaBand title={`Book with ${d.name} ${d.nameSoft}.`} />
    </article>
  );
}

/** Form page (.chero + .bookg/.form + .side). */
export function FormTemplate({
  doc,
  doctor,
  reason,
}: {
  doc: PageDoc;
  doctor?: string;
  reason?: string;
}) {
  const { h1, intro } = renderBlocks(doc.body);
  return (
    <article>
      <section className="chero">
        <div className="wrap">
          <Breadcrumbs items={crumbsFor(doc.url)} />
          <h1>{h1 || doc.title.split("|")[0].trim()}</h1>
          <p className="intro">{intro}</p>
          <div className="alertline">
            <TriangleAlert className="ico" aria-hidden="true" />
            <span>
              This form is not for emergencies. If you or someone with you is very unwell, call 108 or
              112, or come straight to our emergency entrance.
            </span>
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="bookg">
            <AppointmentForm
              type={doc.url === "/contact/" ? "contact" : "appointment"}
              defaultDoctor={doctor ?? ""}
              defaultReason={reason ?? ""}
              source={doc.url}
            />
            <div className="side">
              <div className="card">
                <b>What happens next</b>
                <p>
                  We confirm your slot by call or WhatsApp, usually within a few working hours{" "}
                  <ConfirmChip />. You get the date, time and doctor in writing.
                </p>
              </div>
              <div className="card">
                <b>What to bring</b>
                <p>
                  Previous reports and scans, a list of your medicines, your ID and insurance card if
                  you have one. If you are pregnant, bring your pregnancy file.
                </p>
              </div>
              <div className="contactc">
                <div className="r">
                  <small>Call or WhatsApp</small>
                  <a href={`tel:${site.phone.tel}`}>
                    <b>{site.phone.display}</b>
                  </a>
                </div>
                <div className="r">
                  <small>Emergency</small>
                  <b>Open day and night</b>
                </div>
                <div className="r">
                  <small>Find us</small>
                  <b>Chinchwad Gaon, Pimpri-Chinchwad</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

/** Emergency page (.phero/.win + .signs + .way + .two + .faqg). */
export function EmergencyTemplate({ doc }: { doc: PageDoc }) {
  const { intro, blocks, faqs, h1 } = renderBlocks(doc.body);
  const signs = [
    {
      t: "In pregnancy", icon: "bump" as const,
      items: [
        "Bleeding from the vagina, at any stage",
        "Water breaking, or a gush or steady leak of fluid",
        "Regular, painful contractions before 37 weeks",
        "Your baby moving less than usual, or not at all",
        "A bad headache, blurred vision, or sudden swelling of the face and hands",
        "Fits (seizures), fainting or severe tummy pain",
      ],
    },
    {
      t: "After birth", icon: "baby" as const,
      items: [
        "Heavy bleeding that soaks a pad in an hour, or large clots",
        "Fever, or a wound that is red, hot or leaking",
        "Pain or swelling in one leg, or breathlessness",
      ],
    },
    {
      t: "Heart and chest", icon: "heart" as const,
      items: [
        "Chest pain or pressure lasting more than a few minutes, especially with sweating, sickness, or pain in the arm, jaw or back",
        "Sudden breathlessness",
        "Fainting, or a very fast or irregular heartbeat",
        "A cold, pale, painful leg",
      ],
    },
    {
      t: "Anyone", icon: "alert" as const,
      items: [
        "Signs of stroke: face drooping, arm weakness, slurred speech",
        "Serious injury, heavy bleeding, or someone who cannot be woken",
      ],
    },
  ];
  return (
    <article className="em-page">
      <div className="ebar">
        Medical emergency? Call <a href="tel:108">108</a> or <a href="tel:112">112</a> first.
      </div>
      <section className="phero">
        <div className="wrap">
          <div className="win" style={{ "--mp": "55% 40%" } as React.CSSProperties}>
            <img src="/images/hero/night-corridor.jpg" alt="" fetchPriority="high" />
            <div className="in">
              <div className="copy">
                <Breadcrumbs items={crumbsFor(doc.url)} dark />
                <Tag dark>
                  <i style={{ background: "#FF6B63" }}></i>Open day and night
                </Tag>
                <h1>{h1 || "Emergency care, day and night"}</h1>
                <p className="intro">{intro}</p>
                <div className="bigcalls">
                  <a href="tel:108">
                    <small>Ambulance</small>
                    <b>108</b>
                  </a>
                  <a href="tel:112">
                    <small>Emergency</small>
                    <b>112</b>
                  </a>
                  <a href={`tel:${site.phone.tel}`}>
                    <small>Then call us</small>
                    <b>{site.phone.display}</b>
                  </a>
                </div>
              </div>
              <div className="gcard">
                <b>Coming in labour?</b>
                <small>
                  Come straight to the hospital and call us on the way so the labour team is ready.
                  Never delay to get through on the phone.
                </small>
                <a href={site.googleMapsUrl}>
                  Get directions <ArrowRight className="ico" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="shead">
            <div className="l">
              <Tag>
                <i style={{ background: "var(--alert)" }}></i>Do not wait
              </Tag>
              <h2 className="h2">
                Come straight in, or call 108, <span className="soft">if you notice:</span>
              </h2>
            </div>
            <p className="lede">
              These signs need a doctor now, not an appointment. If you are not sure, call us and ask.
            </p>
          </div>
          <div className="signs">
            {signs.map((s, i) => (
              <article className="sign rv" key={s.t} style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                <header>
                  <span className="badge badge-sm" aria-hidden="true" style={{ width: 52, height: 52 }}>
                    <Icon name={s.icon} size={26} />
                  </span>
                  <h3>{s.t}</h3>
                </header>
                <ul>
                  {s.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="sec tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="way rv">
            <div>
              <Tag dark>On the way</Tag>
              <h2 className="h2" style={{ marginTop: 18 }}>
                Three things <span style={{ color: "var(--on-dark-2)" }}>to remember.</span>
              </h2>
            </div>
            <ol>
              <li>
                <span>Do not drive yourself if you have chest pain or are in strong labour.</span>
              </li>
              <li>
                <span>
                  Bring your reports, pregnancy file and medicines, but do not delay to find them.
                </span>
              </li>
              <li>
                <span>
                  If the person stops breathing, call 108 and start chest compressions if you know
                  how.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>
      <section className="sec white">
        <div className="wrap">
          <div className="two">
            <div>
              <Tag>What we can and cannot do</Tag>
              <h2 className="h2" style={{ marginTop: 18 }}>
                Honest about <span className="soft">our limits.</span>
              </h2>
            </div>
            <div className="txt rv">
              <p>
                We handle emergencies in pregnancy and birth, and heart, chest and vascular
                emergencies within our services. When a patient needs care we do not provide, such as
                major trauma <ConfirmChip />, we stabilise them and arrange transfer to the right
                hospital.
              </p>
              <div className="callem" role="note">
                <TriangleAlert className="ico" aria-hidden="true" />
                <p>
                  <b>Pregnancy, birth, heart, chest and vascular emergencies</b> are handled here,
                  day and night. For other emergencies we stabilise and arrange transfer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FaqSection faqs={faqs} />
    </article>
  );
}

/** Thank-you (.chero compact). */
export function ThankYouTemplate({ doc, type }: { doc: PageDoc; type?: string }) {
  const { nodes } = renderMarkdown(doc.body);
  return (
    <article>
      <section className="chero">
        <div className="wrap">
          <h1>
            Thank you{type === "appointment" ? ", your appointment request is in." : ", your message is in."}
          </h1>
          <p className="intro">
            We will call or message you to confirm. Received{" "}
            {new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              hour12: true,
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "2-digit",
            })}{" "}
            IST.
          </p>
          <div className="ctas">
            <Link className="btn btn-navy" href="/">
              Back to home
            </Link>
            <Link className="btn btn-line" href="/plan-your-visit/">
              Plan your visit
            </Link>
          </div>
          <div className="alertline">
            <TriangleAlert className="ico" aria-hidden="true" />
            <span>{site.emergencyLine}.</span>
          </div>
          <div className="prose" style={{ marginTop: 24 }}>
            {nodes}
          </div>
        </div>
      </section>
    </article>
  );
}

/** Grouped FAQ page (.chero + .fnav/.fgroups). */
export function FaqsTemplate({ doc }: { doc: PageDoc }) {
  const groups: { label: string; items: { q: string; a: string }[] }[] = [];
  for (const m of doc.body.matchAll(/\*\*([^*]+)\*\*\s*\n((?:-\s+\*[^\n]*\n?)+)/g)) {
    const items = [...m[2].matchAll(/^-\s+\*([^*]+)\*\s*(.*)$/gm)].map((x) => ({
      q: x[1].trim(),
      a: x[2].trim() || "Answer to follow.",
    }));
    if (items.length) groups.push({ label: m[1].trim(), items });
  }
  const { h1, intro } = renderBlocks(doc.body);
  const all = groups.flatMap((g) => g.items);
  return (
    <article>
      <section className="chero">
        <div className="wrap">
          <Breadcrumbs items={crumbsFor(doc.url)} />
          <h1>{h1 || "Questions and answers"}</h1>
          <p className="intro">{intro}</p>
        </div>
      </section>
      <section className="sec white" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
        <div className="wrap">
          <div className="art">
            <aside className="toc fnav">
              <nav aria-label="Question groups">
                {groups.map((g) => (
                  <a key={g.label} href={`#${titleSlug(g.label)}`}>
                    {g.label}
                    <small>{g.items.length}</small>
                  </a>
                ))}
              </nav>
              <div className="bk">
                <b>Did not find your question?</b>
                <small>Ask us on WhatsApp. Please do not send detailed medical information.</small>
                <a className="btn btn-wa" href={whatsappLink("a question")}>
                  Ask on WhatsApp
                </a>
              </div>
            </aside>
            <div className="fgroups">
              {groups.map((g) => (
                <div className="fgroup" id={titleSlug(g.label)} key={g.label}>
                  <h2>{g.label}</h2>
                  <Accordion items={g.items} />
                </div>
              ))}
              <PcpndtLine />
            </div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: all.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
            })),
          }),
        }}
      />
    </article>
  );
}

/** About / info pages (.ahero + prose blocks). */
export function InfoTemplate({ doc }: { doc: PageDoc }) {
  const { blocks, faqs, h1, intro } = renderBlocks(doc.body);
  return (
    <article>
      <section className="ahero">
        <div className="wrap">
          <Breadcrumbs items={crumbsFor(doc.url)} />
          <h1>{h1 || doc.title.split("|")[0].trim()}</h1>
          <div className="g">
            <p className="intro">{intro}</p>
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="prose">
            <Prose blocks={blocks} />
          </div>
        </div>
      </section>
      <FaqSection faqs={faqs} />
      <Reviewer doc={doc} />
      <CtaBand />
    </article>
  );
}

/** Legal pages (.legal-hero + .legal-body). */
export function LegalTemplate({ doc }: { doc: PageDoc }) {
  const { blocks, h1, intro } = renderBlocks(doc.body);
  return (
    <article>
      <section className="chero legal-hero">
        <div className="wrap">
          <Breadcrumbs items={crumbsFor(doc.url)} />
          <h1>{h1 || doc.title.split("|")[0].trim()}</h1>
          <div className="lmeta">
            <span>Last updated {site.legalLastUpdated}</span>
            <span>
              <ConfirmChip note="legal review pending" />
            </span>
          </div>
          {intro ? <p className="intro">{intro}</p> : null}
        </div>
      </section>
      <section className="sec white" style={{ paddingTop: "clamp(32px,4vw,56px)" }}>
        <div className="wrap">
          <div className="prose legal-body">
            <Prose blocks={blocks} />
          </div>
        </div>
      </section>
    </article>
  );
}
