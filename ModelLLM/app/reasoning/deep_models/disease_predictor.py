"""
Disease prediction using ensemble of sklearn models (RF, BernoulliNB, SVM, GradientBoosting)
with majority voting.

Models trained on symptom binary vectors → disease name.
"""
import re
import pickle
from pathlib import Path
from app.core.config import settings


def _load_model(path: Path):
    """Load a pickled model from disk."""
    with open(path, "rb") as f:
        return pickle.load(f)


# Load models at import time
try:
    rf_model      = _load_model(settings.DISEASE_RF_MODEL_PATH)
    nb_model      = _load_model(settings.DISEASE_NB_MODEL_PATH)
    svm_model     = _load_model(settings.DISEASE_SVM_MODEL_PATH)
    label_encoder = _load_model(settings.DISEASE_LABEL_ENCODER_PATH)
    MODELS_LOADED = True

    # Optionally load GradientBoosting (added in retrain script)
    try:
        gb_model = _load_model(settings.DISEASE_GB_MODEL_PATH)
        GB_LOADED = True
    except Exception:
        gb_model  = None
        GB_LOADED = False

except Exception as e:
    print(f"[WARNING] Disease models could not be loaded: {e}")
    rf_model = nb_model = svm_model = gb_model = label_encoder = None
    MODELS_LOADED = GB_LOADED = False


def _normalise_key(raw: str) -> str:
    """Normalise a symptom key to match training feature names.

    Training keys are lowercase with collapsed single spaces, e.g.:
        'umls:c0008031_pain  chest'   → 'umls:c0008031_pain  chest'   (keep as-is)
    The old predictor wrongly replaced ALL spaces with underscores — this
    destroyed the UMLS format and caused zero matches.
    """
    return re.sub(r"\s+", " ", raw.strip().lower())


def get_symptom_columns():
    """Get the list of symptom feature names the models expect."""
    if not MODELS_LOADED or rf_model is None:
        return []
    try:
        return list(rf_model.feature_names_in_)
    except AttributeError:
        return []


def predict_disease(symptom_names: list) -> dict:
    """
    Predict disease from a list of symptom UMLS keys using majority voting.

    Args:
        symptom_names: List of UMLS symptom keys
                       (e.g. ['umls:c0008031_pain  chest', 'umls:c0015967_fever'])

    Returns:
        Dict with per-model predictions, confidence, and majority-vote prediction.
    """
    if not MODELS_LOADED:
        return {
            "error": "Disease prediction models not loaded",
            "rf_prediction": None,
            "nb_prediction": None,
            "svm_prediction": None,
            "gb_prediction": None,
            "final_prediction": None,
            "confidence": 0.0,
        }

    import pandas as pd

    # Build binary symptom vector using normalised keys
    columns = get_symptom_columns()
    if not columns:
        return {"error": "Cannot determine feature columns", "final_prediction": None}

    feature_set = {col: idx for idx, col in enumerate(columns)}
    input_data  = [0] * len(columns)

    matched = 0
    for symptom in symptom_names:
        norm = _normalise_key(symptom)
        if norm in feature_set:
            input_data[feature_set[norm]] = 1
            matched += 1

    if matched == 0:
        # No symptoms matched — return None gracefully
        return {
            "error": f"None of {len(symptom_names)} symptoms matched model features",
            "rf_prediction": None,
            "nb_prediction": None,
            "svm_prediction": None,
            "gb_prediction": None,
            "final_prediction": None,
            "confidence": 0.0,
        }

    input_df = pd.DataFrame([input_data], columns=columns)

    # Individual predictions
    rf_pred  = label_encoder.classes_[rf_model.predict(input_df)[0]]
    nb_pred  = label_encoder.classes_[nb_model.predict(input_df)[0]]
    svm_pred = label_encoder.classes_[svm_model.predict(input_df)[0]]
    gb_pred  = label_encoder.classes_[gb_model.predict(input_df)[0]] if GB_LOADED else rf_pred

    votes = [rf_pred, nb_pred, svm_pred, gb_pred]

    # Majority vote
    from collections import Counter
    vote_counts  = Counter(votes)
    final_pred   = vote_counts.most_common(1)[0][0]
    confidence   = vote_counts[final_pred] / len(votes)   # 0.25 – 1.0

    # RF probability as supplementary confidence (more calibrated)
    try:
        rf_proba = rf_model.predict_proba(input_df)[0]
        top_prob = float(rf_proba.max())
    except Exception:
        top_prob = confidence

    return {
        "rf_prediction":  rf_pred,
        "nb_prediction":  nb_pred,
        "svm_prediction": svm_pred,
        "gb_prediction":  gb_pred,
        "final_prediction": final_pred,
        "vote_agreement": confidence,   # fraction of models that agree
        "rf_confidence":  top_prob,     # RF probability of top class
        "matched_symptoms": matched,
    }
