@echo off
setlocal enabledelayedexpansion
title CHOMP - Push to GitHub

echo ==================================================
echo    CHOMP  -  Push to GitHub
echo ==================================================
echo.

REM ---- Guard 1: is this the right folder? ----
if not exist "package.json" (
  echo [ERROR] This file is in the wrong place.
  echo.
  echo   Put push-to-github.bat INSIDE the chomp-landing folder,
  echo   right next to package.json - then run it again.
  echo.
  pause
  exit /b 1
)

REM ---- Guard 2: is git installed? ----
where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Git is not installed on this computer.
  echo.
  echo   1. Go to:  https://git-scm.com/download/win
  echo   2. Download and run the installer.
  echo   3. Click "Next" through every screen ^(defaults are fine^).
  echo   4. Close this window and run this file again.
  echo.
  pause
  exit /b 1
)

echo [1/6] Checking your git identity...
git config user.name  >nul 2>nul
if errorlevel 1 (
  git config user.name "Abdulrehman"
)
git config user.email >nul 2>nul
if errorlevel 1 (
  git config user.email "rehmanishtiaq9105@gmail.com"
)
echo       OK
echo.

echo [2/6] Starting the repository...
if exist ".git" (
  echo       Already started, skipping.
) else (
  git init
  if errorlevel 1 goto :failed
)
echo.

echo [3/6] Adding your files...
git add .
if errorlevel 1 goto :failed
echo.

echo [4/6] Saving a snapshot...
git commit -m "CHOMP - Next.js e-commerce landing page concept"
if errorlevel 1 (
  echo       Nothing new to save - continuing anyway.
)
echo.

echo [5/6] Connecting to your GitHub repo...
git branch -M main
git remote remove origin >nul 2>nul
git remote add origin https://github.com/Mani91050/chomp-landing.git
if errorlevel 1 goto :failed
echo       Connected to github.com/Mani91050/chomp-landing
echo.

echo [6/6] Uploading to GitHub...
echo.
echo  ......................................................
echo   WHEN IT ASKS FOR A PASSWORD:
echo   Your normal GitHub password will NOT work.
echo   Paste a Personal Access Token instead.
echo.
echo   Never made one? See step 2 in DEPLOY.md, or go to:
echo   github.com/settings/tokens  -^>  Generate new token
echo   -^>  tick "repo"  -^>  copy it here.
echo  ......................................................
echo.
git push -u origin main

if errorlevel 1 goto :failed

echo.
echo ==================================================
echo    SUCCESS! Your code is on GitHub.
echo.
echo    Look at: github.com/Mani91050/chomp-landing
echo.
echo    Next: deploy it on Vercel - see DEPLOY.md
echo ==================================================
echo.
pause
exit /b 0

:failed
echo.
echo ==================================================
echo    IT DID NOT WORK
echo ==================================================
echo.
echo  Copy the red/white error text above and send it to
echo  your assistant - it is usually a 10 second fix.
echo.
echo  Common causes:
echo    * Wrong password  ^-^>  you need a TOKEN, not your password
echo    * Token expired   ^-^>  generate a fresh one
echo    * No internet / VPN blocking GitHub
echo.
pause
exit /b 1
