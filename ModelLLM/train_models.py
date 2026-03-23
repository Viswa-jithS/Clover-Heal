"""
CloverHeal ML Model Retraining Script
======================================
Trains RF, BernoulliNB, SVM, and GradientBoosting classifiers on the
symptom-disease TSV dataset with data augmentation.

Since each disease has only ONE canonical symptom set in the TSV, we
augment via symptom-dropout: for each disease we generate N samples by
randomly masking 0–40 pct of its symptoms.  This teaches the models to
handle partial symptom inputs (realistic for a patient assessment).

Usage:
    cd d:\\CLOVERHEAL\\ModelLLM
    python train_models.py
"""

import pickle
import re
import random
from collections import defaultdict
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.naive_bayes import BernoulliNB
from sklearn.svm import LinearSVC
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import KFold, cross_val_score
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import classification_report

random.seed(42)
np.random.seed(42)

# ── Paths ──────────────────────────────────────────────────────────────────
BASE   = Path(__file__).parent
TSV    = BASE / "data" / "raw_datasets" / "hdsymptoms.tsv"
MODELS = BASE / "models"
MODELS.mkdir(exist_ok=True)

# ── Hyper-params ────────────────────────────────────────────────────────────
N_AUGMENT    = 30   # synthetic samples per disease
DROPOUT_MAX  = 0.4  # max fraction of symptoms to randomly drop per sample

# ── 1. Parse TSV ────────────────────────────────────────────────────────────
print("📂  Loading dataset …")

def clean_key(raw: str) -> str:
    """Normalise a UMLS symptom key — keeps spaces (matches inference code)."""
    raw = raw.split("^")[0].strip()
    return re.sub(r"\s+", " ", raw).lower()


disease_symptoms: dict[str, list] = defaultdict(list)
current_disease: str = None   # type: ignore[assignment]

with open(TSV, encoding="utf-8") as f:
    next(f)  # skip header
    for line in f:
        parts = line.rstrip("\n").split("\t")
        if parts[0].strip():
            current_disease = parts[0].strip()
        if current_disease and len(parts) >= 3 and parts[2].strip():
            symptom = clean_key(parts[2].strip())
            if symptom:
                disease_symptoms[current_disease].append(symptom)

print(f"   {len(disease_symptoms)} diseases loaded")

# ── 2. Build feature set ────────────────────────────────────────────────────
all_symptoms = sorted({s for syms in disease_symptoms.values() for s in syms})
all_diseases = sorted(disease_symptoms.keys())
print(f"   {len(all_symptoms)} unique symptom features")
print(f"   {len(all_diseases)} disease classes")

sym_index = {s: i for i, s in enumerate(all_symptoms)}

# ── 3. Data augmentation ─────────────────────────────────────────────────────
print(f"\n🔀  Augmenting: {N_AUGMENT} samples per disease …")

X_rows, y_rows = [], []
for disease, syms in disease_symptoms.items():
    for _ in range(N_AUGMENT):
        row = [0] * len(all_symptoms)
        n_drop = int(random.uniform(0, DROPOUT_MAX) * len(syms))
        kept   = random.sample(syms, max(1, len(syms) - n_drop))
        for s in kept:
            if s in sym_index:
                row[sym_index[s]] = 1
        X_rows.append(row)
        y_rows.append(disease)

X = pd.DataFrame(X_rows, columns=all_symptoms)
y = np.array(y_rows)

le = LabelEncoder()
y_enc = le.fit_transform(y)
print(f"   Training set shape: {X.shape}")

# ── 4. Models ───────────────────────────────────────────────────────────────
models = {
    "Random Forest": RandomForestClassifier(
        n_estimators=300,
        max_depth=None,
        min_samples_split=2,
        class_weight="balanced",
        random_state=42,
        n_jobs=-1,
    ),
    "BernoulliNB": BernoulliNB(alpha=0.3),
    "SVM (Linear)": CalibratedClassifierCV(
        LinearSVC(C=1.0, class_weight="balanced", max_iter=3000, random_state=42)
    ),
    "GradientBoosting": GradientBoostingClassifier(
        n_estimators=150,
        learning_rate=0.15,
        max_depth=4,
        subsample=0.8,
        max_features="sqrt",
        random_state=42,
    ),
}

# ── 5. Cross-validate (KFold — safe for augmented data) ─────────────────────
print("\n🔬  Running 5-fold cross-validation …\n")
cv = KFold(n_splits=5, shuffle=True, random_state=42)
cv_results = {}
for name, model in models.items():
    print(f"   CV: {name} …", end=" ", flush=True)
    scores = cross_val_score(model, X, y_enc, cv=cv, scoring="accuracy", n_jobs=-1)
    cv_results[name] = scores
    print(f"mean={scores.mean():.4f}  std={scores.std():.4f}  per-fold={np.round(scores,4)}")

# ── 6. Retrain on full data & save ──────────────────────────────────────────
print("\n💾  Training on full dataset and saving …\n")

save_map = {
    "Random Forest":     MODELS / "rf_model.pkl",
    "BernoulliNB":       MODELS / "nb_model.pkl",
    "SVM (Linear)":      MODELS / "svm_model.pkl",
    "GradientBoosting":  MODELS / "gb_model.pkl",
}

for name, model in models.items():
    print(f"   Training {name} …", end=" ", flush=True)
    model.fit(X, y_enc)
    with open(save_map[name], "wb") as f:
        pickle.dump(model, f)
    print(f"saved → {save_map[name].name}")

# Save label encoder
with open(MODELS / "label_encoder.pkl", "wb") as f:
    pickle.dump(le, f)
print("   Label encoder saved")

# ── 7. Summary ──────────────────────────────────────────────────────────────
print("\n" + "="*60)
print("  CROSS-VALIDATION ACCURACY")
print("="*60)
for name, scores in cv_results.items():
    bar = "█" * int(scores.mean() * 40)
    print(f"  {name:25s}  {scores.mean()*100:5.1f}%  {bar}")
best = max(cv_results, key=lambda n: cv_results[n].mean())
print(f"\n  ✅ Best: {best} — {cv_results[best].mean()*100:.1f}%")
print("="*60)
print("\n  Models saved to models/")
print("  Restart FastAPI server to load new models.\n")
