"""
Disease Evidence Map
====================
Maps clinical signals (answer keys from the assessment form) to per-disease
likelihood multipliers used in the Bayesian probability update.

Signal keys must match keys in the `answers` dict sent to /cases/create:
  exertion              bool   - symptoms worsen with physical activity
  chest_severity        int    - 0-10 chest pain/pressure intensity
  rest_breathlessness   bool   - breathless at rest
  fever                 bool   - temperature >= 38°C / 100.4°F
  sudden_onset          bool   - symptoms started suddenly (mins-hours)
  weight_loss           bool   - unexplained weight loss
  age_gt60              bool   - patient age > 60 (derived from personal_info.age)
  smoking               bool   - current or ex-smoker
  diabetes              bool   - known diabetic
  hypertension          bool   - known hypertensive
  cough_duration        bool   - cough lasting > 3 days

Multipliers > 1.0  → signal increases posterior probability for this disease.
Multipliers < 1.0  → signal decreases posterior probability (protective).
"""

DISEASE_EVIDENCE = {

    # ─── CARDIAC ─────────────────────────────────────────────────────────────

    "UMLS:C0027051_myocardial  infarction": {
        "exertion":             1.5,
        "chest_severity":       1.4,
        "rest_breathlessness":  1.3,
        "sudden_onset":         1.6,
        "age_gt60":             1.4,
        "smoking":              1.3,
        "diabetes":             1.3,
        "hypertension":         1.3,
        "fever":                0.7,   # fever less likely in pure MI
    },

    "UMLS:C0010054_coronary  arteriosclerosis^UMLS:C0010068_coronary heart disease": {
        "exertion":             1.4,
        "chest_severity":       1.3,
        "rest_breathlessness":  1.2,
        "age_gt60":             1.4,
        "smoking":              1.4,
        "diabetes":             1.3,
        "hypertension":         1.3,
    },

    "UMLS:C0018802_failure  heart congestive": {
        "rest_breathlessness":  1.5,
        "age_gt60":             1.3,
        "exertion":             1.2,
        "hypertension":         1.3,
        "diabetes":             1.2,
    },

    "UMLS:C0002962_angina  pectoris": {
        "exertion":             1.6,
        "chest_severity":       1.3,
        "sudden_onset":         1.3,
        "age_gt60":             1.2,
        "smoking":              1.2,
        "hypertension":         1.2,
    },

    "UMLS:C0878544_cardiomyopathy": {
        "rest_breathlessness":  1.4,
        "exertion":             1.3,
        "age_gt60":             1.2,
    },

    "UMLS:C0020538_hypertensive  disease": {
        "exertion":             1.1,
        "chest_severity":       1.0,
        "rest_breathlessness":  1.0,
        "hypertension":         1.5,
        "age_gt60":             1.2,
        "diabetes":             1.1,
    },

    # ─── VASCULAR / THROMBOEMBOLIC ────────────────────────────────────────────

    "UMLS:C0034065_embolism  pulmonary": {
        "sudden_onset":         1.7,
        "rest_breathlessness":  1.5,
        "chest_severity":       1.3,
        "smoking":              1.2,
        "exertion":             1.1,
        "fever":                0.8,
    },

    "UMLS:C0149871_deep  vein thrombosis": {
        "sudden_onset":         1.3,
        "smoking":              1.2,
        "age_gt60":             1.2,
    },

    "UMLS:C0022116_ischemia": {
        "sudden_onset":         1.5,
        "chest_severity":       1.3,
        "smoking":              1.3,
        "diabetes":             1.3,
        "hypertension":         1.3,
    },

    "UMLS:C0085096_peripheral  vascular disease": {
        "smoking":              1.5,
        "diabetes":             1.4,
        "age_gt60":             1.3,
        "hypertension":         1.2,
    },

    # ─── CEREBROVASCULAR ─────────────────────────────────────────────────────

    "UMLS:C0038454_accident  cerebrovascular": {
        "sudden_onset":         1.8,
        "hypertension":         1.5,
        "age_gt60":             1.4,
        "smoking":              1.3,
        "diabetes":             1.2,
    },

    "UMLS:C0007787_transient  ischemic attack": {
        "sudden_onset":         1.7,
        "hypertension":         1.5,
        "age_gt60":             1.4,
        "diabetes":             1.2,
    },

    # ─── RESPIRATORY ─────────────────────────────────────────────────────────

    "UMLS:C0032285_pneumonia": {
        "fever":                1.6,
        "cough_duration":       1.4,
        "rest_breathlessness":  1.3,
        "age_gt60":             1.3,
        "sudden_onset":         1.2,
        "exertion":             0.8,
    },

    "UMLS:C0004096_asthma": {
        "rest_breathlessness":  1.4,
        "exertion":             1.3,
        "cough_duration":       1.3,
        "fever":                0.7,
        "sudden_onset":         1.2,
    },

    "UMLS:C0024117_chronic  obstructive airway disease": {
        "smoking":              1.7,
        "age_gt60":             1.4,
        "rest_breathlessness":  1.3,
        "cough_duration":       1.4,
        "exertion":             1.2,
        "fever":                0.8,
    },

    "UMLS:C0006277_bronchitis": {
        "cough_duration":       1.5,
        "fever":                1.3,
        "smoking":              1.2,
        "sudden_onset":         0.9,
    },

    # ─── METABOLIC / ENDOCRINE ────────────────────────────────────────────────

    "UMLS:C0011847_diabetes": {
        "diabetes":             1.8,   # confirmed history strongly supports
        "weight_loss":          1.4,
        "age_gt60":             1.2,
    },

    "UMLS:C0020676_hypothyroidism": {
        "weight_loss":          0.9,   # hypothyroid causes weight gain
        "age_gt60":             1.2,
        "fever":                0.8,
    },

    "UMLS:C0020443_hypercholesterolemia": {
        "smoking":              1.2,
        "diabetes":             1.2,
        "age_gt60":             1.2,
    },

    "UMLS:C0020473_hyperlipidemia": {
        "diabetes":             1.3,
        "smoking":              1.2,
        "age_gt60":             1.2,
    },

    "UMLS:C0028754_obesity": {
        "hypertension":         1.3,
        "diabetes":             1.3,
    },

    # ─── RENAL ───────────────────────────────────────────────────────────────

    "UMLS:C0022660_kidney  failure acute": {
        "diabetes":             1.4,
        "hypertension":         1.4,
        "fever":                1.2,
        "sudden_onset":         1.4,
        "age_gt60":             1.2,
    },

    "UMLS:C0022661_chronic  kidney failure": {
        "diabetes":             1.5,
        "hypertension":         1.5,
        "age_gt60":             1.3,
        "fever":                0.8,
    },

    "UMLS:C1565489_insufficiency  renal": {
        "diabetes":             1.4,
        "hypertension":         1.4,
        "age_gt60":             1.3,
    },

    # ─── INFECTIOUS / SEPSIS ─────────────────────────────────────────────────

    "UMLS:C0036690_septicemia": {
        "fever":                1.7,
        "sudden_onset":         1.5,
        "age_gt60":             1.3,
        "diabetes":             1.3,
        "rest_breathlessness":  1.2,
    },

    "UMLS:C0021311_infection": {
        "fever":                1.5,
        "sudden_onset":         1.3,
    },

    "UMLS:C0042029_infection  urinary tract": {
        "fever":                1.4,
        "diabetes":             1.3,
        "age_gt60":             1.2,
        "sudden_onset":         1.1,
    },

    "UMLS:C1090821_sepsis (invertebrate)": {
        "fever":                1.7,
        "sudden_onset":         1.5,
        "diabetes":             1.3,
        "age_gt60":             1.3,
    },

    "UMLS:C0243026_systemic  infection": {
        "fever":                1.6,
        "sudden_onset":         1.4,
        "age_gt60":             1.2,
    },

    # ─── ONCOLOGY ────────────────────────────────────────────────────────────

    "UMLS:C0006826_malignant  neoplasms": {
        "weight_loss":          1.7,
        "smoking":              1.4,
        "age_gt60":             1.4,
        "fever":                1.2,
    },

    "UMLS:C0007097_carcinoma": {
        "weight_loss":          1.6,
        "smoking":              1.4,
        "age_gt60":             1.3,
    },

    "UMLS:C1306459_primary malignant neoplasm": {
        "weight_loss":          1.7,
        "smoking":              1.4,
        "age_gt60":             1.4,
    },

    "UMLS:C0027651_neoplasm": {
        "weight_loss":          1.5,
        "age_gt60":             1.3,
        "smoking":              1.3,
    },

    "UMLS:C0001418_adenocarcinoma": {
        "weight_loss":          1.6,
        "smoking":              1.3,
        "age_gt60":             1.3,
    },

    # ─── NEUROLOGICAL ────────────────────────────────────────────────────────

    "UMLS:C0014544_epilepsy": {
        "sudden_onset":         1.5,
        "age_gt60":             1.1,
        "fever":                1.1,   # febrile seizures
    },

    "UMLS:C0497327_dementia": {
        "age_gt60":             1.8,
        "hypertension":         1.3,
        "diabetes":             1.2,
    },

    "UMLS:C0009676_confusion": {
        "fever":                1.4,
        "sudden_onset":         1.4,
        "age_gt60":             1.3,
        "diabetes":             1.2,
    },

    # ─── PSYCHIATRIC / BEHAVIOURAL ───────────────────────────────────────────

    "UMLS:C0011570_depression  mental": {
        "weight_loss":          1.3,
        "fever":                0.7,
        "sudden_onset":         0.7,
    },

    "UMLS:C0011581_depressive disorder": {
        "weight_loss":          1.3,
        "fever":                0.7,
        "sudden_onset":         0.7,
    },

    "UMLS:C0700613_anxiety  state": {
        "exertion":             1.2,
        "sudden_onset":         1.3,
        "fever":                0.7,
    },

    "UMLS:C0033975_psychotic  disorder": {
        "fever":                0.7,
        "sudden_onset":         1.2,
    },

    "UMLS:C0005586_bipolar  disorder": {
        "fever":                0.7,
    },

    # ─── MUSCULOSKELETAL ─────────────────────────────────────────────────────

    "UMLS:C0003864_arthritis": {
        "age_gt60":             1.3,
        "fever":                1.2,   # rheumatoid arthritis flare
        "exertion":             1.1,
    },

    "UMLS:C0029408_degenerative  polyarthritis": {
        "age_gt60":             1.5,
        "exertion":             1.1,
        "fever":                0.8,
    },

    "UMLS:C0029456_osteoporosis": {
        "age_gt60":             1.5,
        "weight_loss":          1.2,
    },

    # ─── GI / HEPATIC ────────────────────────────────────────────────────────

    "UMLS:C0030305_pancreatitis": {
        "fever":                1.4,
        "sudden_onset":         1.4,
        "rest_breathlessness":  1.1,
        "diabetes":             1.2,
    },

    "UMLS:C1623038_cirrhosis": {
        "age_gt60":             1.2,
        "weight_loss":          1.3,
        "fever":                1.1,
    },

    "UMLS:C0019196_hepatitis  C": {
        "fever":                1.3,
        "weight_loss":          1.2,
    },

    "UMLS:C0017168_gastroesophageal  reflux disease": {
        "exertion":             0.9,
        "fever":                0.7,
        "sudden_onset":         0.8,
        "chest_severity":       1.1,
    },

    # ─── HAEMATOLOGICAL ──────────────────────────────────────────────────────

    "UMLS:C0002871_anemia": {
        "age_gt60":             1.2,
        "weight_loss":          1.2,
        "exertion":             1.2,
        "fever":                1.1,
    },

    # ─── IMMUNOLOGICAL ───────────────────────────────────────────────────────

    "UMLS:C0001175_acquired  immuno-deficiency  syndrome": {
        "weight_loss":          1.7,
        "fever":                1.5,
        "cough_duration":       1.3,
    },

    "UMLS:C0019682_HIV": {
        "weight_loss":          1.6,
        "fever":                1.4,
    },

    "UMLS:C0019693_hiv infections": {
        "weight_loss":          1.5,
        "fever":                1.4,
    },

    # ─── DERMATOLOGICAL ──────────────────────────────────────────────────────

    "UMLS:C0007642_cellulitis": {
        "fever":                1.5,
        "sudden_onset":         1.3,
        "diabetes":             1.3,
    },

    "UMLS:C0015230_exanthema": {
        "fever":                1.4,
        "sudden_onset":         1.3,
    },

    # ─── OTHER ───────────────────────────────────────────────────────────────

    "UMLS:C0011175_dehydration": {
        "fever":                1.3,
        "sudden_onset":         1.1,
        "age_gt60":             1.2,
    },

    "UMLS:C0013405_paroxysmal  dyspnea": {
        "rest_breathlessness":  1.5,
        "sudden_onset":         1.4,
        "exertion":             1.2,
    },

    "UMLS:C0026266_mitral  valve insufficiency": {
        "exertion":             1.3,
        "rest_breathlessness":  1.3,
        "age_gt60":             1.2,
    },

    "UMLS:C0005001_benign  prostatic hypertrophy": {
        "age_gt60":             1.6,
    },

    "UMLS:C0018989_hemiparesis": {
        "sudden_onset":         1.6,
        "hypertension":         1.3,
        "age_gt60":             1.2,
    },
}
