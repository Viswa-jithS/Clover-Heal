def select_next_questions(current_probs, question_bank):
    """
    Select questions that best separate top diseases
    """
    sorted_diseases = sorted(
        current_probs.items(),
        key=lambda x: x[1],
        reverse=True
    )

    top_diseases = [d for d, _ in sorted_diseases[:3]]

    selected = []
    for disease in top_diseases:
        selected.extend(question_bank.get(disease, []))

    return selected[:5]
