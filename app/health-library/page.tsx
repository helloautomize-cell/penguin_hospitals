import type { Metadata } from "next";
import Link from "next/link";
import { allPosts, allPages } from "@/lib/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ConfirmChip } from "@/components/Tag";
import { CtaBand } from "@/components/Callouts";
import { ServiceBadge } from "@/components/badges/ServiceBadge";
import { slugFor } from "@/lib/service-badges";
import { doctors } from "@/lib/doctors";
import { DoctorImg } from "@/components/DoctorImage";

export const metadata: Metadata = {
  title: "Health library | Penguin Hospital, Chinchwad",
  description:
    "Articles on pregnancy, women's health and heart health, written and reviewed by the doctors at Penguin Hospital, Chinchwad.",
  alternates: { canonical: "https://penguinhospitals.com/health-library/" },
};

const CATS = ["All", "Pregnancy", "Women's health", "Heart health"];
const COVER: Record<string, string> = {
  Pregnancy: "c-womens",
  "Women's health": "c-womens",
  "Heart health": "c-heart",
};
const CAT_BADGE: Record<string, string> = {
  Pregnancy: "pregnancy",
  "Women's health": "obg",
  "Heart health": "heart-check",
};

function Byline({ author }: { author?: string }) {
  const d = doctors.find((x) => author?.includes(x.nameSoft.split(" ")[0]) || author?.includes(x.name.split(" ")[1]));
  return (
    <span className="by">
      {d ? <DoctorImg who={d.slug} kind="Headshot" /> : null}
      {author ?? "Penguin Hospital"} {d ? null : <ConfirmChip />}
    </span>
  );
}

export default async function HealthLibrary({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const posts = allPosts().sort((a, b) => (a.url < b.url ? 1 : -1));
  const active = cat && CATS.includes(cat) ? cat : "All";
  const shown = active === "All" ? posts : posts.filter((p) => p.category === active);
  const [feat, ...rest] = shown;

  return (
    <article>
      <section className="chero" style={{ paddingBottom: "clamp(28px,3vw,40px)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Health library", href: "/health-library/" }]} />
          <span className="tag"><i></i>Health library</span>
          <div className="ahead">
            <h1>
              Plain answers, <span className="soft">signed by your doctor.</span>
            </h1>
            <p className="intro">
              Plain-language articles by Dr. Lakshmi Kalbande and Dr. Ashish Baviskar, on the
              questions patients ask most. Every article is reviewed by the doctor whose name is on
              it.
            </p>
          </div>
          <div className="filt">
            {CATS.map((c) => (
              <Link
                key={c}
                href={c === "All" ? "/health-library/" : `/health-library/?cat=${encodeURIComponent(c)}`}
                aria-pressed={active === c}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: "clamp(28px,3vw,40px)" }}>
        <div className="wrap">
          {feat && (
            <Link className="feat" href={feat.url}>
              <div className={`cover big ${COVER[feat.category ?? ""] ?? ""}`}>
                <ServiceBadge slug={slugFor(feat.url) ?? CAT_BADGE[feat.category ?? ""] ?? "obg"} size="xl" />
              </div>
              <div className="tx">
                <span className="chip-c">{feat.category ?? "Article"}</span>
                <h2>{feat.title.split("|")[0].trim()}</h2>
                <p>{feat.description}</p>
                <Byline author={feat.author} />
              </div>
            </Link>
          )}
          <div className="posts">
            {rest.map((p) => (
              <Link className="post" href={p.url} key={p.url}>
                <div className={`cover ${COVER[p.category ?? ""] ?? ""}`}>
                  <ServiceBadge slug={slugFor(p.url) ?? CAT_BADGE[p.category ?? ""] ?? "obg"} size="md" />
                </div>
                <div className="tx">
                  <span className="chip-c">{p.category ?? "Article"}</span>
                  <h3>{p.title.split("|")[0].trim()}</h3>
                  <p>{p.readingTime ? `${p.readingTime} read` : ""}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Have a question for the doctors?" />
    </article>
  );
}
