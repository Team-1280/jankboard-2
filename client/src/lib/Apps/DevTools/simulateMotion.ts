import { get } from 'svelte/store'
import { telemetryStore } from '../../stores/telemetryStore'

// simulate some turning for testing
export const simulateMotion = () => {
  let delay = Math.random() * 4500 + 500
  let randOffset = Math.random() * 360
  telemetryStore.update({
    ...get(telemetryStore),
    'orientation': randOffset,
    'chassis-x-speed': Math.random() * 4 * (Math.random() < 0.5 ? -1 : 1),
    'chassis-y-speed': Math.random() * 4 * (Math.random() < 0.5 ? -1 : 1),
  })
  setTimeout(simulateMotion, delay)
}
