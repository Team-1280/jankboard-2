use tauri::{AppHandle, Manager};

pub fn subscribe_topics(app: &AppHandle) {
    let app_handle = app.clone();

    app_handle.listen_global("subscribe", |event| {
        let parsed: Result<serde_json::Value, serde_json::Error> =
            serde_json::from_str(event.payload().unwrap());
        match parsed {
            Ok(value) => {
                // handle the successfully parsed value
                let topics = value.as_object();
                match topics {
                    Some(topics) => {
                        for (key, value) in topics {
                            println!("{}: {}", key, value);
                        }
                    }
                    None => {
                        println!("No topics requested!");
                    }
                }
            }
            Err(err) => {
                // handle the error
                println!("{:?}", err);
            }
        }
    });
}
