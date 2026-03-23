import uuid
from sqlalchemy import Column, String, Integer, Float, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, nullable=False, default="USER")  # USER | DOCTOR | ADMIN
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    cases = relationship("Case", foreign_keys="Case.user_id", back_populates="user")


class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    assigned_admin_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    symptoms = Column(Text, nullable=False)
    primary_symptom = Column(String)
    patient_info = Column(Text)          # JSON: name, age, gender, phone, email
    symptom_duration = Column(String)    # e.g. '1-3-days'
    ml_prediction = Column(String)
    ml_confidence = Column(Float)
    image_prediction = Column(String)
    llm_diagnosis = Column(String)
    severity = Column(String)
    recommendation = Column(Text)
    icd_code = Column(String)

    status = Column(String, default="PENDING")  # PENDING | VERIFIED | REJECTED
    doctor_comment = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", foreign_keys=[user_id], back_populates="cases")