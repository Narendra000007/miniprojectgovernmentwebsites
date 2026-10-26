@echo off
title Gov Opportunity Hub - Launcher
echo ========================================================
echo Launching Centralized Government Opportunity Platform
echo SIT Tumakuru CSE - Phase 2 Demonstration
echo ========================================================
start "" "%~dp0start-backend.bat"
timeout /t 4 /nobreak >nul
start "" "%~dp0start-frontend.bat"
timeout /t 2 /nobreak >nul
start "" http://localhost:5173/
echo Both servers have been launched!
