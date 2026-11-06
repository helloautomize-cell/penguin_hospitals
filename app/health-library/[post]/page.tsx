import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { allPosts, allPages } from "@/lib/content";
import { renderMarkdown, renderBlocks, inline } from "@/lib/markdown";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ConfirmChip, Tag } from "@/components/Tag";
import { Accordion } from "@/components/Accordion";
import { PcpndtLine, ReviewerBox, CtaBand } from "@/components/Callouts";
import { ServiceCard } from "@/components/Cards";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";
import { doctors } from "@/lib/doctors";
import { site } from "@/lib/site-config";

export function generateStaticParams() {
  return allPosts().map((p) => ({ post: p.url.split("/").filter(Boolean).pop()! }));
}

export async function generateMetadata({ params }: { params: Promise<{ post: string }> }): Promise<Metadata> {
  const { post } = await params;
  const doc = allPosts().find((p) => p.url.endsWith(post + "/"));
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `https://penguinhospitals.com${doc.url}` },
  };
}

function authorOf(doc: { author?: string }) {
  return (
    doctors.find((d) => doc.author?.includes(d.nameSoft.split(" ")[0]) || doc.author?.includes(d.name.split(" ")[1])) ??
    doctors[0]
  );
}

export default async function PostPage({ params }: { params: Promise<{ post: string }> }) {
  const { post } = await params;
  const doc = allPosts().find((p) => p.url.endsWith(post + "/"));
  if (!doc) notFound();
  const d = authorOf(doc);

  // Split: **In brief:** para -> .brief; **FAQs** numbered -> faq; rest -> post-body prose
  const briefM = doc.body.match(/\*\*In brief:\*\*\s*(.+)/);
  const faqM = doc.body.match(/\*\*FAQs\*\*\s*\n([\s\S]*?)(?=\[Reviewer|$)/);
  const faqs = faqM
    ? [...faqM[1].matchAll(/^\d+\.\s+\*([^*]+)\*\s*(.+)$/gm)].map((x) => ({ q: x[1].trim(), a: x[2].trim() }))
    : [];
  let body = doc.body
    .replace(/\*\*H1:[^*]+\*\*/, "")
    .replace(/\*\*In brief:\*\*[^\n]+\n?/, "")
    .replace(/\*\*FAQs\*\*\s*\n[\s\S]*?(?=\[Reviewer|$)/, "")
    .replace(/\[Reviewer box\]/g, "")
    .replace(/\[Related[^\]]*\]/g, "");
  // bold lead lines "**Title.** rest" or "**Title?** rest" -> h2 + paragraph
  body = body.replace(/^\*\*(.+?)[.?]\*\*\s*(.*)$/gm, "### $1\n\n$2");
  const { nodes, sections } = renderMarkdown(body);

  const relatedPages = allPages().filter((p) =>
    /normal-delivery|painless-delivery|pregnancy-week-by-week/.test(p.url),
  );

  return (
    <article>
      <section className="chero post-hero">
        <div className="wrap narrow">
          <Breadcrumbs
            items={[
              { label: "Health library", href: "/health-library/" },
              { label: doc.category ?? "Article", href: doc.url },
            ]}
          />
          <span className="chip-c">{doc.category ?? "Article"}</span>
          <h1>{doc.title.split("|")[0].trim()}</h1>
          <div className="author">
            <img src={d.portrait} alt="" />
            <span>
              <b>{d.name} {d.nameSoft}</b>
              {d.shortRole}
            </span>
            <span className="dt">
              Published <ConfirmChip note="launch date" /> · {doc.readingTime ?? "5 min"} read
            </span>
          </div>
          {briefM && (
            <div className="brief">
              <b>In brief</b>
              <p>{briefM[1]}</p>
            </div>
          )}
        </div>
      </section>
      <section className="sec white" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          <div className="art">
            <aside className="toc">
              <nav aria-label="In this article">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`}>{s.title}</a>
                ))}
              </nav>
              <div className="bk">
                <b>Close to your due date?</b>
                <small>Save our number now: {site.phone.display}. Call on the way in.</small>
                <a className="btn btn-coral" href={`tel:${site.phone.tel}`}>
                  <Phone className="ico" aria-hidden="true" />
                  Call the labour team
                </a>
              </div>
            </aside>
            <div className="prose post-body">
              {nodes}
              <ReviewerBox
                name={`${d.name} ${d.nameSoft}`}
                qualifications={d.role}
                lastReviewed={<ConfirmChip note="on sign-off" />}
                portrait={d.portrait}
              />
            </div>
          </div>
        </div>
      </section>
      {faqs.length ? (
        <section className="sec white" aria-labelledby="faq-h">
          <div className="wrap">
            <div className="faqg">
              <div className="l">
                <Tag>Quick answers</Tag>
                <h2 className="h2" id="faq-h">Questions about labour</h2>
                <div className="askcard">
                  <p>Did not find your question? Ask us on WhatsApp. Please do not send detailed medical information in a message.</p>
                  <a className="btn btn-wa" href={whatsappLink("a question")}>
                    <WhatsAppIcon className="ico" />
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
              <Accordion items={faqs} />
            </div>
          </div>
        </section>
      ) : null}
      {relatedPages.length ? (
        <section className="sec">
          <div className="wrap">
            <div className="shead">
              <div className="l">
                <Tag>Keep reading</Tag>
                <h2 className="h2">Related care</h2>
              </div>
            </div>
            <div className="cards">
              {relatedPages.slice(0, 3).map((p, i) => (
                <ServiceCard key={p.url} href={p.url} title={p.title.split("|")[0].trim()} text={p.description ?? ""} delay={i * 0.06} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <CtaBand />
    </article>
  );
}
