// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

mod telemetry;

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // create app handle and send it to our event listeners
            let app_handle = app.app_handle();
            telemetry::subscribe_topics(&app_handle);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("failed to run app")
}
