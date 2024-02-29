// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
mod telemetry;

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

fn main() {
    let rt = tokio::runtime::Runtime::new().expect("Failed to create Tokio runtime");

    rt.block_on(async {
        tauri::Builder::default()
            .setup(|app| {
                // create app handle and send it to our event listeners
                let app_handle = app.app_handle();

                tokio::spawn(async move {
                    crate::telemetry::subscribe_topics(app_handle.clone()).await;
                });

                Ok(())
            })
            .run(tauri::generate_context!())
            .expect("failed to run app")
    })
}
