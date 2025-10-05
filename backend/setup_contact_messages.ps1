Write-Host "Setting up contact_messages table..." -ForegroundColor Green
Set-Location $PSScriptRoot
python setup_contact_messages.py
Read-Host "Press Enter to continue"

