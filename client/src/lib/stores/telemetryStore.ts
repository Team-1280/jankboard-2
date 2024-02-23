import { writable, readonly } from 'svelte/store'

let defaults: TelemetryData = {
  'orientation': -999,
  'chassis-x-speed': -999,
  'chassis-y-speed': -999,
  'accx': -999,
  'accy': -999,
  'accz': -999,
  'jerk-x': -999,
  'jerk-y': -999,
  'voltage': -999,
  'acc-profile': '-999',
  'gear': '-999',
  'ebrake': false,
  'reorient': false,
  'gpws': false,
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
