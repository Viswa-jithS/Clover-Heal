RED_FLAG_SYMPTOMS = [
    "umls:c0008031_pain  chest",
    "umls:c0392680_shortness  of breath",
    "umls:c0039070_syncope"
]

def detect_red_flags(symptoms: list) -> bool:
    return any(symptom in RED_FLAG_SYMPTOMS for symptom in symptoms)
