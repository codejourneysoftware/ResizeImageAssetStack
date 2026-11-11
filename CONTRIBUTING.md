# 🤝 Contributing to Resize Image Asset Stack

First off, thank you for considering contributing to **Resize Image Asset Stack**! It is community contributions that keep this tool fast, cross-platform, and up to date with evolving App Store and Google Play specifications.

---

## 🛠️ How to Contribute

We follow standard GitHub Pull Request (PR) workflow:

1. **Fork the repository** to your own GitHub account.
2. **Clone the project** locally:
   ```bash
   git clone https://github.com/your-username/ImageResizeAssetStack.git
   cd ImageResizeAssetStack
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch** locally:
   ```bash
   git checkout -b feature/add-new-target-spec
   ```
5. **Make and test your changes**:
   - Run `npm run dev` to test in web preview.
   - Run `npm run tauri dev` to test in desktop Tauri environment.
   - Verify that `npm run build` succeeds cleanly.
6. **Commit your changes** with descriptive commit messages.
7. **Push to your fork** and open a Pull Request!

---

## 🎯 Contribution Areas & Guidelines

- **New Resolutions / Platforms:** When adding new screen sizes to `src/types/sizes.ts`, ensure they strictly adhere to official unscaled resolution guidelines from Apple or Google Play.
- **CRT Aesthetic:** All UI typography must remain strictly monospaced to preserve the retro CRT mainframe feel.
- **Cross-Platform Compatibility:** Ensure features work seamlessly both inside the Tauri desktop shell and in the browser preview.
- **Privacy & Security:** Never commit personal API keys, machine paths, or private credentials.

Thank you for helping make app store asset generation frictionless!

