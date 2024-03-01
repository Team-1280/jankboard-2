import { get } from 'svelte/store'
import { telemetryStore } from '../../stores/telemetryStore'
import { tick } from 'svelte'

export const setStationaryTelemetry = () => {
  telemetryStore.update({
    'orientation': 0,
    'chassis-x-speed': 0,
    'chassis-y-speed': 0,
    'accx': 0,
    'accy': 0,
    'accz': 0,
    'jerk-x': 0,
    'jerk-y': 0,
    'voltage': 12,
    'acc-profile': 'chill',
    'gear': 'park',
    'ebrake': false,
    'reorient': false,
    'gpws': false,
    'connected': true,
  })
}

export const increaseSpeedTo = async (targetX: number, targetY: number) => {
  const setSpeed = (x: number, y: number) => {
    telemetryStore.update({
      ...get(telemetryStore),
      'chassis-x-speed': x,
      'chassis-y-speed': y,
    })
  }
  const getSpeed = () => {
    const currentValues = get(telemetryStore)
    return {
      x: currentValues['chassis-x-speed'],
      y: currentValues['chassis-y-speed'],
    }
  }

  const delay = () => new Promise(resolve => setTimeout(resolve, 500)) // Assuming a 100ms tick for demonstration
  const lerp = (start: number, end: number, alpha: number) =>
    start + (end - start) * alpha

  let { x: currentX, y: currentY } = getSpeed() // Retrieve initial speeds

  const steps = 20 // Number of steps for the interpolation
  for (let i = 1; i <= steps; i++) {
    const alpha = i / steps // Calculate interpolation fraction

    // Interpolate speeds
    const nextX = lerp(currentX, targetX, alpha)
    const nextY = lerp(currentY, targetY, alpha)

    setSpeed(nextX, nextY) // Update speeds

    await tick() // Wait for state update synchronization
    await delay()

    // Update current speeds for the next iteration
    currentX = nextX
    currentY = nextY
  }
}

export const changeGear = (gear: Gear) => {
  telemetryStore.update({
    ...get(telemetryStore),
    gear: gear,
  })
}

let cancelPreviousCall = () => {} // Function to cancel the previous interpolation

const getAngle = () => {
  return get(telemetryStore)['orientation']
}

const setAngle = (angle: number) => {
  telemetryStore.update({
    ...get(telemetryStore),
    orientation: angle,
  })
}

export const increaseRotationTo = async (targetAngle: number) => {
  let isCancelled = false
  cancelPreviousCall() // Cancel any ongoing interpolation
  cancelPreviousCall = () => {
    isCancelled = true
  } // Setup cancellation for the current call

  const lerp = (start: number, end: number, alpha: number) =>
    start + (end - start) * alpha
  const tick = () => new Promise(resolve => setTimeout(resolve, 1000)) // Assuming a 100ms tick for demonstration

  let currentAngle = getAngle() // Assume getAngle() retrieves the current angle

  const steps = 10 // Number of steps for the interpolation
  for (let i = 1; i <= steps; i++) {
    if (isCancelled) return // Exit if a new target angle is set

    const alpha = i / steps // Calculate interpolation fraction

    // Interpolate angle
    const nextAngle = lerp(currentAngle, targetAngle, alpha)

    setAngle(nextAngle) // Update angle

    await tick() // Wait for state update synchronization

    // Update current angle for the next iteration
    currentAngle = nextAngle
  }
}
