import math

def update_probabilities(priors: dict, answer_evidence: dict) -> dict:
    """
    Log-space Bayesian posterior update using user answers.

    priors:
      { disease: prior_probability_score (raw, from symptom matching) }

    answer_evidence:
      { disease: likelihood_multiplier }

    returns:
      { disease: posterior_probability_percent }

    Improvements vs. the original:
      - Log-space multiplication prevents floating-point underflow when many
        diseases compete and multipliers are large.
      - A minimum probability floor (0.5%) is applied so no disease collapses
        to 0.00%, which was misleading when evidence was simply absent.
    """

    MIN_FLOOR = 0.5   # Minimum posterior in %, before renormalization
    updated = {}

    for disease, prior_score in priors.items():
        if prior_score <= 0:
            prior_score = 1e-6   # guard against 0 or negative priors

        likelihood = answer_evidence.get(disease, 1.0)
        if likelihood <= 0:
            likelihood = 1e-6

        # Multiply in log space then exponentiate back
        log_posterior = math.log(prior_score) + math.log(likelihood)
        updated[disease] = math.exp(log_posterior)

    total = sum(updated.values())

    if total == 0:
        return {d: 0.0 for d in updated}

    # Normalize to percentages
    normalized = {
        disease: round((value / total) * 100, 2)
        for disease, value in updated.items()
    }

    # Apply minimum floor: any disease below MIN_FLOOR gets lifted to MIN_FLOOR
    # then renormalize so total still equals 100%.
    floored = {d: max(p, MIN_FLOOR) for d, p in normalized.items()}
    total_floored = sum(floored.values())

    return {
        disease: round((value / total_floored) * 100, 2)
        for disease, value in floored.items()
    }
