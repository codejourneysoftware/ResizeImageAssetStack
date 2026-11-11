import JSZip from "jszip";
import { ProcessedAsset } from "./imageProcessor";

/**
 * Checks if the app is currently running inside Tauri
 */
export function isTauriEnvironment(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(
    // Tauri v2 internals
    "__TAURI_INTERNALS__" in window ||
    "__TAURI__" in window
  );
}

/**
 * Opens a native folder selection dialog (in Tauri) or prompts for zip export
 */
export async function selectOutputDirectory(): Promise<string | null> {
  if (isTauriEnvironment()) {
    try {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const selected = await open({
        directory: true,
        multiple: false,
        title: "Select Output Folder for App Store Assets",
      });

      if (typeof selected === "string") {
        return selected;
      }
      return null;
    } catch (err) {
      console.warn("Tauri dialog open failed, falling back to mock / zip mode:", err);
      return null;
    }
  }

  // In browser mode, directory selection returns a virtual path
  return "AppStore_Export_Archive.zip";
}

/**
 * Checks if a directory path is valid (in Tauri)
 */
export async function verifyDirectory(path: string): Promise<boolean> {
  if (!path) return false;
  if (!isTauriEnvironment()) return true;

  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const valid = await invoke<boolean>("is_directory_valid", { path });
    return valid;
  } catch (err) {
    console.warn("verifyDirectory invoke error:", err);
    return false;
  }
}

/**
 * Opens the output folder in the OS file explorer (Tauri only)
 */
export async function openFolderInExplorer(path: string): Promise<void> {
  if (!path) return;

  if (isTauriEnvironment()) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("open_output_folder", { path });
    } catch (err) {
      console.error("Failed to open folder:", err);
    }
  }
}

/**
 * Saves processed assets either directly to disk via Tauri Rust command,
 * or packages into a downloadable ZIP in web mode.
 */
export async function exportAssets(
  outputDir: string,
  assets: ProcessedAsset[]
): Promise<{ success: boolean; totalWritten: number; message: string }> {
  if (isTauriEnvironment() && outputDir !== "AppStore_Export_Archive.zip") {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const payload = assets.map((asset) => ({
        target_folder: asset.targetFolder,
        filename: asset.filename,
        data_base64: asset.base64Data,
      }));

      const result = await invoke<{ success: boolean; total_written: number; message: string }>(
        "save_resized_images",
        {
          outputDir,
          files: payload,
        }
      );

      return {
        success: result.success,
        totalWritten: result.total_written,
        message: result.message,
      };
    } catch (err) {
      console.error("Tauri save_resized_images failed, falling back to zip:", err);
    }
  }

  // Web Browser fallback: Package into organized ZIP and download
  const zip = new JSZip();
  for (const asset of assets) {
    const folder = zip.folder(asset.targetFolder);
    if (folder) {
      folder.file(asset.filename, asset.blob);
    } else {
      zip.file(`${asset.targetFolder}/${asset.filename}`, asset.blob);
    }
  }

  const zipContent = await zip.generateAsync({ type: "blob" });
  const downloadUrl = URL.createObjectURL(zipContent);
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = outputDir.endsWith(".zip") ? outputDir : "AppStore_Export_Assets.zip";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);

  return {
    success: true,
    totalWritten: assets.length,
    message: `Downloaded ${assets.length} file(s) in structured ZIP archive.`,
  };
}

