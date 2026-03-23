KEY_CONTEXT_SIGNALS = {
    "worse on exertion": 2,
    "sudden onset": 2,
    "progressively worsening": 2,
    "known heart disease": 3,
    "diabetes": 2,
    "hypertension": 2,
    "smoker": 2,
    "previous episode": 1
}

def interpret_free_text(text: str) -> int:
    text = text.lower()
    score = 0

    for phrase, weight in KEY_CONTEXT_SIGNALS.items():
        if phrase in text:
            score += weight

    return score
