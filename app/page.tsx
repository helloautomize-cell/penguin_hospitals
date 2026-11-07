import type { Metadata } from "next";
import Link from "next/link";
import { HeroFilm } from "@/components/home/HeroFilm";
import { ChapterCards } from "@/components/home/ChapterCards";
import { LifeChapters } from "@/components/home/LifeChapters";
import { MothersSection } from "@/components/home/MothersSection";
import { HeartMap } from "@/components/home/HeartMap";
import { SurgeonStrip } from "@/components/home/SurgeonStrip";
import { Visit } from "@/components/home/Visit";
import { CloseBand } from "@/components/home/CloseBand";
import { DoctorCard } from "@/components/DoctorCard";
import { DoctorFigure } from "@/components/DoctorImage";
import { ChatFaq } from "@/components/ChatFaq";
import { ConfirmChip } from "@/components/Tag";
import { doctors } from "@/lib/doctors";
import { doctorImage, doctorImageSrcFor } from "@/lib/doctor-images.server";
import { pageGraph } from "@/lib/schema";
import { DOCTOR_IMAGE_SLOTS } from "@/lib/doctor-images";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: { absolute: "Penguin Hospital in Chinchwad | Together through life" },
  description:
    "Dr. Lakshmi's Penguin Hospital in Chinchwad Gaon, PCMC. Pregnancy and delivery, gynaecology and laparoscopy, and heart and vascular surgery. Emergency open day and night.",
  alternates: { canonical: "https://penguinhospitals.com/" },
};

const FAQS = [
  {
    q: "Is the hospital open on Sundays?",
    aText: "Yes. The OPD runs on Sundays from 4 to 6 pm, and the emergency team is here all day and night.",
    a: (
      <>
        Yes. The OPD runs on Sundays from 4 to 6 pm <ConfirmChip />, and the emergency team is here
        all day and night.
      </>
    ),
  },
  {
    q: "Labour has started at 2 am. Can I come?",
    a: "Yes, come straight in. Call 95189 04156 on the way so the labour team is ready for you.",
  },
  {
    q: "Is painless delivery available?",
    a: "Yes, with an epidural, after a talk with Dr. Lakshmi about whether it suits you and your labour.",
  },
  {
    q: "Does every heart problem need surgery?",
    a: "No. Many heart conditions are managed with medicines and follow-up. Dr. Ashish explains when surgery would help, and what kind.",
  },
];

const homeLd = pageGraph(
  { url: "/", title: "Penguin Hospital, Chinchwad" },
  { faq: FAQS.map((f) => ({ q: f.q, a: ("aText" in f ? f.aText : f.a) as string })) },
);

export default function Home() {
  const lak = doctorImage("lakshmiHeadshot");
  const ash = doctorImage("ashishHeadshot");
  return (
    <div className="home">
      <HeroFilm
        whoImgs={[
          doctorImageSrcFor("lakshmi", "Headshot"),
          doctorImageSrcFor("ashish", "Headshot"),
        ]}
      />
      <ChapterCards />
      <LifeChapters
        lakshmiImg={{
          src: lak.kind === "single" ? lak.src : DOCTOR_IMAGE_SLOTS.lakshmiHeadshot.fallback!,
          alt: DOCTOR_IMAGE_SLOTS.lakshmiHeadshot.alt,
        }}
        ashishImg={{
          src: ash.kind === "single" ? ash.src : DOCTOR_IMAGE_SLOTS.ashishHeadshot.fallback!,
          alt: DOCTOR_IMAGE_SLOTS.ashishHeadshot.alt,
        }}
      />
      <MothersSection />
      <HeartMap strip={<SurgeonStrip />} />

      <section className="pad" id="doctors" aria-labelledby="d-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="l">
              <span className="tag">
                <i></i>Your doctors
              </span>
              <h2 className="h2 rv" id="d-h">
                Two names on the door. <span className="soft">The same two in the room.</span>
              </h2>
            </div>
            <p className="lede rv">
              You see your specialist yourself, from the first visit to the follow-up.
            </p>
          </div>
          <DoctorCard doctor={doctors[0]} />
          <DoctorCard doctor={doctors[1]} flip />
          <div className="dclose rv">
            <DoctorFigure
              slot="together"
              className="dclose-ph"
              aspectRatio={null}
              maxHeight={null}
              objectPosition={null}
              sizes="(max-width: 1024px) 92vw, 760px"
            />
            <div className="dclose-tx">
              <span className="tag">
                <i></i>Under one roof
              </span>
              <h3>Two specialists who plan together</h3>
              <p>
                We look after women through pregnancy and beyond, and families through problems of the
                heart.
              </p>
              <div className="ctas">
                <Link className="btn btn-coral" href="/book/">
                  Book a visit
                </Link>
                <Link className="btn btn-line" href="/doctors/">
                  Meet both doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Visit />

      <section className="pad" id="faq" aria-labelledby="f-h" style={{ paddingTop: 0 }}>
        <div className="wrap chatw">
          <div style={{ display: "grid", gap: 22, justifyItems: "center", textAlign: "center" }}>
            <span className="tag">
              <i></i>Quick answers
            </span>
            <h2 className="h2 rv" id="f-h">
              You asked. <span className="soft">We answered.</span>
            </h2>
          </div>
          <ChatFaq items={FAQS} />
          <div className="ask-more">
            <Link className="btn btn-line" href="/faqs/">
              See all questions
            </Link>
            <a className="btn btn-navy" href={whatsappLink("a question")}>
              <WhatsAppIcon className="ico" />
              Ask us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <CloseBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeLd),
        }}
      />
    </div>
  );
}
