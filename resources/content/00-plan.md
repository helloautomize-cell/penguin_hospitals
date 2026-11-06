# Penguin Hospital: new website content, part 0 (plan and global rules)

Draft 1, 1 November 2026. Source of truth for every word on the new site. The coding agent splits each page into `resources/content/**.md`, one file per page, keeping the frontmatter shown with each page.

Files in this set:

| File | Covers |
|---|---|
| `00-plan.md` | This file: page groups, URL rules, writing rules, compliance basis, global elements |
| `01-core.md` | Home, About, Doctors (hub and two profiles), Book, Contact, Plan your visit, Emergency, Patients from across PCMC, Pregnancy week by week, Quick answers, Services overview |
| `02a-women-pregnancy.md` | Obstetrics and gynaecology hub and 7 pregnancy pages |
| `02b-women-gynaecology.md` | 11 gynaecology pages |
| `03-heart.md` | Heart and vascular surgery hub and 8 pages |
| `04-other-legal-utility.md` | 3 held service pages, 7 legal pages, health library, 2 launch posts and topic list, thank-you, 404 |
| `05-confirm-and-doctor-questionnaire.md` | Every [CONFIRM] item in one list, and the doctor questionnaire |

## 0.1 Page groups and count

53 pages and 2 launch posts, exactly as in `site-plan.md`. Pages marked `hidden: true` in frontmatter are built but not linked, not in the sitemap, and return 404 in production until the client confirms them.

## 0.2 URL rules

- Lowercase, hyphens, trailing slash.
- Old slugs that rank are kept: `/obstetrics-gynaecology/`, `/high-risk-pregnancy/`, `/preeclampsia-treatment/`, `/irregular-menstruation/`, `/heavy-periods/`, `/uterine-fibroids/`.
- Redirects are listed in `site-plan.md` section 9.

## 0.3 Writing rules (apply to every page)

- **Voice:** plain, warm and exact. Write for a first-time mother and her 60-year-old father-in-law at the same time. "We" and "you". Short sentences. Explain every medical term the first time it appears.
- **Answer first:** every page opens with 2 to 3 sentences that say what it is, who it is for and what happens at Penguin Hospital.
- **Never write:** best, top, leading, number one, guaranteed, permanent cure, painless (except the established term "painless delivery", always explained as epidural pain relief), success rates, patient or surgery counts, prices, drug or brand names, equipment model names, before/after, testimonials, review quotes, star ratings.
- **AI-tone blacklist** (master prompt 7.3): no delve, navigate as a metaphor, seamless, comprehensive, holistic, robust, tailored, cutting-edge, state-of-the-art, world-class, peace of mind, rest assured, one-stop, "it's important to note", "whether you're", rhetorical-question headings, exclamation marks, emojis, Title Case headings, em or en dashes. Ranges use "to".
- **Decisions belong to the doctor:** where treatment varies, use "Dr. [name] decides the right tests and treatment for you after examining you."
- **Headings:** sentence case. FAQ questions are written the way patients ask them.
- **Numbers:** only facts that are true and confirmed. Unconfirmed facts carry `[CONFIRM: ...]`, which shows as a yellow chip in development and fails `npm run launch-check`.

## 0.4 Compliance basis

National Medical Commission (Registered Medical Practitioner Professional Conduct) Regulations 2023, the Drugs and Magic Remedies (Objectionable Advertisements) Act 1954, the Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act 1994, the Medical Termination of Pregnancy Act 1971 (as amended in 2021), the Digital Personal Data Protection Act 2023, and the Consumer Protection Act 2019.

PCPNDT line, used on every pregnancy and scan page and in the footer:
> Sex determination of the foetus is a crime under the PCPNDT Act. We do not disclose the sex of the baby.

## 0.5 Global elements

**Canonical NAP (one source, `lib/site-config.ts`):**
- Name: Dr. Lakshmi's Penguin Hospital
- Address: Plot No. 59, New Pawana Nagar Society, Bijli Nagar Road, opposite Laxmi Medico and Mart, Chinchwad Gaon, Pimpri-Chinchwad, Maharashtra 411033 [CONFIRM]
- Phone and WhatsApp: +91 95189 04156 · Landline: 020 2735 1100
- Email: penguinhospitals@gmail.com [CONFIRM: domain email preferred]
- Emergency: open day and night. Hours text: "Emergency: open day and night. OPD: Monday to Saturday [CONFIRM], Sunday 4 pm to 6 pm [CONFIRM]."

**Top utility bar:** "Medical emergency? Call 108 or 112" · "Emergency open day and night" · Call · WhatsApp

**Emergency callout (component, used on service pages):**
> **When to get help straight away.** [page-specific list]. Call 108 or 112, or come to our emergency entrance. Do not wait for an appointment.

**Reviewer box (every medical page):**
> Medically reviewed by Dr. [name], [qualifications]. Last reviewed [date]. This page explains general information. It does not replace an examination by a doctor.

**CTA band (end of most pages):**
> **Talk to a specialist at Penguin Hospital.** Book a visit, call +91 95189 04156 or message us on WhatsApp. [Book a visit] [Call] [WhatsApp]

**Form consent line (under every form):**
> I agree that Penguin Hospital may contact me about this request. Please do not include detailed medical information in this form. [Read our privacy policy]

**WhatsApp prefill (per page, `lib/whatsapp.ts`):** "Hello Penguin Hospital, I would like to ask about [page topic]."

**Footer line:** "Together through life." · NAP once · hours · PCPNDT line · "© 2026 Dr. Lakshmi's Penguin Hospital [CONFIRM legal entity]" · legal links.

**Structured data notes:** `Hospital` (with `MedicalClinic` departments) on the home page; `Physician` on doctor profiles; `MedicalWebPage` with `reviewedBy` and `lastReviewed` on service pages; `FAQPage` wherever FAQs show; `BreadcrumbList` everywhere except the home page.

## 0.6 Photography map

| Use | Image (see `IMAGE-GUIDE.md`) |
|---|---|
| Home hero chapters | `hero-mother-newborn`, `heart-walk`, `night-corridor` (AI placeholders) |
| Facilities strip, About, Plan your visit | Real photos: `operation-theatre`, `ultrasound-room`, `general-ward`, `labour-room` |
| Service hubs | AI: `pregnant-window`, `newborn-hand`, `heart-grandfather` |
| Doctor profiles | New portraits needed (client shoot) |
