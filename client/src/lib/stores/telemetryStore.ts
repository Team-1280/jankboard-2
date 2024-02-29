import { writable, readonly } from 'svelte/store'

let defaults: TelemetryData = {
  'orientation': 0,
  'chassis-x-speed': 0,
  'chassis-y-speed': 0,
  'accx': 0,
  'accy': 0,
  'accz': 0,
  'jerk-x': 0,
  'jerk-y': 0,
  'voltage': 0,
  'acc-profile': 'chill',
  'gear': 'park',
  'ebrake': false,
  'reorient': false,
  'gpws': false,
  'connected': false,
}

const createTelemetryStore = () => {
  const { subscribe, set, update } = writable<TelemetryData>(defaults)
  return {
    subscribe,
    update: (data: TelemetryData) => {
      update(store => {
        if (data !== store) store = data
        return store
      })
    },
    reset: () => set(defaults),
  }
}

export const telemetryStore = createTelemetryStore()

export const telemetryReadonlyStore = readonly(telemetryStore)
