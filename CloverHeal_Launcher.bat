@echo off
setlocal enabledelayedexpansion

:: Force execution directory to be exactly where this script lives, regardless of how it is launched
cd /d "%~dp0"

title CloverHeal Automated Starter
color 0B

echo ===================================================
echo     CloverHeal Unified Setup ^& Launcher Script
echo ===================================================
echo This script checks system requirements, installs all 
echo dependencies, and automatically launches the Backend, 
echo Frontend, and Admin Portal.
echo.

:: 1. Check System Requirements
echo [System Check] Verifying required software...
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python is not installed or not in PATH. Please install Python 3.9+ from python.org.
    pause
    exit /b
)
echo - Python is installed.

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in PATH. Please install Node.js 18+ from nodejs.org.
    pause
    exit /b
)
echo - Node.js is installed.
echo.

:: 2. Backend Setup
echo [1/3] Setting up Python Backend (ModelLLM)...
cd ModelLLM
if not exist "venv" (
    echo Creating isolated virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat
echo Installing Python dependencies...
python -m pip install --upgrade pip >nul 2>&1
pip install -r requirements.txt >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Some dependencies failed to install. The server might still run.
)
cd ..
echo.

:: 3. Frontend Setup
echo [2/3] Setting up Frontend Application (CloverHeal)...
cd CloverHeal
echo Installing npm dependencies...
call npm install --legacy-peer-deps >nul 2>&1
cd ..
echo.

:: 4. Admin Portal Setup
echo [3/3] Setting up Admin Portal (CloverHeal-Admin)...
cd CloverHeal-Admin
echo Installing npm dependencies...
call npm install --legacy-peer-deps >nul 2>&1
cd ..
echo.

echo ===================================================
echo Installation Complete! Starting all servers...
echo ===================================================

:: 5. Start Servers
start "CloverHeal Backend (FastAPI)" /D "%~dp0ModelLLM" cmd /k "venv\Scripts\activate.bat && python run.py"
start "CloverHeal Frontend" /D "%~dp0CloverHeal" cmd /k "npm run dev"
start "CloverHeal Admin Portal" /D "%~dp0CloverHeal-Admin" cmd /k "npm run dev"

echo All services have been started in separate windows!
echo - Backend API: http://localhost:8000
echo - Main Frontend: Generally http://localhost:5173
echo - Admin Portal: Generally http://localhost:5174
echo.
echo NOTE: Since the backend uses a local PostgreSQL database, 
echo please ensure PostgreSQL is running natively on your machine 
echo and the database credentials in ModelLLM/.env are correct.
echo ===================================================
echo Press any key to safely close this launcher tool (the 3 servers will keep running).
pause >nul
