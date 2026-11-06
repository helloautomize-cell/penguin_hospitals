import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPages, getPage, templateFor } from "@/lib/content";
import { allPageSlugs } from "@/lib/nav";
import {
  PageTemplate,
  HubTemplate,
  DoctorsHubTemplate,
  DoctorTemplate,
  FormTemplate,
  EmergencyTemplate,
  ThankYouTemplate,
  FaqsTemplate,
  InfoTemplate,
  LegalTemplate,
} from "@/components/templates/PageTemplate";
import { doctors } from "@/lib/doctors";

const PROD = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";

export function generateStaticParams() {
  return allPageSlugs.filter((p) => !["/", "/health-library/", "/pregnancy-week-by-week/"].includes(p)).map((p) => ({ slug: p.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const url = "/" + (slug ?? []).join("/") + "/";
  const doc = getPage(url);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    robots: doc.url === "/thank-you/" ? { index: false } : undefined,
    alternates: { canonical: `https://penguinhospitals.com${doc.url}` },
    openGraph: { title: doc.title, description: doc.description, url: `https://penguinhospitals.com${doc.url}`, locale: "en_IN" },
  };
}

export default async function Page({ params, searchParams }: { params: Promise<{ slug: string[] }>; searchParams: Promise<Record<string,string>> }) {
  const { slug } = await params;
  const sp = await searchParams;
  const url = "/" + (slug ?? []).join("/") + "/";
  if (!allPageSlugs.includes(url) && !getPage(url)) notFound();
  const doc = getPage(url);
  if (!doc) notFound();
  if (doc.hidden && PROD) notFound();

  const docSlug = url.includes("dr-lakshmi") ? doctors[0] : url.includes("dr-ashish") ? doctors[1] : undefined;
  const isMedical = !["legal", "thankyou", "form"].includes(templateFor(url));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": docSlug ? "Physician" : "MedicalWebPage",
    name: doc.title,
    url: `https://penguinhospitals.com${doc.url}`,
    ...(doc.reviewer ? { reviewedBy: { "@type": "Physician", name: doc.reviewer } } : {}),
    ...(doc.lastReviewed ? { lastReviewed: doc.lastReviewed } : {}),
    ...(docSlug ? { medicalSpecialty: docSlug.role } : {}),
  };

  const tpl = templateFor(url);
  let el: React.ReactNode;
  switch (tpl) {
    case "hub": el = <HubTemplate doc={doc} />; break;
    case "doctors-hub": el = <DoctorsHubTemplate doc={doc} />; break;
    case "doctor": el = <DoctorTemplate doc={doc} />; break;
    case "form": el = <FormTemplate doc={doc} doctor={sp.doctor} reason={sp.reason} />; break;
    case "emergency": el = <EmergencyTemplate doc={doc} />; break;
    case "thankyou": el = <ThankYouTemplate doc={doc} type={sp.type} />; break;
    case "faqs": el = <FaqsTemplate doc={doc} />; break;
    case "legal": el = <LegalTemplate doc={doc} />; break;
    case "info": el = <InfoTemplate doc={doc} />; break;
    default: el = <PageTemplate doc={doc} />;
  }
  return (
    <>
      {el}
      {isMedical ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
    </>
  );
}
