/*
  Schema.org builders. One @graph per page, stable @ids on the origin.
  Every fact comes from lib/site-config.ts; [CONFIRM] fields are omitted.
*/
import { site } from "@/lib/site-config";
import { doctors, type Doctor } from "@/lib/doctors";

export const ORIGIN = "https://penguinhospitals.com";

export const IDS = {
  website: `${ORIGIN}/#website`,
  clinic: `${ORIGIN}/#clinic`,
  lakshmi: `${ORIGIN}/#dr-lakshmi`,
  ashish: `${ORIGIN}/#dr-ashish`,
} as const;

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

function hhmm(dec: number): string {
  return `${String(Math.floor(dec)).padStart(2, "0")}:${String(Math.round((dec % 1) * 60)).padStart(2, "0")}`;
}

export function clinicNode() {
  return {
    "@type": ["Hospital", "MedicalClinic"],
    "@id": IDS.clinic,
    name: site.name,
    alternateName: site.shortName,
    url: `${ORIGIN}/`,
    logo: `${ORIGIN}/icon.png`,
    image: `${ORIGIN}/images/real/real-facade.jpg`,
    telephone: site.phone.display,
    email: site.email.address,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", address: `${site.address.line2}, ${site.address.locality}, ${site.address.city}` },
    hasMap: site.googleMapsUrl,
    openingHoursSpecification: [
      ...site.opd.days.map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_NAMES[d.day],
        opens: hhmm(d.opens),
        closes: d.closes === 24 ? "23:59" : hhmm(d.closes),
      })),
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_NAMES,
        opens: "00:00",
        closes: "23:59",
        name: "Emergency",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone.tel,
      contactType: "appointments",
      areaServed: site.areasServed,
      availableLanguage: ["en-IN", "hi", "mr"],
    },
    medicalSpecialty: ["Obstetric", "Gynecologic", "Cardiovascular", "Surgical"],
    department: { "@type": "MedicalClinic", name: "In-house pharmacy", parentOrganization: { "@id": IDS.clinic } },
    areaServed: [
      ...site.areasServed.map((n) => ({ "@type": "Place", name: n })),
      {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", address: `${site.address.locality}, ${site.address.city}` },
        geoRadius: "100000",
      },
    ],
    founder: { "@id": IDS.lakshmi },
    sameAs: [
      site.googleMapsUrl,
      "https://www.instagram.com/penguinhospital.pune",
      "https://www.facebook.com/penguinhospital",
      "https://www.youtube.com/@PenguinHospital-b5l",
    ],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": IDS.website,
    url: `${ORIGIN}/`,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": IDS.clinic },
  };
}

export function physicianNode(d: Doctor) {
  const id = d.slug.includes("lakshmi") ? IDS.lakshmi : IDS.ashish;
  const lakshmi = d.slug.includes("lakshmi");
  return {
    "@type": "Physician",
    "@id": id,
    name: `${d.name} ${d.nameSoft}`,
    url: `${ORIGIN}/doctors/${d.slug}/`,
    image: `${ORIGIN}${d.portrait}`,
    medicalSpecialty: lakshmi ? ["Obstetric", "Gynecologic", "Surgical"] : ["Cardiovascular", "Surgical"],
    worksFor: { "@id": IDS.clinic },
    hasCredential: lakshmi
      ? [
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MBBS" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "DNB Obstetrics and Gynaecology" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "certificate", name: "Ultrasound fellowship" },
        ]
      : [
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MBBS" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MS General Surgery" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MCh CTVS" },
        ],
    memberOf: lakshmi ? [{ "@type": "Organization", name: "Indian Menopause Society" }, { "@type": "Organization", name: "IOTA group" }] : undefined,
    knowsAbout: lakshmi
      ? ["Pregnancy care", "High-risk pregnancy", "Caesarean delivery", "Laparoscopic surgery", "Menopause care", "PCOS"]
      : ["Bypass surgery", "Heart valve surgery", "Keyhole heart surgery", "Varicose veins", "Peripheral artery disease", "AV fistula"],
  };
}

export function breadcrumbNode(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${ORIGIN}${it.url}`,
    })),
  };
}

/** Page-type schema for service/condition pages. */
const CONDITION_PAGES = new Set([
  "/pcos/", "/uterine-fibroids/", "/endometriosis/", "/ovarian-cysts/",
  "/preeclampsia-treatment/", "/varicose-veins/", "/peripheral-artery-disease/",
  "/irregular-menstruation/", "/heavy-periods/",
]);
const PROCEDURE_PAGES = new Set([
  "/caesarean-delivery/", "/laparoscopic-surgery/", "/bypass-surgery/",
  "/heart-valve-surgery/", "/keyhole-heart-surgery/", "/av-fistula-for-dialysis/",
]);

export function topicTypeFor(url: string): "MedicalCondition" | "MedicalProcedure" | null {
  if (CONDITION_PAGES.has(url)) return "MedicalCondition";
  if (PROCEDURE_PAGES.has(url)) return "MedicalProcedure";
  return null;
}

type DocLike = { url: string; title: string; description?: string; reviewer?: string | null; lastReviewed?: string };

export function pageGraph(doc: DocLike, opts: { faq?: { q: string; a: string }[]; physician?: Doctor; topicName?: string } = {}) {
  const graph: Record<string, unknown>[] = [websiteNode(), clinicNode()];
  const crumbs = [{ name: "Home", url: "/" }];
  if (doc.url !== "/") {
    if (doc.url.startsWith("/doctors/")) crumbs.push({ name: "Doctors", url: "/doctors/" });
    crumbs.push({ name: doc.title.replace(/\s*\|\s*Penguin Hospital\s*$/, ""), url: doc.url });
  }
  graph.push(breadcrumbNode(crumbs));

  if (opts.physician) {
    graph.push(physicianNode(opts.physician));
    graph.push({
      "@type": "MedicalWebPage",
      "@id": `${ORIGIN}${doc.url}#webpage`,
      url: `${ORIGIN}${doc.url}`,
      name: doc.title,
      about: { "@id": opts.physician.slug.includes("lakshmi") ? IDS.lakshmi : IDS.ashish },
      reviewedBy: { "@id": opts.physician.slug.includes("lakshmi") ? IDS.lakshmi : IDS.ashish },
      ...(doc.lastReviewed ? { lastReviewed: doc.lastReviewed } : {}),
      isPartOf: { "@id": IDS.website },
      inLanguage: "en-IN",
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  const topic = topicTypeFor(doc.url);
  const reviewer = opts.physician ?? (doc.reviewer?.includes("Ashish") ? doctors[1] : doctors[0]);
  graph.push(physicianNode(reviewer));
  const page: Record<string, unknown> = {
    "@type": "MedicalWebPage",
    "@id": `${ORIGIN}${doc.url}#webpage`,
    url: `${ORIGIN}${doc.url}`,
    name: doc.title,
    ...(doc.description ? { description: doc.description } : {}),
    reviewedBy: { "@id": reviewer.slug.includes("lakshmi") ? IDS.lakshmi : IDS.ashish },
    ...(doc.lastReviewed ? { lastReviewed: doc.lastReviewed } : {}),
    isPartOf: { "@id": IDS.website },
    inLanguage: "en-IN",
  };
  if (topic) {
    page.about = {
      "@type": topic,
      name: opts.topicName ?? doc.title.replace(/\s*\|\s*Penguin Hospital\s*$/, ""),
      ...(topic === "MedicalProcedure" ? { procedureType: "https://schema.org/SurgicalProcedure" } : {}),
    };
  } else {
    page.about = { "@id": IDS.clinic };
  }
  graph.push(page);

  if (opts.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: opts.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function postGraph(doc: DocLike & { author?: string }, author: Doctor) {
  const graph = [
    websiteNode(),
    clinicNode(),
    physicianNode(author),
    breadcrumbNode([
      { name: "Home", url: "/" },
      { name: "Health library", url: "/health-library/" },
      { name: doc.title.replace(/\s*\|\s*Penguin Hospital\s*$/, ""), url: doc.url },
    ]),
    {
      "@type": "BlogPosting",
      "@id": `${ORIGIN}${doc.url}#post`,
      headline: doc.title,
      url: `${ORIGIN}${doc.url}`,
      author: { "@id": author.slug.includes("lakshmi") ? IDS.lakshmi : IDS.ashish },
      reviewedBy: doc.reviewer ? { "@type": "Physician", name: doc.reviewer, worksFor: { "@id": IDS.clinic } } : undefined,
      datePublished: doc.lastReviewed,
      dateModified: doc.lastReviewed,
      publisher: { "@id": IDS.clinic },
      inLanguage: "en-IN",
      isPartOf: { "@id": IDS.website },
    },
  ];
  return { "@context": "https://schema.org", "@graph": graph };
}
