// page -> doctor + reason prefill for the booking form (plan section 7).
const women = new Set([
  "/obstetrics-gynaecology/", "/pregnancy-care/", "/high-risk-pregnancy/",
  "/preeclampsia-treatment/", "/normal-delivery/", "/painless-delivery/",
  "/caesarean-delivery/", "/postnatal-care/", "/pcos/", "/irregular-menstruation/",
  "/heavy-periods/", "/uterine-fibroids/", "/ovarian-cysts/", "/endometriosis/",
  "/menopause-care/", "/laparoscopic-surgery/", "/fertility-evaluation/",
  "/pap-smear-colposcopy/", "/medical-termination-of-pregnancy/", "/newborn-care/",
  "/lab-and-scans/", "/pregnancy-week-by-week/",
]);
const heart = new Set([
  "/heart-and-vascular-surgery/", "/heart-check-up/", "/keyhole-heart-surgery/",
  "/bypass-surgery/", "/heart-valve-surgery/", "/varicose-veins/",
  "/peripheral-artery-disease/", "/av-fistula-for-dialysis/", "/lung-and-chest-surgery/",
]);

export function doctorFor(url: string): "dr-lakshmi-vijay-kalbande" | "dr-ashish-baviskar" | null {
  const u = url.endsWith("/") ? url : url + "/";
  if (women.has(u)) return "dr-lakshmi-vijay-kalbande";
  if (heart.has(u)) return "dr-ashish-baviskar";
  return null;
}

export function whatsappTopic(url: string): string {
  return url.replace(/\/+$/, "").split("/").pop()?.replace(/-/g, " ") ?? "a visit";
}
