import json
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.database.models import Case, User
from app.core.security import get_current_user

from app.reasoning.deterministic.symptom_extractor import extract_symptoms
from app.reasoning.probabilistic.disease_matcher import match_diseases
from app.reasoning.deterministic.questioning.question_selector import select_questions
from app.reasoning.probabilistic.probability_engine import update_probabilities
from app.reasoning.probabilistic.disease_evidence_map import DISEASE_EVIDENCE
from app.reasoning.governance.severity_engine import determine_severity
from app.reasoning.llm.llm_engine import analyze_free_text_with_llm
from app.reasoning.ontology.icd_mapper import map_to_icd

router = APIRouter(tags=["User"])


# ---------- Request/Response Models ----------

class SymptomCheckRequest(BaseModel):
    text: str


class CaseCreateRequest(BaseModel):
    symptoms: List[str]
    answers: Dict[str, Any]
    additional_comments: Optional[str] = ""
    personal_info: Optional[Dict[str, str]] = None


# ---------- Risk Level Map ----------

DISEASE_RISK_LEVEL = {
    "Myocardial Infarction": "critical",
    "Angina": "critical",
    "Pulmonary Embolism": "critical",
    "Pneumonia": "moderate",
    "Bronchitis": "moderate",
    "GERD": "low",
    "Gastritis": "low"
}


# ---------- Step 1: Symptom Check ----------

@router.post("/symptom-check")
def symptom_check(request: SymptomCheckRequest):
    """
    Step 1: Analyze free-text symptoms.
    Returns extracted symptoms, candidate diseases, and mandatory questions.
    """
    text = request.text.strip()
    if not text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Symptom text cannot be empty"
        )

    symptoms = extract_symptoms(text)

    if not symptoms:
        return {
            "symptoms": [],
            "candidate_diseases": [],
            "mandatory_questions": [],
            "message": "No recognizable medical symptoms found"
        }

    disease_scores = match_diseases(symptoms)
    priors = {disease: float(score) for disease, score in disease_scores[:5]}

    # LLM analysis for dynamic questions
    llm_analysis = analyze_free_text_with_llm(text)
    dynamic_questions = llm_analysis.get("suggested_questions", [])

    questions = select_questions(symptoms)
    questions.extend(dynamic_questions)

    return {
        "symptoms": symptoms,
        "disease_priors": priors,
        "mandatory_questions": questions,
        "llm_signals": llm_analysis,
        "next_step": "Submit answers to /cases/create"
    }


# ---------- Step 2: Create Case (Final Evaluation) ----------

@router.post("/cases/create")
def create_case(
    request: CaseCreateRequest,
    db: Session = Depends(get_db)
):
    """
    Step 2: Final evaluation.
    Process symptoms + answers through the full Bayesian + LLM pipeline,
    create and save a case.
    """
    symptoms = request.symptoms
    answers = request.answers
    comments = request.additional_comments or ""

    if not symptoms:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Symptoms list cannot be empty"
        )

    # LLM analysis
    llm_analysis = analyze_free_text_with_llm(comments)
    risk_factors = llm_analysis.get("risk_factors", [])
    modifiers = llm_analysis.get("symptom_modifiers", [])
    free_text_multiplier = 1 + (0.2 * len(risk_factors)) + (0.15 * len(modifiers))

    # Base priors from symptom matching
    base_scores = match_diseases(symptoms)
    priors = {disease: float(score) for disease, score in base_scores}

    # Disease-specific answer evidence
    answer_evidence: Dict[str, float] = {}
    for disease, prior in priors.items():
        multiplier = 1.0
        disease_rules = DISEASE_EVIDENCE.get(disease, {})

        for key, value in answers.items():
            if key in disease_rules:
                if isinstance(value, bool) and value:
                    multiplier *= disease_rules[key]
                elif isinstance(value, int):
                    multiplier *= (1 + (value / 10) * disease_rules[key])

        multiplier *= free_text_multiplier
        answer_evidence[disease] = multiplier

    # Bayesian update
    posterior_probs = update_probabilities(priors, answer_evidence)

    # Build results — icd per disease, severity computed after top result is known
    results = []
    for disease, probability in posterior_probs.items():
        icd_info = map_to_icd(disease)
        results.append({
            "disease": disease,
            "probability_percent": probability,
            "icd": icd_info
        })

    results.sort(key=lambda x: x["probability_percent"], reverse=True)

    # Get top prediction
    top_result = results[0] if results else {}
    predicted_disease   = top_result.get("disease", "Unknown")
    predicted_probability = top_result.get("probability_percent", 0)
    icd_code            = top_result.get("icd", {})

    # Compute severity from disease identity + clinical signals
    predicted_severity = determine_severity(
        predicted_disease=predicted_disease,
        confidence=float(predicted_probability) / 100.0,
        chest_severity=int(answers.get("chest_severity", 0) or 0),
        exertion=bool(answers.get("exertion", False)),
        rest_breathlessness=bool(answers.get("rest_breathlessness", False)),
    )

    # Get all admins and find the one with the least pending cases
    admins = db.query(User).filter(User.role == "ADMIN").all()
    assigned_admin_id = None
    assigned_admin_email = None
    if admins:
        # Load balancing: min cases
        admin_loads = []
        for admin in admins:
            pending_count = db.query(Case).filter(Case.assigned_admin_id == admin.id, Case.status == "PENDING").count()
            admin_loads.append((admin.id, pending_count, admin.email))
        # Sort by pending_count
        admin_loads.sort(key=lambda x: x[1])
        assigned_admin_id = admin_loads[0][0]
        assigned_admin_email = admin_loads[0][2]

    # Save case to DB
    new_case = Case(
        user_id=None,  # Or set appropriately if authenticated users are submitting
        assigned_admin_id=assigned_admin_id,
        symptoms=json.dumps(symptoms),
        primary_symptom=symptoms[0] if symptoms else None,
        patient_info=json.dumps(request.personal_info or {}),
        symptom_duration=answers.get("duration", ""),
        ml_prediction=predicted_disease,
        ml_confidence=predicted_probability,
        llm_diagnosis=json.dumps(llm_analysis),
        severity=predicted_severity,
        recommendation="Doctor verification required",
        icd_code=json.dumps(icd_code) if icd_code else None,
        status="PENDING"
    )

    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    return {
        "case_id": new_case.id,
        "symptoms_identified": symptoms,
        "possible_conditions": results,
        "llm_signals": llm_analysis,
        "evidence_used": {
            "mandatory_answers": answers,
            "user_comments": comments
        },
        "assigned_admin_email": assigned_admin_email,
        "disclaimer": (
            "This system provides decision support only. "
            "Probabilities are derived from Bayesian inference and "
            "must be verified by a qualified medical professional."
        )
    }
