<p align="center">
  <img src="https://img.shields.io/badge/macOS-12.0+-black?style=for-the-badge&logo=apple" alt="macOS Version">
  <img src="https://img.shields.io/badge/Swift-5.0+-orange?style=for-the-badge&logo=swift" alt="Swift Version">
</p>

# Resize Image Asset Stack // Mainframe V1.0

A retro-styled, high-performance macOS utility built specifically to automate the most annoying part of iOS development: prepping and padding **App Store screenshots**. 

Resize Image Asset Stack features a sleek, purely `monospaced` CRT terminal aesthetic that auto-scrolls and logs commands as it processes your assets in the background.

## 🖲️ Features

- **Mass Bulk-Processing:** Drop multiple files or entire folders into the window to queue them.
- **Auto-Rotation Padding:** The engine automatically analyzes each input image's aspect ratio and assigns it to either the Portrait or Landscape targets mathematically.
- **Strict Size Generation:** Outputs exact, pixel-perfect image dimensions strictly adhering to Apple's App Store Connect rules without breaking UI scaling limits, including:
  - `6.5-inch` iPhone (1242 × 2688px)
  - `6.7-inch` iPhone (1284 × 2778px)
  - `12.9-inch` iPad (2048 × 2732px)
  - `13-inch` iPad (2064 × 2752px)
- **Zero-Friction Terminal UI:** Watch the background logic unfold in gorgeous, neon-green retro console output instead of standard loading bars.

## 🚀 How to Use
1. Clone or download this repository.
2. Build and run `Asset Pal` via Xcode (requires macOS 12.0+).
3. Drop one or more images anywhere onto the black terminal window.
4. Select your output folder. 
5. The mainframe will instantly crunch the files, preserve resolution sizes, and save them structured securely to your output directory.

*Built entirely using SwiftUI and CoreImage/AppKit pipelines.*
