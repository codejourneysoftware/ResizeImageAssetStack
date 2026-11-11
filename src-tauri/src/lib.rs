use std::fs;
use std::path::Path;
use base64::prelude::*;
use serde::{Deserialize, Serialize};
use tauri_plugin_opener::OpenerExt;

#[derive(Debug, Deserialize)]
pub struct ImageFilePayload {
    pub target_folder: String,
    pub filename: String,
    pub data_base64: String,
}

#[derive(Debug, Serialize)]
pub struct SaveResult {
    pub success: bool,
    pub total_written: usize,
    pub message: String,
}

#[tauri::command]
fn is_directory_valid(path: String) -> bool {
    let p = Path::new(&path);
    p.exists() && p.is_dir()
}

#[tauri::command]
fn open_output_folder(app: tauri::AppHandle, path: String) -> Result<(), String> {
    let p = Path::new(&path);
    if !p.exists() {
        return Err("Directory does not exist".into());
    }
    app.opener()
        .open_path(&path, None::<&str>)
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn save_resized_images(output_dir: String, files: Vec<ImageFilePayload>) -> Result<SaveResult, String> {
    let base_path = Path::new(&output_dir);
    if !base_path.exists() {
        fs::create_dir_all(base_path).map_err(|e| format!("Failed to create output directory: {}", e))?;
    }

    let mut written = 0;
    for file in files {
        let folder_path = base_path.join(&file.target_folder);
        if !folder_path.exists() {
            fs::create_dir_all(&folder_path).map_err(|e| format!("Failed to create target folder {}: {}", file.target_folder, e))?;
        }

        let file_path = folder_path.join(&file.filename);
        let bytes = BASE64_STANDARD
            .decode(&file.data_base64)
            .map_err(|e| format!("Base64 decoding failed for {}: {}", file.filename, e))?;

        fs::write(&file_path, bytes)
            .map_err(|e| format!("Failed to write file {}: {}", file.filename, e))?;

        written += 1;
    }

    Ok(SaveResult {
        success: true,
        total_written: written,
        message: format!("Successfully wrote {} asset(s) to disk", written),
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            is_directory_valid,
            open_output_folder,
            save_resized_images
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
