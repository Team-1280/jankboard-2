use network_tables::v4::{MessageData, Subscription};
use serde_json::to_string;
use tauri::{AppHandle, Manager};
mod create_client;
mod create_subscription;

use crate::telemetry::create_client::create_client;
use create_subscription::create_subscription;

/// Attempts to subscribe to NetworkTables topics and send the data to the frontend.
///
/// This function creates a NetworkTables client and subscribes to all
/// topics. When new data is received, it is serialized as JSON and emitted
/// to all connected frontends using the "telemetry_data" event.
///
/// The function loops forever, retrying connection every 3 seconds, reconnecting if the client disconnects.
pub async fn subscribe_topics(
    app_handle: AppHandle,
    ntable_ip: (u8, u8, u8, u8),
    ntable_port: u16,
) {
    loop {
        // I hope this doesn't lead to a catastrophic infinite loop failure
        let client = create_client(&app_handle, &ntable_ip, &ntable_port).await;

        let mut subscription: Subscription = match create_subscription(&client).await {
            Ok(subscription) => subscription,
            Err(_) => {
                app_handle
                    .emit_all("telemetry_status", "disconnected")
                    .expect("Failed to emit telemetry_disconnected event");
                continue;
            }
        };

        while let Some(mut message) = subscription.next().await {
            process_message(&mut message);

            let json_message = to_string(&message).expect("Failed to serialize message");
            app_handle
                .emit_all("telemetry_data", json_message.clone())
                .expect("Failed to send telemetry message");

            if cfg!(debug_assertions) {
                println!("{}", json_message);
            }
        }
        if cfg!(debug_assertions) {
            println!("disconnected");
        }
        app_handle
            .emit_all("telemetry_status", "disconnected")
            .expect("Failed to emit telemetry_disconnected event");
    }
}

/// Strips the '/SmartDashboard/' prefix from NetworkTables topic names if present.
///
/// NetworkTables uses the '/SmartDashboard/' prefix to indicate that the topic
/// was published to the  SmartDashboard. The SmartDashboard is a way for the robot
/// to send data to any coprocessors, and it's published to the /SmartDashboard topic.
///
/// This function strips the '/SmartDashboard/' prefix from the topic name if
/// it is present. This allows easier data processing from the frontend.
fn process_message(message: &mut MessageData) {
    message.topic_name = message
        .topic_name
        .trim_start_matches("/SmartDashboard/")
        .to_string();
}
