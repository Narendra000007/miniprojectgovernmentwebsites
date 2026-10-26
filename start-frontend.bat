@echo off
title Gov Opportunity Hub - Frontend (Port 5173)
set "PATH=C:\Users\naren\.tools\node;%PATH%"
cd /d "%~dp0frontend"
echo ========================================================
echo Starting React Vite Frontend on http://localhost:5173
echo ========================================================
npm run dev
pause
