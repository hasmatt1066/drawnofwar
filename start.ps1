# PowerShell script to start the development server
Write-Host "Starting Drawn of War 2 development server..." -ForegroundColor Green
& node node_modules/next/dist/bin/next dev --turbopack