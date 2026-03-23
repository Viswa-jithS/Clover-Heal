"""
Skin lesion image classification using fine-tuned MobileNet.

Model trained on HAM10000 dataset.
Classes: akiec, bcc, bkl, df, mel, nv, vasc
"""
import pickle
import numpy as np
from pathlib import Path
from app.core.config import settings

# Lazy-load model to avoid import-time TensorFlow overhead
_model = None
_label_map = None
_MODEL_LOADED = False

IMG_SIZE = (224, 224)


def _load_model():
    """Load the MobileNet skin model and label map."""
    global _model, _label_map, _MODEL_LOADED

    if _MODEL_LOADED:
        return

    try:
        from tensorflow.keras.models import load_model

        _model = load_model(str(settings.SKIN_MODEL_PATH))

        with open(settings.SKIN_LABEL_MAP_PATH, "rb") as f:
            _label_map = pickle.load(f)

        _MODEL_LOADED = True
        print("[INFO] Skin lesion model loaded successfully")
    except Exception as e:
        print(f"[WARNING] Skin lesion model could not be loaded: {e}")
        _MODEL_LOADED = False


def predict_skin_image(image_path: str) -> dict:
    """
    Predict skin condition from an image.

    Args:
        image_path: Path to the skin lesion image.

    Returns:
        Dict with predictions and confidence scores.
    """
    _load_model()

    if not _MODEL_LOADED or _model is None:
        return {"error": "Skin model not loaded", "predictions": []}

    try:
        from tensorflow.keras.preprocessing import image
        from tensorflow.keras.applications.mobilenet import preprocess_input

        # Load and preprocess image
        img = image.load_img(image_path, target_size=IMG_SIZE)
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        # Predict
        preds = _model.predict(x, verbose=0)[0]

        # Build results
        results = []
        for idx, confidence in enumerate(preds):
            label = _label_map.get(idx, f"class_{idx}") if _label_map else f"class_{idx}"
            results.append({
                "condition": label,
                "confidence": float(confidence)
            })

        results.sort(key=lambda r: r["confidence"], reverse=True)

        # Determine risk level
        primary = results[0]
        HIGH_RISK = ["mel"]
        MODERATE_RISK = ["bcc", "akiec"]

        if primary["condition"] in HIGH_RISK:
            risk = "high"
            recommendation = "URGENT: Immediate dermatologist consultation recommended."
        elif primary["condition"] in MODERATE_RISK:
            risk = "moderate"
            recommendation = "Dermatologist evaluation recommended."
        else:
            risk = "low"
            recommendation = "Likely benign, but monitor for changes."

        return {
            "primary_prediction": primary["condition"],
            "confidence": primary["confidence"],
            "risk_level": risk,
            "recommendation": recommendation,
            "all_predictions": results[:5]
        }

    except Exception as e:
        return {"error": f"Image prediction failed: {str(e)}", "predictions": []}
