from app.reasoning.deterministic.questioning.question_bank import QUESTION_BANK

def select_questions(symptoms: list):
    selected = []
    selected.extend(QUESTION_BANK["general"])

    for symptom in symptoms:
        clean = symptom.split("_")[-1].strip()
        if clean in QUESTION_BANK:
            selected.extend(QUESTION_BANK[clean])

    return selected
