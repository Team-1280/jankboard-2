use tauri::{Manager, Window};
// Create the command:
// This command must be async so that it doesn't run on the main thread.
#[tauri::command]
pub async fn close_splashscreen(window: Window) {
    println!("Closing splashscreen");
    // Close splashscreen
    match window.get_window("splashscreen") {
        Some(window) => window.close().unwrap(),
        None => tracing::info!("Couldn't find splashscreen window"),
    }

    match window.get_window("main") {
        Some(window) => window.show().unwrap(),
        None => tracing::info!("Couldn't find main window"),
    }
}
