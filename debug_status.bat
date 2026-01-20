@echo off
echo DOCKER PS OUTPUT: > status.txt
docker ps >> status.txt
echo. >> status.txt
echo DOCKER COMPOSE LOGS: >> status.txt
docker-compose logs --tail=50 >> status.txt
