# Penguin Hospital: image guide

Draft 1, 1 November 2026. Covers every image the new site needs: what we already have, how to fix it, and AI prompts for the rest.

**Folder plan for the build:** `public/images/{brand,doctors,clinic,hero,services,steps,badges,blog}/`, kebab-case names, originals untouched in `resources/images/_source/`. The coding agent copies and renames; nobody renames by hand.

---

## 1. What we have

### Real hospital photos (keep, after clean-up)

| File | Size | Use | Fix before use |
|---|---|---|---|
| `operation-theatre.jpg` | 2048x1365 | About, Laparoscopic surgery, Caesarean, Heart hub "facilities" strip | Remove the AC brand logo and the equipment supplier sticker; correct the cyan cast to neutral white; straighten verticals; crop out the door edge on the right |
| `ultrasound-room.jpg` | 1024x683 | About, Pregnancy care, Lab and scans | **Upscale 2x to 4x**; bring down overexposure (the wall is blown out); remove the machine's brand name if legible; crop the bed edge |
| `general-ward.jpg` | 1024x683 | About, Plan your visit | **Upscale 2x to 4x**; neutralise the blue tint; straighten verticals |
| `labour-room.jpg` | 1024x683 | About, Normal delivery, Newborn care | **Upscale 2x to 4x**; remove the warmer's brand label; lower the exposure slightly |

**Upscaling:** use Topaz Photo AI, Magnific, Krea Enhance or Let's Enhance at 2x to 4x with "low creativity" or "faithful" settings, so equipment and text are not invented. Target at least 2400px on the long side. Then a light, matching grade on all four: neutral whites, slightly warm shadows, contrast +5, no heavy filters. They should look like one shoot.

**Never use:** the old Dr. Lakshmi desk photo with the patient photo collage behind her (consent), the 600x401 doctor photos (too small), the old site's stock images, or anything with a visible patient's face.

### AI photos already made (placeholders, keep)
`hero-mother-newborn`, `hero-first-look`, `heart-walk`, `night-corridor`, `pregnant-window`, `newborn-hand`, `heart-grandfather`. Saved in `assets/ai-photos/`.

### Brand
`logo-penguin-hospital.png` (PNG only). The coding agent redraws it as SVG for approval.

---

## 2. Needs a real shoot (cannot be AI)

These show real people or the real building, so they must be photographed. One half-day shoot covers all of them.

1. **Dr. Lakshmi portrait.** Head and shoulders, plain light wall, soft window light, white coat or saree, natural smile. Vertical 4:5, at least 2400px tall. Also one environmental shot in the consultation room (no patients, no photo collage).
2. **Dr. Ashish portrait.** Same setup, scrubs or shirt and coat.
3. **Both doctors together**, for the About page and Doctors hub.
4. **Building exterior**, day and blue hour (lights on), with the sign. For About, Contact, Plan your visit.
5. **Reception and waiting area**, empty, tidy, lights on.
6. **Private room**, made up, with window light.
7. **Staff moments**, backs to camera or with consent: a nurse checking blood pressure, a hand on a shoulder. For the step tracker.

---

## 3. AI prompts: the shared look

Every prompt below already ends with this style block. If your tool has a separate "style" field, put it there instead.

> **Style:** cinematic editorial photograph, Indian subjects, soft natural window light, deep navy blue shadows with warm blush-pink highlights, shallow depth of field, 50 to 85mm lens, light film grain, calm and hopeful mood, photorealistic natural skin texture. No text, no logos, no brand names, no visible hospital branding.

**Negative prompt (where supported):** extra fingers, distorted hands, plastic skin, oversaturated colours, stock-photo grin, gore, needles in skin, visible blood, Western interiors, text, watermark.

**Sizes:** page heroes 16:9 at 2400px wide or more; cards 4:5; step tracker 16:10. Midjourney suffix: `--style raw --v 6.1` plus the aspect ratio.

---

## 4. AI prompts: page heroes and section images

### Women and pregnancy

| # | File | Ratio | Prompt |
|---|---|---|---|
| W1 | `hub-obg.jpg` | 16:9 | Three generations of an Indian family of women, grandmother, mother and teenage daughter, sitting close on a sofa by a window, laughing softly, the daughter leaning on her mother. Subjects on the right, soft negative space on the left. + style |
| W2 | `pregnancy-care.jpg` | 16:9 | A pregnant Indian woman at about six months, sitting on a clinic bed edge, smiling as she looks at an ultrasound picture printout in her hands, her husband beside her with a hand on her shoulder. Clean white room, faces in soft profile. + style |
| W3 | `high-risk-pregnancy.jpg` | 16:9 | A calm pregnant Indian woman in a soft cotton kurta having her blood pressure checked with an arm cuff, a female doctor's hands in a white coat in the foreground, out of focus. Reassuring, unhurried. + style |
| W4 | `preeclampsia.jpg` | 4:5 | Close-up of a pregnant woman's hands holding a home blood pressure monitor on her lap, the display turned away from camera, her bump softly visible, warm living room light. + style |
| W5 | `normal-delivery.jpg` | 16:9 | A new Indian mother lying in a hospital bed, exhausted and smiling, her newborn wrapped in a cream muslin cloth on her chest, her husband leaning in to kiss her forehead. Warm early-morning light. + style |
| W6 | `painless-delivery.jpg` | 16:9 | A pregnant Indian woman in early labour resting comfortably on her side in a calm, softly lit hospital room, eyes closed, her mother holding her hand beside the bed. Peaceful, no medical equipment in focus. + style |
| W7 | `caesarean-delivery.jpg` | 16:9 | An Indian mother propped up on pillows in a hospital bed a day after birth, gently holding her sleeping newborn, a soft blanket over her lap, sunlight from a window. No wounds visible. + style |
| W8 | `postnatal-care.jpg` | 4:5 | An Indian mother at home sitting in a rocking chair by a window, cradling her newborn, a cup of tea on a side table, morning light, relaxed and tender. Modest, no feeding shown. + style |
| W9 | `pcos.jpg` | 16:9 | A young Indian woman in her early twenties in sportswear, walking briskly in a green park in Pune in the morning, earphones in, confident and relaxed. + style |
| W10 | `irregular-periods.jpg` | 4:5 | A young Indian woman sitting cross-legged on her bed, looking at a period-tracking calendar on her phone, thoughtful expression, cushions and soft daylight. Screen not readable. + style |
| W11 | `heavy-periods.jpg` | 4:5 | An Indian woman in her thirties resting on a sofa with a hot water bag on her lower tummy, a blanket over her legs, tired but calm, warm evening lamp light. + style |
| W12 | `fibroids.jpg` | 16:9 | An Indian woman in her early forties in a smart cotton saree talking with a female doctor across a clinic desk, both seen side-on, the doctor pointing to a simple anatomical model of the womb. + style |
| W13 | `ovarian-cysts.jpg` | 4:5 | A female doctor's hand holding an ultrasound probe, a soft out-of-focus scan screen in the background with abstract grey shapes, clean white clinic, cool and calm tones with a blush highlight. No patient visible. + style |
| W14 | `endometriosis.jpg` | 16:9 | A young Indian woman in her late twenties sitting by a window with her knees drawn up, eyes closed, a cup of herbal tea in her hands, quiet strength, rainy Pune afternoon outside. + style |
| W15 | `menopause-care.jpg` | 16:9 | A confident Indian woman in her early fifties with streaks of grey hair, laughing during a morning yoga session on a terrace with a friend, soft sunrise light. + style |
| W16 | `laparoscopic-surgery.jpg` | 16:9 | **Use the real operation theatre photo instead.** If a second image is needed: gloved surgeon's hands holding a slim laparoscopic instrument, blurred theatre lights behind, cool blue tones with a warm rim light, no patient or blood visible. + style |
| W17 | `fertility-evaluation.jpg` | 16:9 | A young Indian couple in their early thirties sitting together on a clinic sofa, holding hands, the woman leaning her head on her husband's shoulder, hopeful and quiet. + style |
| W18 | `pap-smear.jpg` | 4:5 | A friendly female doctor in a white coat explaining something to a woman in her thirties in a bright, private consultation room, both smiling, seen from the side. + style |
| W19 | `newborn-care.jpg` | 4:5 | Close-up of a newborn's tiny feet peeking out from a cream muslin swaddle, a parent's hand cupping them, soft warm light. + style |

### Heart and vessels

| # | File | Ratio | Prompt |
|---|---|---|---|
| H1 | `hub-heart.jpg` | 16:9 | **Use `heart-grandfather` or `heart-walk`** (already made). |
| H2 | `heart-check-up.jpg` | 16:9 | An Indian man in his fifties sitting on a clinic couch with ECG electrodes on his chest under an open shirt, chatting calmly with a male doctor in a white coat, ECG monitor softly out of focus, no readable numbers. + style |
| H3 | `keyhole-heart-surgery.jpg` | 16:9 | An Indian man in his sixties walking slowly along a sunny hospital corridor with a physiotherapist, a week after surgery, wearing a loose shirt, small smile of achievement. No wound visible. + style |
| H4 | `bypass-surgery.jpg` | 4:5 | An older Indian couple at home, the man in a cardigan reading the newspaper on a balcony, his wife bringing him tea, morning light, recovered and content. + style |
| H5 | `heart-valve-surgery.jpg` | 4:5 | A woman in her forties holding her young son's hand while climbing stairs outdoors, both smiling, strong and well, warm late-afternoon light. + style |
| H6 | `varicose-veins.jpg` | 16:9 | An Indian schoolteacher in her forties standing at the front of a classroom, seen from the waist down to her feet, comfortable flat sandals, soft daylight, students out of focus. Legs look normal. + style |
| H7 | `peripheral-artery-disease.jpg` | 16:9 | An Indian man in his sixties tying the laces of his walking shoes on a park bench, ready for a morning walk, dew on the grass, golden light. + style |
| H8 | `av-fistula.jpg` | 4:5 | **Use an illustration, not a photo.** Clean line-art illustration of a forearm with a gentle curved line joining an artery and a vein at the wrist, navy and coral strokes on an off-white background, medical diagram style, no text. |
| H9 | `lung-and-chest-surgery.jpg` | 16:9 | An Indian man in his fifties standing on a hillside near Pune at sunrise, eyes closed, taking a deep, easy breath, arms relaxed, misty valley behind. + style |

### Core pages

| # | File | Ratio | Prompt |
|---|---|---|---|
| C1 | `emergency.jpg` | 16:9 | **Use `night-corridor`** (already made). |
| C2 | `book.jpg` | 4:5 | Close-up of a woman's hand holding a phone and typing a message, sitting at a kitchen table with a cup of chai, morning light, screen not readable. + style |
| C3 | `patients-from-pcmc.jpg` | 16:9 | A wide view of a tree-lined road in Pimpri-Chinchwad at blue hour, light traffic with car tail lights, apartment buildings with lit windows, calm and local. + style |
| C4 | `pregnancy-week-by-week.jpg` | 16:9 | **Use `pregnant-window`** (already made). |
| C5 | `faqs.jpg` | 4:5 | A friendly Indian female receptionist in a navy uniform answering a phone at a clean hospital front desk, smiling, soft light. Face may be stylised. **Better with a real photo from the shoot.** + style |

### Step tracker, "Your first visit" (6 images, 16:10)

| # | File | Prompt |
|---|---|---|
| S1 | `step-1-book.jpg` | Hands holding a phone with a WhatsApp-style chat (no logo, unreadable), on a sofa with a pregnancy book beside it. + style |
| S2 | `step-2-arrive.jpg` | **Real shoot preferred:** reception desk. AI fallback: an Indian couple arriving at a bright hospital reception, seen from behind, a receptionist smiling. + style |
| S3 | `step-3-consultation.jpg` | A female doctor and a patient talking across a desk, the patient's back to camera, a family member beside her, warm and attentive. + style |
| S4 | `step-4-scan.jpg` | **Use the real `ultrasound-room` photo.** |
| S5 | `step-5-plan.jpg` | Close-up of a doctor's hand writing in a patient file on a desk, a stethoscope beside it, the patient's hands folded across the desk. No readable text. + style |
| S6 | `step-6-follow-up.jpg` | A mother at home smiling at a phone video call, her baby on her lap, soft light. Screen not visible. + style |

---

## 5. Service badges (illustrated, one per service)

> **Update 2 Nov 2026:** the badges are now drawn by the coding agent as SVG components. Follow `prompts/phase-2b-icons-and-badges.md`, which has a detailed drawing spec per badge. The AI prompt below is kept for reference only. Do not generate PNG badges.

Brief (master prompt 3.4), with this site's colours. Generate at 1024x1024, one at a time, keeping the same seed or style reference for consistency:

> Circular medical service badge, clean line-art illustration of **[SUBJECT]**, gradient strokes from royal blue #17407E to deep navy #001F43 with soft coral #F4978E highlights, small plus-sign sparkles, centred on a plain off-white background, no text, no logos, no brand names, flat premium style, 1024x1024.

| Badge slug | [SUBJECT] |
|---|---|
| obg | a uterus outline with a small heart inside |
| pregnancy | a pregnant woman's silhouette in profile |
| high-risk | a pregnant silhouette inside a protective shield |
| blood-pressure | a blood pressure cuff with a small heart |
| birth | a newborn swaddled in a blanket |
| epidural | a calm face with closed eyes and a gentle wave line |
| caesarean | a mother cradling a baby, seen from above |
| postnatal | a mother and baby with a small house outline |
| pcos | an ovary with small circles and a balance scale |
| cycle | a circular calendar with a drop |
| heavy-bleeding | a drop with a hot water bag |
| fibroid | a uterus with a small round growth |
| ovary | a single ovary and fallopian tube |
| endometriosis | a uterus with small scattered dots around it |
| menopause | a woman's profile with a sun and moon |
| laparoscopy | a slim laparoscope with three small dots |
| fertility | two hands forming a heart around a small seed |
| screening | a magnifying glass over a cervix outline |
| mtp | a calendar page with a soft shield (only if listed) |
| newborn | tiny baby feet |
| heart | an anatomical heart with an ECG line |
| heart-check | a heart with an ECG strip and a stethoscope |
| mics | a heart with a small curved incision line between ribs |
| cabg | a heart with a new vessel looping around a blockage |
| valve | a heart valve with three leaflets |
| veins | a leg outline with a wavy vein |
| arteries | a leg with a straight artery and a footprint |
| fistula | a forearm with a looped vessel at the wrist |
| lungs | a pair of lungs with a soft breath line |

Plus two doctor badges (male and female doctor, same style) for menu headings only.

---

## 6. Health library covers

No photos. The coding agent generates designed covers: a soft navy-to-blush gradient with the post's badge and category colour. No text baked into images.

---

## 7. Checklist for the client

- [ ] Upscale and clean the 4 real hospital photos (section 1)
- [ ] Book the half-day shoot (section 2)
- [ ] Generate the AI images in section 4 (minimum for launch: W1 to W12, H2 to H9, C2, C3, S1, S3, S5, S6)
- [x] Service badges: drawn in code by the agent (phase 2b)
- [ ] Upload everything to the project; we sort, rename and process
