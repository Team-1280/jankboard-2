import { gpwsTriggeredSequence } from '../Sequences/sequences'
import { telemetryStore } from '../stores/telemetryStore'
import { listen } from '@tauri-apps/api/event'

/**
 * Connects to sockets and subscribes to specified topics to receive telemetry data.
 *
 * @param topics - the topics to subscribe to
 * @param refreshRate - the refresh rate in Hz to be sent to the backend
 * which will be called with the NetworkTable object every time an update is received from the backend.
 */

export const initializeTelemetry = async () => {
  const unlistenStatus = await listen('telemetry_status', (event) => {
    if (event.payload === 'connected') {
      telemetryStore.set('connected', true)
    } else if (event.payload === 'disconnected') {
      telemetryStore.reset()
    }
  })

  const unlistenTelemetry = await listen('telemetry_data', (event) => {
    const data = JSON.parse(event.payload as string)
    telemetryStore.set(data['topic_name'], data['data'])
  })

  const unlistenGPWS = await listen('telemetry_gpws', (event) => {
    const data = JSON.parse(event.payload as string) as boolean
    if (data) {
      gpwsTriggeredSequence()
    }
  })

  const unlistenAll = () => {
    unlistenStatus()
    unlistenTelemetry()
    unlistenGPWS()
  }

  return unlistenAll
}
