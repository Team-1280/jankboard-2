use network_tables::v4::client_config::Config;
use network_tables::v4::Client;
use std::net::{Ipv4Addr, SocketAddrV4};
use tauri::{AppHandle, Manager};
use tokio::time::{sleep, Duration};

/// Creates a NetworkTables client
///
/// This function will keep trying to create a NetworkTables client with the given
/// IP address and port until it is successful. It will sleep for 3 seconds between
/// attempts. If successful, it will emit the `telemetry_connected` event on the
/// `app_handle` with the payload `"connected"`. If unsuccessful, it will emit the
/// `telemetry_status` event with the payload `"disconnected"` instead.
pub async fn create_client(
    app_handle: &AppHandle,
    ntable_ip: &(u8, u8, u8, u8),
    ntable_port: &u16,
) -> Client {
    loop {
        let client_attempt = Client::try_new_w_config(
            SocketAddrV4::new(
                Ipv4Addr::new(ntable_ip.0, ntable_ip.1, ntable_ip.2, ntable_ip.3),
                *ntable_port,
            ),
            Config {
                ..Default::default()
            },
        )
        .await;

        match client_attempt {
            Ok(client) => {
                println!("Client created");
                app_handle
                    .emit_all("telemetry_status", "connected")
                    .expect("Failed to emit telemetry_status connected event");
                break client; // Exit the loop if the client is successfully created
            }
            Err(e) => {
                if cfg!(debug_assertions) {
                    println!("Failed to create client: {}. Retrying in 3 seconds...", e);
                }
                app_handle
                    .emit_all("telemetry_status", "disconnected")
                    .expect("Failed to emit telemetry_status disconnected event");

                sleep(Duration::from_secs(3)).await; // Wait for 3 seconds before retrying
                continue; // Continue the loop to retry
            }
        };
    }
}
