@echo off
echo ==========================================
echo FORCE STARTING HOSPITAL SYSTEM
echo ==========================================
echo [1/3] Removing old containers...
docker-compose down --remove-orphans
echo.
echo [2/3] Pruning build cache (optional, ensures fresh build)...
echo y | docker builder prune
echo.
echo [3/3] Building and Starting...
docker-compose up -d --build --force-recreate
echo.
echo ==========================================
echo If you see errors above, please copy them!
echo If successful, open http://localhost:5173
pause
