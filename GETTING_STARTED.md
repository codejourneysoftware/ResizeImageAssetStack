# Getting Started & Project Reference

This document provides a complete guide and record of the workflows and commands used to develop, build, and run the **Tauri 2.0 + React 19 + TypeScript + Vite 6** codebase, as well as deployment and repository management.

All machine-specific paths and private credentials have been redacted to maintain open-source privacy standards.

---

## 1. Project Scaffolding & Dependencies

### Scaffold Tauri 2.0 App with React + TypeScript Template
Initializes the cross-platform project structure with Vite and React:
```bash
npx create-tauri-app . --template react-ts --manager npm --yes
```

### Install Core & Helper Packages
Installs frontend icons and ZIP compression (for web export fallback):
```bash
npm install
npm install jszip lucide-react @types/jszip
npm install @tauri-apps/plugin-dialog @tauri-apps/plugin-fs
```

---

## 2. Compilation & Build Verification

### Type Checking and Production Bundle
Runs TypeScript compilation (`tsc`) and Vite asset bundling:
```bash
npm run build
```

---

## 3. Privacy & Open-Source Scrubbing

### Verify Zero Personal Data in Repository
Recursively scans all project files (excluding `node_modules` and `dist`) to ensure no usernames, personal emails, or machine paths are present:
```powershell
Get-ChildItem -Recurse -File -Exclude node_modules,dist | 
  Where-Object { $_.FullName -notmatch '\\(node_modules|dist)\\' } | 
  Select-String -Pattern "personal_names_or_usernames"
```

### Set Generic Git Author Information (Local Repo Only)
Ensures that all commits and pushes are strictly attributed to the organization without personal author metadata:
```bash
git config --local user.name "codejourneysoftware"
git config --local user.email "codejourneysoftware@users.noreply.github.com"
```

---

## 4. Replacing Swift Codebase on GitHub

### Initialize Git & Connect Remote
Initializes the repository and connects to the existing GitHub remote:
```bash
git init
git remote add origin https://github.com/codejourneysoftware/ResizeImageAssetStack.git
git fetch origin main
```

### Stage Old Swift Removal & New Tauri Code
Performs a mixed reset to stage the complete deletion of the legacy Swift `Asset Pal/` directory while keeping all new Tauri + React files:
```bash
git branch -m main
git reset --mixed origin/main
git add -A
```

### Commit & Push to Main Branch
Replaces the GitHub codebase on the `main` branch:
```bash
git commit -m "feat: migrate codebase from Swift/macOS to Tauri + React/Vite"
git push -u origin main
```

---

## 5. GitHub Repository Visibility Management

### Switch Repository Visibility to Public via GitHub API
Updates the repository to public using the GitHub REST API:
```powershell
$headers = @{
    "Authorization" = "token <GITHUB_TOKEN>"
    "Accept"        = "application/vnd.github.v3+json"
    "User-Agent"    = "PowerShell-Script"
}

$body = @{
    "private" = $false
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "https://api.github.com/repos/codejourneysoftware/ResizeImageAssetStack" `
  -Method Patch `
  -Headers $headers `
  -Body $body `
  -ContentType "application/json"
```

### Verify Public Anonymous Access
Confirms that the repository is now publicly accessible without authentication:
```powershell
Invoke-RestMethod `
  -Uri "https://api.github.com/repos/codejourneysoftware/ResizeImageAssetStack" `
  -Headers @{ "User-Agent" = "PowerShell-Script" } | 
  Select-Object name, private, visibility, html_url
```

---

## 6. Launching & Running the Application

### Start Development Server
Starts the local development server with Hot Module Reloading (HMR):
```bash
npm run dev
```

### Open the Application in Default Browser
Launches the running interface:
```powershell
Start-Process "http://localhost:1420"
```

---

## 7. Developer Quick Reference

| Action | Command |
|---|---|
| **Run Web Dev Server** | `npm run dev` |
| **Run Native Tauri Desktop App** | `npm run tauri dev` |
| **Build Web Production Bundle** | `npm run build` |
| **Package Native Desktop Installers** | `npm run tauri build` |
| **Preview Production Build** | `npm run preview` |
