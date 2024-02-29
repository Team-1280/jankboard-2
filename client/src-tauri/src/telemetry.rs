use network_tables::v4::client_config::Config;
use network_tables::v4::Client;
use network_tables::v4::SubscriptionOptions;
use serde_json::to_string;
use std::net::{Ipv4Addr, SocketAddrV4};
use tauri::{AppHandle, Manager};
use tokio::time::{sleep, Duration};

const NTABLE_IP: (u8, u8, u8, u8) = (10, 12, 80, 2);
const NTABLE_PORT: u16 = 5810;

pub async fn subscribe_topics(app_handle: AppHandle) {
    let client = loop {
        match Client::try_new_w_config(
            SocketAddrV4::new(
                Ipv4Addr::new(NTABLE_IP.0, NTABLE_IP.1, NTABLE_IP.2, NTABLE_IP.3),
                NTABLE_PORT,
            ),
            Config {
                ..Default::default()
            },
        )
        .await
        {
            Ok(client) => {
                println!("Client created");
                break client; // Exit the loop if the client is successfully created
            }
            Err(e) => {
                println!("Failed to create client: {}. Retrying in 3 seconds...", e);
                app_handle
                    .emit_all("telemetry_disconnected", true)
                    .expect("Failed to emit telemetry_disconnected event");

                sleep(Duration::from_secs(3)).await; // Wait for 3 seconds before retrying
                continue; // Continue the loop to retry
            }
        };
    };

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
            .emit_all("telemetry_data", json_message.clone())
            .expect("Failed to send telemetry message");

        println!("{}", json_message);
    }
}
