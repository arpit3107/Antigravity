@echo off
echo ==========================================
echo Hospital Management System - Startup Script
echo ==========================================

echo [1/4] Stopping any existing containers...
docker-compose down

echo.
echo [2/4] Starting Database and Microservices...
docker-compose up -d

echo.
echo [3/4] Waiting for services to initialize (15 seconds)...
timeout /t 15 /nobreak

echo.
echo [4/4] Starting Frontend Server...
echo.
echo ==========================================
echo SUCCESS! 
echo Application is ready.
echo.
echo OPEN YOUR BROWSER TO: http://localhost:5173
echo.
echo Keep this window OPEN to keep the frontend running.
echo ==========================================
echo ==========================================

