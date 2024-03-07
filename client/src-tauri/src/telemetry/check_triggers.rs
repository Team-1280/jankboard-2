use tauri::{AppHandle, Manager};

pub fn check_triggers(
    app_handle: &AppHandle,
    topic_name: &str,
    data: &network_tables::Value,
    previous_gpws: &bool,
) {
    if topic_name == "gpws" {
        match data {
            network_tables::Value::Boolean(b) => {
                if *b != *previous_gpws {
                    if cfg!(debug_assertions) {
                        println!("gpws changed from {} to {}", previous_gpws, b);
                    }
                    app_handle
                        .emit_all("telemetry_gpws", b)
                        .expect("Failed to emit telemetry_gpws event");
                }
            }
            _ => {}
        }
    }
}
