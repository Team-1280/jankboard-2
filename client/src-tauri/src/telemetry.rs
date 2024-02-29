use network_tables::v4::{Client, SubscriptionOptions};
use serde_json::to_string;
use std::net::{Ipv4Addr, SocketAddrV4};
use tauri::{AppHandle, Manager};

pub async fn subscribe_topics(app_handle: AppHandle) {
    let client = Client::try_new_w_config(
        SocketAddrV4::new(Ipv4Addr::new(10, 12, 80, 2), 5810),
        network_tables::v4::client_config::Config {
            ..Default::default()
        },
    )
    .await
    .expect("Failed to create client");

    let mut subscription = client
        .subscribe_w_options(
            &["/SmartDashboard"],
            Some(SubscriptionOptions {
                all: Some(true),
                prefix: Some(true),
                ..Default::default()
            }),
        )
        .await
        .expect("Failed to subscribe");

    while let Some(message) = subscription.next().await {
        let mut modified_message = message.clone();

        if let Some(stripped) = modified_message.topic_name.strip_prefix("/SmartDashboard/") {
            modified_message.topic_name = stripped.to_string();
        }

        let json_message = to_string(&modified_message).expect("Failed to serialize message");
        app_handle
            .emit_all("telemetry", json_message.clone())
            .expect("Failed to send telemetry message");

        println!("{}", json_message);
    }
}
