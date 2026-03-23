MEDICAL_TERMS = [
    "pain","fever","symptom","disease",
    "infection","breath","blood","scan"
]

def is_medical(text):
    return any(t in text.lower() for t in MEDICAL_TERMS)
