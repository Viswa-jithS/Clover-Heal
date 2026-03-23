import json
import re

with open("data/processed/symptom_disease.json", encoding="utf-8") as f:
    DB = json.load(f)

def clean_symptom(symptom_key: str) -> str:
    """
    Converts:
    'umls:c0008031_pain  chest'
    → 'pain chest'
    """
    # remove umls code
    symptom = re.sub(r"^umls:[^_]+_", "", symptom_key.lower())

    # normalize spaces
    symptom = re.sub(r"\s+", " ", symptom)

    # remove non-letter characters
    symptom = re.sub(r"[^a-z ]", "", symptom)

    return symptom.strip()

# Build cleaned symptom map
CLEAN_SYMPTOMS = {
    clean_symptom(key): key
    for key in DB.keys()
}

def extract_symptoms(text: str):
    text = re.sub(r"[^a-z ]", "", text.lower())
    found = set()

    for clean, original in CLEAN_SYMPTOMS.items():
        if clean and clean in text:
            found.add(original)

    return list(found)
