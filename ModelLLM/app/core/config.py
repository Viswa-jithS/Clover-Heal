from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    # Project metadata
    PROJECT_NAME: str = "CloverHeal Advanced Diagnostic Engine"

    # Database
    DATABASE_URL: str

    # JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Groq LLM
    GROQ_API_KEY: str
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    # File handling
    UPLOAD_DIR: Path = Path("uploads")

    # ML model paths
    SKIN_MODEL_PATH: Path = Path("models/best_finetuned.h5")
    SKIN_LABEL_MAP_PATH: Path = Path("models/label_map.pkl")
    DISEASE_RF_MODEL_PATH: Path = Path("models/rf_model.pkl")
    DISEASE_NB_MODEL_PATH: Path = Path("models/nb_model.pkl")
    DISEASE_SVM_MODEL_PATH: Path = Path("models/svm_model.pkl")
    DISEASE_GB_MODEL_PATH: Path = Path("models/gb_model.pkl")
    DISEASE_LABEL_ENCODER_PATH: Path = Path("models/label_encoder.pkl")

    class Config:
        env_file = ".env"


settings = Settings()