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
                    #[cfg(debug_assertions)]
                    tracing::debug!("gpws: {}", b);

                    app_handle
                        .emit_all("telemetry_gpws", b)
                        .expect("Failed to emit telemetry_gpws event");
                }
            }
            _ => {}
        }
    }
}
