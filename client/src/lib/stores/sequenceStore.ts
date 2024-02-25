/* in this store, put stateful variables that sequences need to access */

import { writable } from 'svelte/store'

interface SequenceStoreData {
  infotainmentStartedFirstTime: boolean
  musicStartedFirstTime: boolean
  gbaEmulatorStartedFirstTime: boolean
}

let defaults: SequenceStoreData = {
  infotainmentStartedFirstTime: false, // for infotainment bootup sequence
  musicStartedFirstTime: false,
  gbaEmulatorStartedFirstTime: false,
}

const createSequenceStore = () => {
  const { subscribe, set, update } = writable<SequenceStoreData>(defaults)
  return {
    subscribe,
    update: (
      data: keyof SequenceStoreData,
      newValue: SequenceStoreData[typeof data]
    ) => {
      update(store => {
        store[data] = newValue
        return store
      })
    },
    reset: () => set(defaults),
  }
}

export const sequenceStore = createSequenceStore()
