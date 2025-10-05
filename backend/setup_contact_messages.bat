@echo off
echo Setting up contact_messages table...
cd /d "%~dp0"
python setup_contact_messages.py
pause

