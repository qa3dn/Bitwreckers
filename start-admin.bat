@echo off
echo Starting Bitwreckers Admin Panel...

echo.
echo Stopping all Node processes...
taskkill /f /im node.exe 2>nul

echo.
echo Cleaning admin build cache...
cd admin
if exist .next rmdir /s /q .next 2>nul

echo.
echo Starting Admin Panel...
start "Admin Panel" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\admin && npm run dev"

echo.
echo Starting Backend API...
start "Backend API" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\backend && npm run dev"

echo.
echo ✅ Admin Panel should be starting...
echo.
echo 🔗 Check these URLs:
echo Admin Panel: http://localhost:3000 (or 3001, 3003)
echo Backend API: http://localhost:3002
echo.
echo 🔐 To login:
echo 1. Create admin user in Supabase Dashboard > Authentication
echo 2. Use: admin@bitwreckers.com + your password
echo.
pause
