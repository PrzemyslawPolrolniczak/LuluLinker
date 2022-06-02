#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;

#[tauri::command]
async fn push_lulu_fe(lulu_fe_path: String) -> String {
    let output_build = Command::new("sh")
        .arg("-c")
        .arg(format!("cd {path} && npm run build", path = lulu_fe_path))
        .output()
        .expect("failed");

    let output_link = Command::new("sh")
        .arg("-c")
        .arg(format!("cd {path} && yalc push", path = lulu_fe_path))
        .output()
        .expect("failed");

    let str_output_build = String::from_utf8(output_build.stdout).unwrap();
    let str_output_link = String::from_utf8(output_link.stdout).unwrap();
    let str_err_build = String::from_utf8(output_build.stderr).unwrap();
    let str_err_link = String::from_utf8(output_link.stderr).unwrap();

    return format!("{}{}", str_output_build, str_output_link);
}

#[tauri::command]
async fn link_project(project_path: String) -> String {
    let output = Command::new("sh")
        .arg("-c")
        .arg(format!(
            "cd {path} && yalc link @lulu/lulu-fe",
            path = project_path
        ))
        .output()
        .expect("failed");

    let str_output = String::from_utf8(output.stdout).unwrap();
    let str_err = String::from_utf8(output.stderr).unwrap();

    return format!("{}{}", str_output, str_err);
}

#[tauri::command]
async fn unlink_project(project_path: String) -> String {
    let output_unlink = Command::new("sh")
        .arg("-c")
        .arg(format!(
            "cd {path} && yalc remove @lulu/lulu-fe",
            path = project_path
        ))
        .output()
        .expect("failed");

    let output_reinstall = Command::new("sh")
        .arg("-c")
        .arg(format!(
            "cd {path} && rm -rf node_modules && npm install",
            path = project_path
        ))
        .output()
        .expect("failed");

    let str_output_unlink = String::from_utf8(output_unlink.stdout).unwrap();
    let str_err_unlink = String::from_utf8(output_unlink.stderr).unwrap();
    let str_output_reinstall = String::from_utf8(output_reinstall.stdout).unwrap();
    let str_err_reinstall = String::from_utf8(output_reinstall.stderr).unwrap();

    return format!(
        "build: {}{}, reinstall: {}{}",
        str_output_unlink, str_err_unlink, str_output_reinstall, str_err_reinstall
    );
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            push_lulu_fe,
            link_project,
            unlink_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
