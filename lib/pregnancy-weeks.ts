// Weeks 4 to 40. General and true, matching 02a-women-pregnancy.md guidance.
// [size, at Penguin Hospital, you might feel]. Gap weeks fall back to the
// nearest earlier entry so every week 4..40 has an answer.
const W: [number, string, string, string][] = [
  [4, "a poppy seed", "First visit when you are ready. Dr. Lakshmi confirms the pregnancy and plans your scan and test dates.", "a missed period, tender breasts, tiredness"],
  [5, "a sesame seed", "Blood and urine tests are arranged, and the first ultrasound is booked.", "nausea in the mornings, needing more sleep"],
  [6, "a lentil", "The first ultrasound usually shows a tiny heartbeat now.", "queasiness that comes and goes"],
  [7, "a blueberry", "Routine bloods and your next visit date are set.", "food tastes changing, mild cramps"],
  [8, "a raspberry", "The dating scan confirms your weeks and your due date.", "nausea at its peak for many women"],
  [9, "a cherry", "Your file tracks weight, blood pressure and the scan reports.", "tiredness, a queasy stomach"],
  [10, "a strawberry", "Scan reports are checked and your questions answered.", "nausea starting to ease for some"],
  [11, "a lime", "The NT scan window is approaching; we book it at the right week.", "feeling warmer than usual"],
  [12, "a plum", "The NT scan (11 to 14 weeks) checks the baby's early growth.", "energy beginning to return"],
  [13, "a lemon", "Second trimester starts. Blood pressure and urine checks continue at each visit.", "the bump may start to show"],
  [14, "a peach", "Routine visits settle into a monthly rhythm.", "rounder belly, less nausea"],
  [15, "an apple", "Any anaemia or thyroid findings are followed up.", "sometimes blocked nose or headaches"],
  [16, "an avocado", "Your next ultrasound window is planned now.", "round ligament twinges in the lower belly"],
  [17, "a pear", "Monthly checks continue; growth is tracked at every visit.", "the first flutters for some women"],
  [18, "a bell pepper", "The anomaly scan (18 to 20 weeks) looks at the baby's organs one by one.", "first clear kicks"],
  [20, "a banana", "Anomaly scan and a longer consult to go through the findings.", "regular kicks, a growing bump"],
  [22, "a papaya", "Blood pressure and swelling checks at every visit.", "feeling the baby move each day"],
  [24, "a corn cob", "Glucose screening (diabetes test) is done around now.", "backache, leg cramps"],
  [26, "a cauliflower", "Growth and position checks continue.", "the bump getting in the way of sleep"],
  [28, "an aubergine", "Third trimester. Visits move to every two weeks.", "strong kicks, breathlessness climbing stairs"],
  [30, "a cabbage", "A growth scan checks size, fluid and the baby's position.", "tiredness returning"],
  [32, "a coconut", "Two-weekly visits; blood pressure watched closely for preeclampsia signs.", "Braxton Hicks practice tightenings"],
  [34, "a pineapple", "The baby usually settles head-down now.", "pressure low in the pelvis"],
  [36, "a romaine lettuce", "Weekly visits start. We talk through your birth plan.", "the urge to nest, heavier bump"],
  [37, "a bundle of Swiss chard", "Weekly visits; we watch for early labour signs.", "practice contractions, pelvic pressure"],
  [38, "a leek", "The plan for labour is finalised with you.", "sleepless nights, frequent toilet trips"],
  [39, "a watermelon", "Come in straight away for strong regular contractions, waters breaking or less movement.", "watching for real contractions"],
  [40, "a small pumpkin", "If the baby is late, extra scans check wellbeing and we plan what comes next.", "impatience, and that is normal"],
];

export type WeekInfo = { week: number; size: string; hospital: string; feel: string };

export function weekInfo(week: number): WeekInfo {
  let pick = W[0];
  for (const row of W) if (row[0] <= week) pick = row;
  return { week, size: pick[1], hospital: pick[2], feel: pick[3] };
}

export function weekFromLmp(lmp: Date, now = new Date()): number {
  return Math.floor((now.getTime() - lmp.getTime()) / (7 * 86400000));
}

export function dueDateFromLmp(lmp: Date): Date {
  const d = new Date(lmp);
  d.setDate(d.getDate() + 280);
  return d;
}

export const MIN_WEEK = 4;
export const MAX_WEEK = 40;
