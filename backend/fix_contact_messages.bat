@echo off
echo Fixing contact_messages table...
cd /d "%~dp0"
node fix_contact_messages.js
pause

