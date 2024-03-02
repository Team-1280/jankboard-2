import { get } from "svelte/store";
import { telemetryStore } from "../stores/telemetryStore";
import { emit, listen } from "@tauri-apps/api/event";

/**
 * Connects to sockets and subscribes to specified topics to receive telemetry data.
 *
 * @param topics - the topics to subscribe to
 * @param refreshRate - the refresh rate in Hz to be sent to the backend
 * which will be called with the NetworkTable object every time an update is received from the backend.
 */

const onUpdate = (data: TelemetryData) => {
  telemetryStore.update(data);
  // console.log(data)
};

export const initializeTelemetry = async (
  topics: TelemetryTopics,
  refreshRate: number
) => {
  // Make sure refreshRate is valid
  if (!Number.isInteger(refreshRate) || refreshRate < 1) {
    throw new Error(
      "refreshRate must be an integer greater than or equal to 1."
    );
  }

  const unlistenStatus = await listen("telemetry_status", (event) => {
    if (event.payload === "connected") {
      telemetryStore.set("connected", true);
    } else if (event.payload === "disconnected") {
      telemetryStore.set("connected", false);
    }
  });

  const unlistenTelemetry = await listen("telemetry_data", (event) => {
    const data = JSON.parse(event.payload as string);
    // console.log(JSON.parse)
    telemetryStore.set(data["topic_name"], data["data"]);
  });

  const unlistenAll = () => {
    unlistenStatus();
    unlistenTelemetry();
  };

  return unlistenAll;
};
