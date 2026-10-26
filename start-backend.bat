@echo off
title Gov Opportunity Hub - Backend (Port 8080)
set "JAVA_HOME=C:\Program Files\Java\jdk-21"
set "PATH=C:\Users\naren\.tools\maven\bin;C:\Program Files\Java\jdk-21\bin;%PATH%"
cd /d "%~dp0backend"
echo ========================================================
echo Starting Spring Boot Backend on http://localhost:8080
echo ========================================================
mvn spring-boot:run
pause
