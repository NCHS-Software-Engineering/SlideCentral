@echo off
echo Changing directory to my-app...
cd /d "./my-app"

echo Starting node server...
start node server.js

echo Starting npm...
npm start

echo Batch file execution complete.
pause