def update_probabilities(priors: dict, answer_evidence: dict) -> dict:
    """
    Bayesian-style posterior update using user answers.

    priors:
      { disease: prior_probability_percent }

    answer_evidence:
      { disease: likelihood_multiplier }

    returns:
      { disease: posterior_probability_percent }
    """

    updated = {}

    for disease, prior_prob in priors.items():
        likelihood = answer_evidence.get(disease, 1.0)
        updated[disease] = prior_prob * likelihood

    total = sum(updated.values())

    if total == 0:
        return {d: 0.0 for d in updated}

    return {
        disease: round((value / total) * 100, 2)
        for disease, value in updated.items()
    }
