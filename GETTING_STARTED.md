# Getting Started & Developer Guide

Welcome to **Resize Image Asset Stack // Mainframe V1.0** — a high-performance, cross-platform utility built with **Tauri 2.0 + React 19 + TypeScript + Vite 6** designed to automate formatting, padding, and resizing screenshots for Apple App Store and Google Play Store submissions.

---

## 🛠️ Prerequisites

Before building and running the project, ensure you have the following installed on your workstation:

- **Node.js:** v18.0.0 or later (v20+ recommended)
- **npm:** v9.0.0 or later
- **Rust & Cargo:** (Required for running/building the native desktop app via Tauri)
  - [Install Rust via rustup](https://www.rust-lang.org/tools/install)
  - Standard C++ build tools for your platform (e.g. Visual Studio Build Tools on Windows, Xcode CLI tools on macOS)

> **Note:** You can run and test the web version (`npm run dev`) immediately using just Node.js and npm without having Rust installed.

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/codejourneysoftware/ResizeImageAssetStack.git
cd ResizeImageAssetStack
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
# Start the web client with instant hot-reload:
npm run dev

# Or launch the native Tauri desktop application:
npm run tauri dev
```
The web development interface will be live at `http://localhost:1420`.

---

## 📦 Building for Production

### Web Production Bundle
Compile TypeScript and generate an optimized production web build:
```bash
npm run build
```
Output files will be generated into the `dist/` directory.

### Native Desktop Binaries & Installers
Package native installers (`.exe`/`.msi` on Windows, `.dmg`/`.app` on macOS, `.deb`/`.AppImage` on Linux):
```bash
npm run tauri build
```
Output binaries will be placed in `src-tauri/target/release/bundle/`.

---

## 🗂️ Project Architecture

```
ImageResizeAssetStack/
├── public/                 # Static assets, application icons, and favicons
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components (SizeGraphicView, etc.)
│   ├── types/              # Type definitions and target specifications (sizes.ts)
│   ├── utils/              # Resizing engine and desktop/web bridge
│   │   ├── imageProcessor.ts   # Aspect-ratio calculation, blur filter, smart-fill
│   │   └── tauriBridge.ts      # Native filesystem I/O with web ZIP export fallback
│   ├── App.css             # Monospaced CRT terminal styling, scanlines, and phosphor glows
│   ├── App.tsx             # Main mainframe terminal UI, drag-and-drop, log stream
│   └── main.tsx            # React application entry point
├── src-tauri/              # Rust desktop backend
│   ├── capabilities/       # Security permissions (dialog, filesystem, opener)
│   ├── icons/              # Platform desktop application icons
│   ├── src/
│   │   ├── lib.rs          # Native commands (directory selection, disk writing)
│   │   └── main.rs         # Tauri application bootstrap
│   ├── Cargo.toml          # Rust dependencies and release profile
│   └── tauri.conf.json     # Window dimensions, title, and bundle configuration
├── index.html              # HTML shell
├── package.json            # Node.js dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 🎨 Core Engine Specifications

### 1. Smart-Fill Resizing Engine
- **Safety Black Background:** The base canvas is filled with solid black (`#000000`) to guarantee opaque 24-bit/32-bit PNG output.
- **Aspect-Fill Gaussian Blur:** Fills the background with an amplified, edge-clamped blur of the original image with bleed padding and a subtle `0.2` opacity black contrast tint.
- **Smart-Fill:** Images matching within `0.005` of the target aspect ratio are automatically filled to eliminate edge slivers; all other images are fitted centered and crisp against the blurred background.

### 2. Dual Export Pipeline
- **Desktop (Tauri):** Prompts for a local folder and writes assets into structured directories on disk (`[OPEN EXPORT]` reveals the directory in your system file explorer).
- **Web Browser:** Bundles all generated directories and files into a downloadable structured `.zip` archive using JSZip.

---

## 🕹️ Command Reference Cheat Sheet

| Task | Command |
|---|---|
| **Start Web Client** | `npm run dev` |
| **Start Native Desktop App** | `npm run tauri dev` |
| **Type Check & Build Web** | `npm run build` |
| **Package Desktop App** | `npm run tauri build` |
| **Preview Built Web App** | `npm run preview` |
