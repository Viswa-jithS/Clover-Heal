from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.database.models import Case, User
from app.core.security import require_role

router = APIRouter(prefix="/admin", tags=["Admin"])


class ReviewRequest(BaseModel):
    doctor_comment: Optional[str] = None
    severity: Optional[str] = None
    status: str = "VERIFIED"  # VERIFIED | REJECTED


@router.get("/pending")
def get_pending_cases(
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_role("ADMIN"))
):
    """Get all pending cases assigned to this specific admin."""
    cases = db.query(Case).filter(Case.status == "PENDING", Case.assigned_admin_id == _current_user.id).order_by(Case.created_at.desc()).all()

    return [
        {
            "id": case.id,
            "symptoms": case.symptoms,
            "primary_symptom": case.primary_symptom,
            "patient_info": case.patient_info,
            "symptom_duration": case.symptom_duration,
            "ml_prediction": case.ml_prediction,
            "ml_confidence": case.ml_confidence,
            "llm_diagnosis": case.llm_diagnosis,
            "severity": case.severity,
            "status": case.status,
            "doctor_comment": case.doctor_comment,
            "created_at": str(case.created_at) if case.created_at else None
        }
        for case in cases
    ]


@router.get("/cases")
def get_all_cases(
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_role("ADMIN"))
):
    """Get all cases assigned to this specific admin."""
    cases = db.query(Case).filter(Case.assigned_admin_id == _current_user.id).order_by(Case.created_at.desc()).all()

    return [
        {
            "id": case.id,
            "symptoms": case.symptoms,
            "primary_symptom": case.primary_symptom,
            "patient_info": case.patient_info,
            "symptom_duration": case.symptom_duration,
            "ml_prediction": case.ml_prediction,
            "ml_confidence": case.ml_confidence,
            "llm_diagnosis": case.llm_diagnosis,
            "severity": case.severity,
            "status": case.status,
            "doctor_comment": case.doctor_comment,
            "created_at": str(case.created_at) if case.created_at else None
        }
        for case in cases
    ]


@router.get("/cases/{case_id}")
def get_case_detail(
    case_id: int,
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_role("ADMIN"))
):
    """Get detailed case information."""
    case = db.query(Case).filter(Case.id == case_id).first()

    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found"
        )

    return {
        "id": case.id,
        "symptoms": case.symptoms,
        "primary_symptom": case.primary_symptom,
        "ml_prediction": case.ml_prediction,
        "ml_confidence": case.ml_confidence,
        "image_prediction": case.image_prediction,
        "llm_diagnosis": case.llm_diagnosis,
        "severity": case.severity,
        "recommendation": case.recommendation,
        "icd_code": case.icd_code,
        "status": case.status,
        "doctor_comment": case.doctor_comment,
        "created_at": str(case.created_at) if case.created_at else None,
        "updated_at": str(case.updated_at) if case.updated_at else None
    }


@router.put("/review/{case_id}")
def review_case(
    case_id: int,
    data: ReviewRequest,
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_role("ADMIN"))
):
    """Review a case — mark as verified/rejected with optional doctor comment."""
    case = db.query(Case).filter(Case.id == case_id).first()

    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found"
        )

    case.status = data.status
    if data.doctor_comment is not None:
        case.doctor_comment = data.doctor_comment
    if data.severity is not None:
        case.severity = data.severity

    db.commit()
    db.refresh(case)

    return {
        "message": f"Case {case_id} updated to {data.status}",
        "case_id": case_id,
        "status": case.status
    }


@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_role("ADMIN"))
):
    """Get dashboard statistics for cases assigned to this specific admin."""
    base_query = db.query(Case).filter(Case.assigned_admin_id == _current_user.id)
    total = base_query.count()
    pending = base_query.filter(Case.status == "PENDING").count()
    verified = base_query.filter(Case.status == "VERIFIED").count()
    rejected = base_query.filter(Case.status == "REJECTED").count()

    return {
        "total_cases": total,
        "pending": pending,
        "verified": verified,
        "rejected": rejected
    }
