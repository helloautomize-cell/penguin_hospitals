import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  Pause,
  Phone,
  PhoneCall,
  Play,
  Plus,
  ShieldCheck,
  Stethoscope,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/Button";
import { BookButton } from "@/components/BookButton";
import { CallSheet } from "@/components/CallSheet";
import { Tag, Chip, ConfirmChip } from "@/components/Tag";
import { BadgeCard, PhotoCard } from "@/components/Cards";
import {
  DoctorCard,
  DoctorMiniCard,
  PortraitPlaceholder,
} from "@/components/DoctorCard";
import { Accordion } from "@/components/Accordion";
import { ChatFaq } from "@/components/ChatFaq";
import { StepTracker } from "@/components/StepTracker";
import { SwipeCarousel } from "@/components/SwipeCarousel";
import { EmergencyCallout, ReviewerBox, CtaBand, PcpndtLine } from "@/components/Callouts";
import { MobileActionBar } from "@/components/MobileActionBar";
import { PenguinMark, WhatsAppIcon } from "@/components/icons";
import type { LucideIcon } from "lucide-react";
import { doctors } from "@/lib/doctors";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

/* ---------- contrast helpers ---------- */
function lum(hex: string) {
  const c = hex.replace("#", "");
  const f = (i: number) => {
    const v = parseInt(c.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(0) + 0.7152 * f(2) + 0.0722 * f(4);
}
function contrast(a: string, b: string) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const SWATCHES: { name: string; hex: string; use: string }[] = [
  { name: "night", hex: "#000E24", use: "Hero, dark sections, footer" },
  { name: "navy", hex: "#001F43", use: "Headings on light, primary dark surface" },
  { name: "deep", hex: "#0A2B57", use: "Dark cards on night" },
  { name: "blue", hex: "#17407E", use: "Primary brand, links, primary buttons" },
  { name: "blue-5", hex: "#2A5BA8", use: "Hover, gradient start" },
  { name: "sky", hex: "#8FB8EA", use: "Text accents on dark, focus ring on dark" },
  { name: "ice", hex: "#F4F8FC", use: "Light section background" },
  { name: "frost", hex: "#E8F0FA", use: "Chips, tabs, washes" },
  { name: "line", hex: "#DFE7F1", use: "Hairlines, card borders" },
  { name: "paper", hex: "#F7F4F1", use: "Warm light panel, max one per page" },
  { name: "ink", hex: "#0B1A30", use: "Body text on light" },
  { name: "ink-2", hex: "#4A5970", use: "Secondary text" },
  { name: "ink-3", hex: "#77869C", use: "Captions, fine print" },
  { name: "coral", hex: "#F4978E", use: "Warm accent: icons, rings, progress. Never body text on white" },
  { name: "coral-d", hex: "#E77A70", use: "Coral hover" },
  { name: "coral-ink", hex: "#B24740", use: "Coral text on light (margin notes, serif numerals)" },
  { name: "peach", hex: "#F9C9B6", use: "Illustration fill, soft glows" },
  { name: "blush", hex: "#FDEDE8", use: "Warm wash behind pregnancy tools" },
  { name: "alert", hex: "#E40913", use: "Emergency only, and the logo heart" },
  { name: "alert-dark-bg", hex: "#FF6B63", use: "Emergency text on night" },
  { name: "ok", hex: "#2F7D5B", use: "Open now, on light" },
  { name: "ok-dark-bg", hex: "#3DDC97", use: "Open now dot, on night" },
  { name: "wa", hex: "#1F7A55", use: "WhatsApp button" },
  { name: "confirm-bg", hex: "#FFF1B8", use: "[CONFIRM] chip" },
];

function Section({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-b border-line py-14 ${className}`}>
      <div className="wrap">
        <h2 className="t-h2-inner mb-10 text-navy">{title}</h2>
        {children}
      </div>
    </section>
  );
}

const homeFaqs = [
  {
    q: "Is the hospital open on Sundays?",
    a: (
      <>
        Yes. The OPD runs on Sundays from 4 pm to 6 pm <ConfirmChip />, and the emergency team is
        here day and night.
      </>
    ),
  },
  {
    q: "Labour has started at 2 am. Can I come?",
    a: (
      <>
        Yes. Come straight to the hospital and call us on the way on +91 95189 04156. If there is
        heavy bleeding, fits or the baby has stopped moving, call 108 first.
      </>
    ),
  },
  {
    q: "Do I need an appointment to see a doctor?",
    a: (
      <>
        An appointment saves you waiting, and you can book on WhatsApp. Walk-ins are seen during OPD
        hours.
      </>
    ),
  },
  {
    q: "Do you accept health insurance?",
    a: (
      <>
        Many patients use insurance with us. Bring your policy card and ID, and our desk will check
        your cover before admission. <ConfirmChip note="cashless panel list" />
      </>
    ),
  },
];

const firstVisitSteps = [
  { title: "Book", text: "Call, WhatsApp or use the form. We confirm your slot." },
  { title: "Arrive", text: "Reception notes your details and you sit with the doctor." },
  { title: "Consultation", text: "The doctor hears you out, then explains what they see." },
  { title: "Scan or tests", text: "Ultrasound or routine tests happen in the same building." },
  { title: "Your plan", text: "You leave with a written plan and clear next steps." },
  { title: "Follow-up", text: "Reports and the next visit are set before you go home." },
];

export default function Styleguide() {
  return (
    <main className="bg-white">
      <header className="border-b border-line bg-ice">
        <div className="wrap py-12">
          <Tag>Development only</Tag>
          <h1 className="t-h1-inner mt-5 text-navy">Penguin Hospital styleguide</h1>
          <p className="t-lede mt-4 max-w-[56ch] text-ink-2">
            Tokens, type, and shared components from the approved design. Not linked or indexed.
          </p>
        </div>
      </header>

      {/* ---------- colour ---------- */}
      <Section id="colour" title="Colour">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SWATCHES.map((s) => {
            const onWhite = contrast(s.hex, "#FFFFFF");
            const onNight = contrast(s.hex, "#000E24");
            return (
              <div key={s.name} className="overflow-hidden rounded-card border border-line">
                <div className="h-20" style={{ background: s.hex }} />
                <div className="grid gap-1 p-4">
                  <b className="text-[15px] font-semibold text-ink">--{s.name}</b>
                  <span className="text-[13px] text-ink-2">{s.hex}</span>
                  <span className="text-[13px] text-ink-2">{s.use}</span>
                  <span className="mt-1 text-[12px] font-medium text-ink-2">
                    on white {onWhite.toFixed(2)}:1 · on night {onNight.toFixed(2)}:1
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-card bg-[image:var(--grad-brand)] p-6 text-white">
            <b className="text-[15px] font-semibold">--grad-brand</b>
            <p className="mt-1 text-[14px] text-mist">
              linear-gradient(90deg, #17407E, #001F43). Book button and mobile bar only.
            </p>
          </div>
          <div className="rounded-card bg-[image:var(--grad-warm)] p-6 text-night">
            <b className="text-[15px] font-semibold">--grad-warm</b>
            <p className="mt-1 text-[14px] text-deep">
              linear-gradient(135deg, #F9C9B6, #F4978E). Illustration and progress only.
            </p>
          </div>
        </div>
        <p className="t-fine mt-4 text-ink-2">At most one gradient surface per viewport.</p>
      </Section>

      {/* ---------- type ---------- */}
      <Section id="type" title="Type">
        <div className="grid gap-10">
          {[
            { cls: "t-hero", label: "Hero H1 · clamp(52px, 7.2vw, 118px)", text: "Together through life." },
            {
              cls: "t-h2-home",
              label: "Section H2 (home) · clamp(38px, 4.4vw, 68px)",
              text: "Two names on the door. The same two in the room.",
            },
            {
              cls: "t-h1-inner",
              label: "Page H1 (inner) · clamp(38px, 4.6vw, 64px)",
              text: "A family hospital, named after the most devoted parents we know",
            },
            {
              cls: "t-h2-inner",
              label: "H2 (inner) · clamp(28px, 2.6vw, 40px)",
              text: "Your pregnancy, week by week.",
            },
            { cls: "t-h3", label: "H3 · 22px to 24px", text: "Getting to know your body" },
          ].map((t) => (
            <div key={t.cls} className="grid gap-2 border-b border-line pb-8">
              <span className="t-fine text-ink-2">{t.label}</span>
              <p className={`${t.cls} text-navy`}>{t.text}</p>
            </div>
          ))}
          <div className="grid gap-2">
            <span className="t-fine text-ink-2">Lede · 19px to 20px</span>
            <p className="t-lede max-w-[52ch] text-ink-2">
              You see your specialist yourself, from the first visit to the follow-up.
            </p>
          </div>
          <div className="grid gap-2">
            <span className="t-fine text-ink-2">Body · 17px, max 68ch</span>
            <p className="t-body text-ink">
              Penguin Hospital is a family hospital in Chinchwad Gaon. Women come to us for periods,
              pregnancy and the years after. Their parents and husbands come to us for their hearts.
            </p>
          </div>
          <div className="grid gap-2">
            <span className="t-fine text-ink-2">
              Instrument Serif · numerals and margin notes only
            </span>
            <p className="font-serif text-[64px] leading-none text-ink">20</p>
            <p className="font-serif text-[24px] italic text-coral-ink">drag me</p>
          </div>
          <div className="grid gap-2">
            <span className="t-fine text-ink-2">Noto Sans Devanagari · hero greeting only</span>
            <p className="font-deva text-[24px] font-semibold text-navy">नमस्कार</p>
          </div>
        </div>
      </Section>

      {/* ---------- buttons ---------- */}
      <Section id="buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary gradient</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="line">Secondary line</Button>
          <Button variant="whatsapp">
            <WhatsAppIcon className="size-[18px]" />
            WhatsApp
          </Button>
          <Button variant="emergency">
            <TriangleAlert aria-hidden className="size-[18px]" strokeWidth={1.75} />
            Emergency 108 / 112
          </Button>
        </div>
        <div className="on-dark mt-6 flex flex-wrap items-center gap-4 rounded-card bg-night p-6">
          <Button variant="glass">Glass on dark</Button>
          <BookButton />
          <CallSheet variant="glass" label="Call" />
        </div>
        <p className="t-fine mt-4 text-ink-2">
          All targets at least 48px tall. Focus ring: 2px --blue on light, --sky on dark.
        </p>
      </Section>

      {/* ---------- chips and callouts ---------- */}
      <Section id="chips" title="Tags, chips and callouts">
        <div className="flex flex-wrap items-center gap-3">
          <Tag>Women and pregnancy</Tag>
          <Chip>OPD today</Chip>
          <ConfirmChip />
          <ConfirmChip note="OPD hours" />
        </div>
        <div className="on-dark mt-4 rounded-card bg-night p-6">
          <Tag dark>Heart and vessels</Tag>
          <span className="ml-3">
            <Chip dark>On night</Chip>
          </span>
        </div>
        <div className="mt-8 grid gap-6">
          <EmergencyCallout
            items={[
              "Heavy bleeding that soaks a pad in an hour",
              "Severe headache, blurred vision or fits",
              "The baby has stopped moving",
            ]}
          />
          <ReviewerBox
            name="Dr. Lakshmi Vijay Kalbande"
            qualifications="MBBS, DNB (Obstetrics and Gynaecology)"
            lastReviewed="1 November 2026"
          />
          <PcpndtLine />
          <CtaBand />
        </div>
      </Section>

      {/* ---------- cards ---------- */}
      <Section id="cards" title="Cards">
        <h3 className="t-h3 mb-5 text-ink">Badge cards (placeholder badges)</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Pregnancy care", x: "Check-ups, scans and a plan for every week.", i: "P" },
            { t: "Heart check-up", x: "ECG, echo and TMT before any decision.", i: "H" },
            { t: "Varicose veins", x: "Care for tired, aching or visible veins.", i: "V" },
          ].map((c) => (
            <BadgeCard key={c.t} href="#" title={c.t} text={c.x} initial={c.i} />
          ))}
        </div>
        <h3 className="t-h3 mb-5 mt-14 text-ink">Photo cards (AI hub photos)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <PhotoCard
            href="/pregnancy-care/"
            kicker="Nine months"
            title="Pregnancy care, week by week"
            src="/images/services/pregnant-window.jpg"
            alt="A pregnant woman standing by a window in soft light"
          />
          <PhotoCard
            href="/normal-delivery/"
            kicker="Day one"
            title="Delivery and newborn care"
            src="/images/services/newborn-hand.jpg"
            alt="A newborn baby's hand holding a parent's finger"
            className="sm:mt-12"
          />
          <PhotoCard
            href="/heart-and-vascular-surgery/"
            kicker="The years after"
            title="Heart and vascular care"
            src="/images/services/heart-grandfather.jpg"
            alt="A grandfather laughing with his granddaughter"
          />
        </div>
      </Section>

      {/* ---------- doctors ---------- */}
      <Section id="doctors" title="Doctor cards">
        <div className="grid gap-24">
          <DoctorCard doctor={doctors[0]} />
          <DoctorCard doctor={doctors[1]} flip />
        </div>
        <h3 className="t-h3 mb-5 mt-16 text-ink">Mega menu mini cards</h3>
        <div className="grid max-w-md gap-1 rounded-card border border-line bg-white p-3 shadow-card">
          {doctors.map((d) => (
            <DoctorMiniCard key={d.slug} doctor={d} />
          ))}
        </div>
        <h3 className="t-h3 mb-5 mt-10 text-ink">Parts</h3>
        <div className="grid max-w-sm gap-6">
          <PortraitPlaceholder name="Dr. Lakshmi" />
        </div>
      </Section>

      {/* ---------- interactive ---------- */}
      <Section id="interactive" title="Accordion, chat FAQ, steps, carousel">
        <div className="grid gap-14">
          <div>
            <h3 className="t-h3 mb-5 text-ink">Accordion</h3>
            <Accordion items={homeFaqs.slice(0, 2)} />
          </div>
          <div>
            <h3 className="t-h3 mb-5 text-ink">Chat FAQ (the 4 home questions)</h3>
            <ChatFaq items={homeFaqs} />
          </div>
          <div>
            <h3 className="t-h3 mb-5 text-ink">
              Step tracker · desktop rail and mobile cards
            </h3>
            <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
              <p className="t-small text-ink-2 lg:sticky lg:top-6 lg:self-start">
                &ldquo;What your care looks like.&rdquo; Steps come from the page content. On mobile
                the same list sits inside a swipe carousel.
              </p>
              <StepTracker steps={firstVisitSteps} />
            </div>
          </div>
          <div>
            <h3 className="t-h3 mb-5 text-ink">Swipe carousel · auto-advance 4.5s, pause control</h3>
            <SwipeCarousel label="Sample services">
              {[
                { t: "High-risk pregnancy", x: "Closer watch when a pregnancy needs it.", i: "H" },
                { t: "Normal delivery", x: "The labour team is here day and night.", i: "N" },
                { t: "Painless delivery", x: "Epidural pain relief, after a talk with the doctor.", i: "P" },
                { t: "PCOS", x: "Clear answers for a common diagnosis.", i: "P" },
                { t: "Menopause care", x: "Steady care through the change.", i: "M" },
              ].map((c) => (
                <BadgeCard key={c.t + c.x} href="#" title={c.t} text={c.x} initial={c.i} />
              ))}
            </SwipeCarousel>
          </div>
        </div>
      </Section>

      {/* ---------- icons ---------- */}
      <Section id="icons" title="Line icons in use">
        <div className="flex flex-wrap gap-6">
          {(
            [
              { Icon: CalendarDays, name: "calendar" },
              { Icon: Phone, name: "phone" },
              { Icon: PhoneCall, name: "phone-call" },
              { Icon: MessageCircle, name: "message" },
              { Icon: MapPin, name: "pin" },
              { Icon: Clock, name: "clock" },
              { Icon: ArrowRight, name: "arrow" },
              { Icon: Plus, name: "plus" },
              { Icon: X, name: "close" },
              { Icon: Menu, name: "menu" },
              { Icon: Pause, name: "pause" },
              { Icon: Play, name: "play" },
              { Icon: TriangleAlert, name: "alert" },
              { Icon: ShieldCheck, name: "shield" },
              { Icon: Stethoscope, name: "stethoscope" },
            ] as { Icon: LucideIcon; name: string }[]
          ).map(({ Icon, name }) => (
            <div key={name} className="grid w-16 place-items-center gap-2 text-center">
              <Icon aria-hidden className="size-6 text-ink" strokeWidth={1.75} />
              <span className="text-[12px] text-ink-2">{name}</span>
            </div>
          ))}
          <div className="grid w-16 place-items-center gap-2 text-center">
            <WhatsAppIcon className="size-6 text-ink" />
            <span className="text-[12px] text-ink-2">whatsapp</span>
          </div>
          <div className="grid w-16 place-items-center gap-2 text-center">
            <PenguinMark className="size-6" />
            <span className="text-[12px] text-ink-2">penguin</span>
          </div>
        </div>
        <p className="t-fine mt-4 text-ink-2">
          Lucide, 1.75 stroke, 20px to 24px, UI only.
        </p>
      </Section>

      {/* ---------- mobile bar ---------- */}
      <Section id="mobile-bar" title="Mobile action bar" className="border-b-0">
        <p className="t-small mb-6 max-w-[52ch] text-ink-2">
          Below 1024px on every page. Shown here in a phone frame; in the layout it sits fixed at the
          bottom and is hidden while typing in a form and on /thank-you/.
        </p>
        <div className="mx-auto w-full max-w-[380px] overflow-hidden rounded-[32px] border border-line bg-ice shadow-card">
          <div className="grid h-[420px] place-items-center p-6 text-center text-ink-2">
            <span className="t-small">Page content scrolls above the bar</span>
          </div>
          <MobileActionBar />
        </div>
      </Section>

      <footer className="wrap py-10 text-[13px] text-ink-2">
        Penguin Hospital styleguide · development only · {site.name}
      </footer>
    </main>
  );
}
