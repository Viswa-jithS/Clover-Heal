import math
from collections import defaultdict

class BayesianDiseaseModel:
    def __init__(self, disease_symptom_table):
        """
        disease_symptom_table:
        {
          disease: {
            "prior": float,
            "symptoms": {
                symptom: probability
            }
          }
        }
        """
        self.model = disease_symptom_table

    def infer(self, observed_symptoms):
        log_probs = {}

        for disease, data in self.model.items():
            log_p = math.log(data["prior"])

            for symptom in observed_symptoms:
                p = data["symptoms"].get(symptom, 0.01)  # smoothing
                log_p += math.log(p)

            log_probs[disease] = log_p

        # normalize
        max_log = max(log_probs.values())
        exp_probs = {
            d: math.exp(lp - max_log)
            for d, lp in log_probs.items()
        }

        total = sum(exp_probs.values())
        return {
            d: round((p / total) * 100, 2)
            for d, p in exp_probs.items()
        }
