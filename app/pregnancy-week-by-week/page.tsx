import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Accordion } from "@/components/Accordion";
import { PcpndtLine, ReviewerBox, CtaBand } from "@/components/Callouts";
import { WeekTool } from "@/components/home/WeekTool";
import { ConfirmChip } from "@/components/Tag";
import { doctors } from "@/lib/doctors";

export const metadata: Metadata = {
  title: "Pregnancy week by week and due date calculator | Penguin Hospital",
  description:
    "Find your due date and see what happens in each week of pregnancy: your baby's size, the scans and tests due, and what you might feel. Reviewed by Dr. Lakshmi Kalbande.",
  alternates: { canonical: "https://penguinhospitals.com/pregnancy-week-by-week/" },
};

export default function WeekByWeek() {
  const doc = getPage("/pregnancy-week-by-week/")!;
  const faqs = doc.body.match(/###\s*FAQs?\s*\n([\s\S]*?)(?=\n#{2,3}\s|\[Reviewer|$)/)
    ? [...doc.body.matchAll(/^\d+\.\s+\*\*(.+?)\*\*\s*([\s\S]*?)(?=^\d+\.\s+\*\*|$)/gm)].map((m) => ({
        q: m[1].replace(/\*\*/g, "").trim(),
        a: m[2].trim(),
      }))
    : [];
  const introEnd = doc.body.search(/###\s*Stage by stage/);
  const { nodes: intro } = renderMarkdown(doc.body.slice(0, introEnd > 0 ? introEnd : undefined));
  const d = doctors[0];

  return (
    <article>
      <section className="chero tool-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Pregnancy week by week", href: "/pregnancy-week-by-week/" }]} />
          <h1>Your pregnancy, week by week</h1>
          <div className="intro">{intro}</div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <WeekTool />
          <div className="rev rv" style={{ marginTop: 24 }}>
            <img src={d.portrait} alt="" />
            <p>
              A general guide for healthy pregnancies. Dr. Lakshmi sets your own schedule after your
              first visit. Reviewed by <b>{d.name} {d.nameSoft}</b>.
            </p>
          </div>
          <PcpndtLine />
        </div>
      </section>
      <section className="sec white" aria-labelledby="faq-h">
        <div className="wrap">
          <div className="faqg">
            <div className="l">
              <span className="tag"><i></i>Quick answers</span>
              <h2 className="h2" id="faq-h">Questions about the weeks</h2>
            </div>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
      <CtaBand title="Book your first pregnancy visit." />
    </article>
  );
}
