import json

with open("data/processed/symptom_disease.json", encoding="utf-8") as f:
    DB = json.load(f)

def match_diseases(symptoms):
    scores = {}

    for symptom in symptoms:
        if symptom not in DB:
            continue

        for entry in DB[symptom]:
            disease = entry.get("disease", "").strip()
            risk = entry.get("risk_level", 1)

            if disease:
                scores[disease] = scores.get(disease, 0) + risk

    return sorted(scores.items(), key=lambda x: x[1], reverse=True)
