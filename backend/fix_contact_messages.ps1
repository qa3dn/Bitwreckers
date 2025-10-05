Write-Host "Fixing contact_messages table..." -ForegroundColor Green
Set-Location $PSScriptRoot
node fix_contact_messages.js
Read-Host "Press Enter to continue"

