import json
import math

with open("data/processed/symptom_disease.json", encoding="utf-8") as f:
    DB = json.load(f)

# Pre-compute symptom specificity weights (IDF-like):
# Symptoms that appear in fewer diseases are more diagnostically specific.
# weight = log(total_diseases / diseases_for_this_symptom) + 1
_TOTAL_DISEASES = 135  # approximate number of unique diseases in DB

SYMPTOM_SPECIFICITY: dict[str, float] = {
    symptom: math.log(_TOTAL_DISEASES / max(len(entries), 1)) + 1.0
    for symptom, entries in DB.items()
}


def match_diseases(symptoms: list[str]) -> list[tuple[str, float]]:
    """
    Score diseases against selected symptoms using IDF-weighted accumulation.

    For each symptom:
      - Retrieve its specificity weight (rarer symptom → higher weight).
      - Multiply by the per-disease risk_level from the DB entry.
      - Accumulate into the disease score.

    Returns a sorted list of (disease, score) descending.
    """
    scores: dict[str, float] = {}

    for symptom in symptoms:
        if symptom not in DB:
            continue

        idf_weight = SYMPTOM_SPECIFICITY.get(symptom, 1.0)

        for entry in DB[symptom]:
            disease = entry.get("disease", "").strip()
            risk = float(entry.get("risk_level", 1))

            if disease:
                scores[disease] = scores.get(disease, 0.0) + (risk * idf_weight)

    return sorted(scores.items(), key=lambda x: x[1], reverse=True)
