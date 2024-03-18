// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::net::Ipv4Addr;

use tauri::Manager;
mod telemetry;
use tracing_subscriber::FmtSubscriber;
mod close_splashscreen;
use close_splashscreen::close_splashscreen;

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

const NTABLE_IP: Ipv4Addr = Ipv4Addr::new(10, 12, 80, 2);
const NTABLE_PORT: u16 = 5810;

fn main() {
    let rt = tokio::runtime::Runtime::new().expect("Failed to create Tokio runtime");

    // set the environment variable RUST_LOG to debug in order to see debug messages
    let subscriber = FmtSubscriber::builder()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .finish();
    tracing::subscriber::set_global_default(subscriber).unwrap();

    rt.block_on(async {
        tauri::Builder::default()
            .setup(|app| {
                // create app handle and send it to our event listeners
                let app_handle = app.app_handle();

                tokio::spawn(async move {
                    crate::telemetry::subscribe_topics(app_handle, NTABLE_IP, NTABLE_PORT).await;
                });

                Ok(())
            })
            .invoke_handler(tauri::generate_handler![close_splashscreen])
            .run(tauri::generate_context!())
            .expect("failed to run app")
    })
}
