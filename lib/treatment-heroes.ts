// Hero photo for every hub and treatment page. Pages read from here only.
// focus = object-position, so the subject stays in frame in the photo card.
export type TreatmentHero = { file: string; ratio: '16/9' | '4/5'; focus: string; doctor: 'lakshmi' | 'ashish'; alt: string; variant: 'cinema' | 'split' };

export const treatmentHeroes: Record<string, TreatmentHero> = {
  '/obstetrics-gynaecology/': { file: 'hub-obg.jpg', ratio: '16/9', focus: '50% 35%', doctor: 'lakshmi', alt: 'Three generations of women laughing together on a sofa', variant: 'cinema' },
  '/pregnancy-care/': { file: 'pregnancy-care.jpg', ratio: '16/9', focus: '70% 40%', doctor: 'lakshmi', alt: 'A pregnant woman smiling at her scan photo while her husband holds her', variant: 'split' },
  '/high-risk-pregnancy/': { file: 'high-risk-pregnancy.jpg', ratio: '16/9', focus: '35% 40%', doctor: 'lakshmi', alt: 'A pregnant woman having her blood pressure checked by a nurse', variant: 'split' },
  '/preeclampsia-treatment/': { file: 'preeclampsia.jpg', ratio: '4/5', focus: '50% 35%', doctor: 'lakshmi', alt: 'A pregnant woman checking her blood pressure reading at home', variant: 'split' },
  '/normal-delivery/': { file: 'normal-delivery.jpg', ratio: '16/9', focus: '50% 35%', doctor: 'lakshmi', alt: 'A new father kissing the mother and their newborn in bed', variant: 'split' },
  '/painless-delivery/': { file: 'painless-delivery.jpg', ratio: '16/9', focus: '45% 40%', doctor: 'lakshmi', alt: 'A mother resting calmly in labour while her own mother holds her hand', variant: 'split' },
  '/caesarean-delivery/': { file: 'caesarean-delivery.jpg', ratio: '16/9', focus: '40% 40%', doctor: 'lakshmi', alt: 'A mother resting in a hospital bed with her newborn on her chest', variant: 'split' },
  '/postnatal-care/': { file: 'postnatal-care.jpg', ratio: '4/5', focus: '50% 35%', doctor: 'lakshmi', alt: 'A new mother holding her sleeping baby in a rocking chair', variant: 'split' },
  '/pcos/': { file: 'pcos.jpg', ratio: '16/9', focus: '65% 35%', doctor: 'lakshmi', alt: 'A young woman walking in a green park in the morning', variant: 'split' },
  '/irregular-menstruation/': { file: 'irregular-periods.jpg', ratio: '4/5', focus: '50% 35%', doctor: 'lakshmi', alt: 'A young woman checking a period tracker app on her phone', variant: 'split' },
  '/heavy-periods/': { file: 'heavy-periods.jpg', ratio: '4/5', focus: '50% 35%', doctor: 'lakshmi', alt: 'A woman resting on a sofa with a hot water bag', variant: 'split' },
  '/uterine-fibroids/': { file: 'fibroids.jpg', ratio: '16/9', focus: '55% 45%', doctor: 'lakshmi', alt: 'A gynaecologist explaining a uterus model to a patient', variant: 'split' },
  '/ovarian-cysts/': { file: 'ovarian-cysts.jpg', ratio: '4/5', focus: '50% 40%', doctor: 'lakshmi', alt: 'An ultrasound probe and scan screen in a clinic', variant: 'split' },
  '/endometriosis/': { file: 'endometriosis.jpg', ratio: '16/9', focus: '30% 40%', doctor: 'lakshmi', alt: 'A woman sipping a warm drink by a rainy window', variant: 'split' },
  '/menopause-care/': { file: 'menopause-care.jpg', ratio: '16/9', focus: '40% 40%', doctor: 'lakshmi', alt: 'A woman in her fifties laughing with a friend after exercise', variant: 'split' },
  '/laparoscopic-surgery/': { file: 'laparoscopic-surgery.jpg', ratio: '16/9', focus: '45% 50%', doctor: 'lakshmi', alt: 'A surgeon holding a laparoscopic instrument in theatre', variant: 'split' },
  '/fertility-evaluation/': { file: 'fertility-evaluation.jpg', ratio: '16/9', focus: '50% 40%', doctor: 'lakshmi', alt: 'A couple sitting close together on a sofa', variant: 'split' },
  '/pap-smear-colposcopy/': { file: 'pap-smear.jpg', ratio: '4/5', focus: '55% 35%', doctor: 'lakshmi', alt: 'A gynaecologist talking a patient through a screening test', variant: 'split' },
  '/newborn-care/': { file: 'newborn-care.jpg', ratio: '4/5', focus: '50% 45%', doctor: 'lakshmi', alt: 'A parent\'s hands holding a newborn\'s feet', variant: 'split' },
  '/heart-check-up/': { file: 'heart-check-up.jpg', ratio: '16/9', focus: '55% 40%', doctor: 'ashish', alt: 'A man with ECG leads smiling while a doctor talks him through the test', variant: 'split' },
  '/keyhole-heart-surgery/': { file: 'keyhole-heart-surgery.jpg', ratio: '16/9', focus: '45% 35%', doctor: 'ashish', alt: 'An older man walking the corridor with a nurse after surgery', variant: 'split' },
  '/bypass-surgery/': { file: 'bypass-surgery.jpg', ratio: '4/5', focus: '50% 35%', doctor: 'ashish', alt: 'An older couple sharing tea and the newspaper at home', variant: 'split' },
  '/heart-valve-surgery/': { file: 'heart-valve-surgery.jpg', ratio: '4/5', focus: '50% 35%', doctor: 'ashish', alt: 'A woman walking up steps with her young son', variant: 'split' },
  '/varicose-veins/': { file: 'varicose-veins.jpg', ratio: '16/9', focus: '45% 40%', doctor: 'ashish', alt: 'A teacher standing in her classroom', variant: 'split' },
  '/peripheral-artery-disease/': { file: 'peripheral-artery-disease.jpg', ratio: '16/9', focus: '45% 50%', doctor: 'ashish', alt: 'An older man tying his shoes on a park bench before a walk', variant: 'split' },
  '/av-fistula-for-dialysis/': { file: 'av-fistula.jpg', ratio: '4/5', focus: '50% 50%', doctor: 'ashish', alt: 'A drawing of the forearm showing an artery joined to a vein', variant: 'split' },
  '/lung-and-chest-surgery/': { file: 'lung-and-chest-surgery.jpg', ratio: '16/9', focus: '30% 35%', doctor: 'ashish', alt: 'A man breathing deeply on a hilltop at sunrise', variant: 'split' },
  '/heart-and-vascular-surgery/': { file: 'heart-grandfather.jpg', ratio: '4/5', focus: '50% 18%', doctor: 'ashish', alt: 'A grandfather laughing with his granddaughter', variant: 'cinema' },
  // No photo yet: '/medical-termination-of-pregnancy/', '/lab-and-scans/', '/nutrition-and-physiotherapy/'. These use the 'badge' fallback in TreatmentHero.
};
