def compute_probability(
    base_score: int,
    question_score: int,
    free_text_score: int
) -> float:
    total = base_score + question_score + free_text_score
    max_possible = 20  # conservative cap

    probability = (total / max_possible) * 100
    return round(min(probability, 99.0), 1)
