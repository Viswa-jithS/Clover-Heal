@echo off
setlocal enabledelayedexpansion
title CloverHeal Automated Starter
color 0B

echo ===================================================
echo     CloverHeal Unified Setup ^& Launcher Script
echo ===================================================
echo This script will install all required dependencies
echo and launch the Backend, Frontend, and Admin Portal.
echo.

:: 1. Backend Setup
echo [1/3] Setting up Python Backend (ModelLLM)...
cd ModelLLM
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat
echo Installing Python dependencies...
pip install -r requirements.txt >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Failed to install some Python dependencies. The server might still run if packages are already present.
)
echo Starting Backend Server on port 8000...
start "CloverHeal Backend" cmd /c "venv\Scripts\activate.bat && python run.py"
cd ..
echo.

:: 2. Frontend Setup
echo [2/3] Setting up Frontend Application (CloverHeal)...
cd CloverHeal
echo Installing npm dependencies...
call npm install --legacy-peer-deps >nul 2>&1
echo Starting Frontend Development Server on port 5173...
start "CloverHeal Frontend" cmd /c "npm run dev"
cd ..
echo.

:: 3. Admin Portal Setup
echo [3/3] Setting up Admin Portal (CloverHeal-Admin)...
cd CloverHeal-Admin
echo Installing npm dependencies...
call npm install --legacy-peer-deps >nul 2>&1
echo Starting Admin Portal Development Server...
start "CloverHeal Admin Portal" cmd /c "npm run dev"
cd ..
echo.

echo ===================================================
echo All services have been started in separate windows!
echo - Backend API: http://localhost:8000
echo - Main Frontend: Check the Frontend terminal window
echo - Admin Portal: Check the Admin terminal window
echo ===================================================
echo Press any key to safely stop this launcher (running servers will not be closed).
pause >nul
