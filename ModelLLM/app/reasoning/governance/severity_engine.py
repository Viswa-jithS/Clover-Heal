"""
Severity Engine
===============
Determines clinical severity using three factors in priority order:
  1. Inherent disease danger (disease-based severity map)
  2. Clinical signal intensity (chest_severity score + clinical flags)
  3. ML confidence as a tiebreaker only

Returns: "Low" | "Moderate" | "High" | "Critical"
"""

# ── Disease-inherent severity map ──────────────────────────────────────────
# Covers all 134 diseases in the training dataset.
# Categories: "critical", "high", "moderate", "low"
DISEASE_SEVERITY_MAP: dict[str, str] = {
    # ─── CRITICAL — life-threatening, immediate intervention ───
    "UMLS:C0027051_myocardial  infarction":             "critical",
    "UMLS:C0034065_embolism  pulmonary":                "critical",
    "UMLS:C0038454_accident  cerebrovascular":          "critical",
    "UMLS:C0036690_septicemia":                         "critical",
    "UMLS:C0243026_systemic  infection":                "critical",
    "UMLS:C1090821_sepsis (invertebrate)":              "critical",
    "UMLS:C0007787_transient  ischemic attack":         "critical",
    "UMLS:C0022660_kidney  failure acute":              "critical",
    "UMLS:C0018802_failure  heart congestive":          "critical",
    "UMLS:C0878544_cardiomyopathy":                     "critical",
    "UMLS:C0010054_coronary  arteriosclerosis":         "critical",
    "UMLS:C0010068_coronary heart disease":             "critical",
    "UMLS:C0149871_deep  vein thrombosis":              "critical",
    "UMLS:C0022116_ischemia":                           "critical",
    "UMLS:C0001175_acquired  immuno-deficiency  syndrome": "critical",
    "UMLS:C0019682_HIV":                                "critical",
    "UMLS:C0019693_hiv infections":                     "critical",

    # ─── HIGH — serious, urgent care needed ───
    "UMLS:C0020538_hypertensive  disease":              "high",
    "UMLS:C0032285_pneumonia":                          "high",
    "UMLS:C0004096_asthma":                             "high",
    "UMLS:C0024117_chronic  obstructive airway disease":"high",
    "UMLS:C1565489_insufficiency  renal":               "high",
    "UMLS:C0022661_chronic  kidney failure":            "high",
    "UMLS:C0014544_epilepsy":                           "high",
    "UMLS:C0033975_psychotic  disorder":                "high",
    "UMLS:C0497327_dementia":                           "high",
    "UMLS:C0006826_malignant  neoplasms":               "high",
    "UMLS:C1306459_primary malignant neoplasm":         "high",
    "UMLS:C0007097_carcinoma":                          "high",
    "UMLS:C0001418_adenocarcinoma":                     "high",
    "UMLS:C0027651_neoplasm":                           "high",
    "UMLS:C0085096_peripheral  vascular disease":       "high",
    "UMLS:C0009676_confusion":                          "high",
    "UMLS:C1623038_cirrhosis":                          "high",
    "UMLS:C0019196_hepatitis  C":                       "high",
    "UMLS:C0002871_anemia":                             "high",
    "UMLS:C0013405_paroxysmal  dyspnea":                "high",
    "UMLS:C0026266_mitral  valve insufficiency":        "high",
    "UMLS:C0018989_hemiparesis":                        "high",
    "UMLS:C0021167_incontinence":                       "high",
    "UMLS:C0038454_accident  cerebrovascular":          "high",
    "UMLS:C0005586_bipolar  disorder":                  "high",
    "UMLS:C0030305_pancreatitis":                       "high",

    # ─── MODERATE — significant, requires medical attention ───
    "UMLS:C0011847_diabetes":                           "moderate",
    "UMLS:C0011570_depression  mental":                 "moderate",
    "UMLS:C0011581_depressive disorder":                "moderate",
    "UMLS:C0020443_hypercholesterolemia":               "moderate",
    "UMLS:C0020676_hypothyroidism":                     "moderate",
    "UMLS:C0700613_anxiety  state":                     "moderate",
    "UMLS:C0021311_infection":                          "moderate",
    "UMLS:C0042029_infection  urinary tract":           "moderate",
    "UMLS:C0007642_cellulitis":                         "moderate",
    "UMLS:C0011175_dehydration":                        "moderate",
    "UMLS:C0029456_osteoporosis":                       "moderate",
    "UMLS:C0029408_degenerative  polyarthritis":        "moderate",
    "UMLS:C0003864_arthritis":                          "moderate",
    "UMLS:C0028754_obesity":                            "moderate",
    "UMLS:C0020473_hyperlipidemia":                     "moderate",
    "UMLS:C0006277_bronchitis":                         "moderate",
    "UMLS:C1456784_paranoia":                           "moderate",
    "UMLS:C0015230_exanthema":                          "moderate",

    # ─── LOW — manageable, routine care ───
    "UMLS:C0017168_gastroesophageal  reflux disease":   "low",
    "UMLS:C0005001_benign  prostatic hypertrophy":      "low",
}


def determine_severity(
    predicted_disease: str,
    confidence: float = 0.0,
    chest_severity: int = 0,
    exertion: bool = False,
    rest_breathlessness: bool = False,
) -> str:
    """
    Determine case severity from:
      1. Disease inherent danger (primary factor)
      2. Clinical signal intensity (secondary factor)
      3. ML confidence (tiebreaker only)

    Args:
        predicted_disease:    Disease name key (UMLS format)
        confidence:           ML model confidence 0.0–1.0
        chest_severity:       Patient-reported chest intensity 0–10
        exertion:             Symptoms worsen with exertion
        rest_breathlessness:  Shortness of breath at rest

    Returns:
        "Critical" | "High" | "Moderate" | "Low"
    """
    # ── 1. Base severity from disease ──────────────────────────────────────
    # Try exact match first, then try partial/substring match
    base = None
    if predicted_disease:
        disease_upper = predicted_disease.upper()
        for key, sev in DISEASE_SEVERITY_MAP.items():
            if key.upper() == disease_upper:
                base = sev
                break

        if base is None:
            # Fallback: substring match on the human-readable part
            disease_name_part = predicted_disease.lower().split("_")[-1] if "_" in predicted_disease else predicted_disease.lower()
            for key, sev in DISEASE_SEVERITY_MAP.items():
                if disease_name_part in key.lower():
                    base = sev
                    break

    # Default if disease not in map
    if base is None:
        base = "moderate"

    # ── 2. Clinical signal escalation ──────────────────────────────────────
    # Count red-flag clinical signals
    red_flags = 0
    if chest_severity >= 7:    red_flags += 2   # severe chest symptom
    elif chest_severity >= 4:  red_flags += 1   # moderate chest symptom
    if exertion:               red_flags += 1   # cardiac/respiratory marker
    if rest_breathlessness:    red_flags += 2   # serious respiratory marker

    # ── 3. Final severity resolution ───────────────────────────────────────
    RANKS = {"low": 0, "moderate": 1, "high": 2, "critical": 3}
    rank = RANKS.get(base, 1)

    # Escalate by red flags
    if red_flags >= 4:
        rank = min(rank + 2, 3)
    elif red_flags >= 2:
        rank = min(rank + 1, 3)

    # ML confidence as tiebreaker: very low confidence = downgrade by 1
    if confidence < 0.25 and rank > 0:
        rank -= 1

    LEVELS = {0: "Low", 1: "Moderate", 2: "High", 3: "Critical"}
    return LEVELS[rank]
