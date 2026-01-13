@echo off
echo Starting Docker Compose with log capture...
docker-compose up --build > docker_startup.log 2>&1
echo Done. Check docker_startup.log for details.
