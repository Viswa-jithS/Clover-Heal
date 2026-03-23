import uuid
from sqlalchemy import Column, String, Integer, Float, Text, ForeignKey, DateTime, create_engine
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    
    # Try different syntaxes here:
    cases = relationship("Case", primaryjoin="User.id==Case.user_id", back_populates="user")
    
class Case(Base):
    __tablename__ = "cases"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    assigned_admin_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    user = relationship("User", foreign_keys=[user_id], back_populates="cases")

engine = create_engine("sqlite:///:memory:")
from sqlalchemy.orm import configure_mappers
configure_mappers()
print("Success!")
