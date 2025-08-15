@echo off
echo Initializing Git Repository and Pushing to GitHub...
echo.

echo Step 1: Initialize Git Repository
git init

echo.
echo Step 2: Add all files
git add .

echo.
echo Step 3: Create initial commit
git commit -m "Initial commit: Complete Monexa music production finance platform with YouTube Music style media player"

echo.
echo Step 4: Add remote origin
git remote add origin https://github.com/purimsq/Monexa.git

echo.
echo Step 5: Set main branch
git branch -M main

echo.
echo Step 6: Push to GitHub
git push -u origin main

echo.
echo ✅ Successfully pushed to GitHub!
echo Repository: https://github.com/purimsq/Monexa
echo.
pause
