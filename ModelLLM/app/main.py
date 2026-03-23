from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.session import engine

from app.routes.auth import router as auth_router
from app.routes.user import router as user_router
from app.routes.admin import router as admin_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CloverHeal API",
    description="AI-powered medical diagnostic support — Bayesian + LLM hybrid clinical decision system",
    version="3.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:5174", 
        "http://localhost:5175", 
        "http://localhost:5176", 
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(admin_router)


@app.get("/")
def root():
    return {
        "status": "running",
        "message": "CloverHeal API active. Visit /docs for API documentation."
    }

# Trigger hot-reload after database schema fix
