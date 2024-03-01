import { get } from 'svelte/store'
import { telemetryStore } from '../../stores/telemetryStore'
import { increaseRotationTo, increaseSpeedTo } from './telemetrySimulators'

// simulate some turning for testing
export const simulateMotion = () => {
  let delay = Math.random() * 4500 + 500
  let randOffset = Math.random() * 360

  increaseSpeedTo(
    Math.random() * 4 * (Math.random() < 0.5 ? -1 : 1),
    Math.random() * 4 * (Math.random() < 0.5 ? -1 : 1)
  )

  increaseRotationTo(randOffset)

  setTimeout(simulateMotion, delay)
}
