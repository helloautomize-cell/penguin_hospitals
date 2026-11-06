import type { Metadata } from "next";
import Link from "next/link";
import { HeroFilm } from "@/components/home/HeroFilm";
import { ChapterCards } from "@/components/home/ChapterCards";
import { ChapterStory } from "@/components/home/ChapterStory";
import { WeekDial } from "@/components/home/WeekDial";
import { HeartMap } from "@/components/home/HeartMap";
import { Visit } from "@/components/home/Visit";
import { CloseBand } from "@/components/home/CloseBand";
import { DoctorCard } from "@/components/DoctorCard";
import { ChatFaq } from "@/components/ChatFaq";
import { ConfirmChip } from "@/components/Tag";
import { doctors } from "@/lib/doctors";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Penguin Hospital, Chinchwad | Pregnancy, women's health and heart surgery",
  description:
    "Dr. Lakshmi's Penguin Hospital in Chinchwad Gaon, PCMC. Pregnancy and delivery, gynaecology and laparoscopy, and heart and vascular surgery. Emergency open day and night.",
  alternates: { canonical: "https://penguinhospitals.com/" },
};

const FAQS = [
  {
    q: "Is the hospital open on Sundays?",
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

const hospitalLd = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: "Dr. Lakshmi's Penguin Hospital",
  url: "https://penguinhospitals.com/",
  telephone: site.phone.display,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: "IN",
  },
  department: [
    { "@type": "MedicalClinic", name: "Obstetrics and Gynaecology", url: "https://penguinhospitals.com/obstetrics-gynaecology/" },
    { "@type": "MedicalClinic", name: "Cardiothoracic and Vascular Surgery", url: "https://penguinhospitals.com/heart-and-vascular-surgery/" },
  ],
};

export default function Home() {
  return (
    <div className="home">
      <HeroFilm />
      <ChapterCards />
      <ChapterStory />
      <WeekDial />
      <HeartMap />

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
          __html: JSON.stringify([
            hospitalLd,
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: "" },
              })),
            },
          ]),
        }}
      />
    </div>
  );
}
