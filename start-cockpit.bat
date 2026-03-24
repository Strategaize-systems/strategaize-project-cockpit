@echo off
title StrategAIze Project Cockpit
echo.
echo   StrategAIze Project Cockpit
echo   Starting on http://localhost:4400
echo.
echo   Press Ctrl+C to stop
echo.
cd /d "%~dp0app"
start "" "http://localhost:4400"
npm run dev
