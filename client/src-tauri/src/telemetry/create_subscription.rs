use network_tables::v4::{Client, Subscription, SubscriptionOptions};
use tokio::time::{sleep, Duration};

/// Create a subscription to all SmartDashboard values
///
/// The subscription will receive updates to all values in the
/// SmartDashboard, and any future values added to it.
///
/// The subscription will be created with the following options:
///
/// * `all`: `true` - receive updates to all values
/// * `prefix`: `true` - receive updates to all keys with the
///   prefix `/SmartDashboard`
///
/// This function will retry creating a subscription every 3 seconds
/// if it fails.
pub async fn create_subscription(client: &Client) -> Result<Subscription, network_tables::Error> {
    let mut attempts: u8 = 0;

    loop {
        let subscription_attempt = client
            .subscribe_w_options(
                &["/SmartDashboard"],
                Some(SubscriptionOptions {
                    all: Some(true),
                    prefix: Some(true),
                    ..Default::default()
                }),
            )
            .await;

        match subscription_attempt {
            Ok(subscription) => break Ok(subscription),
            Err(e) => {
                #[cfg(debug_assertions)]
                tracing::warn!("Failed to create subscription: {:?}", e);

                if attempts >= 50 {
                    break Err(e);
                }

                attempts += 1;
                sleep(Duration::from_secs(3)).await; // Wait for 3 seconds before retrying
                continue;
            }
        }
    }
}
