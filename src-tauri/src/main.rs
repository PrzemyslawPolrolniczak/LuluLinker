#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;

#[tauri::command]
async fn test_command(lulu_fe_path: String, target_path: String) -> String {
    let output = Command::new("sh")
        .arg("-c")
        .arg(format!("cd {path} && npm install", path = lulu_fe_path))
        .output()
        .expect("failed");

    let str_output = String::from_utf8(output.stdout).unwrap();
    let str_err = String::from_utf8(output.stderr).unwrap();

    return str_output;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![test_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
