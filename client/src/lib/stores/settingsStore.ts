/* stores global app wide settings */

import { writable } from "svelte/store";

export interface SettingsStoreData {
  disableAnnoyances: boolean;
  goWoke: boolean;
  fastStartup: boolean;
}

export const defaults: SettingsStoreData = {
  disableAnnoyances: false, // disable non-critical notifications
  goWoke: false, // go woke (for showing parents or other officials where DEI has taken over), disables "offensive" sequences
  fastStartup: false, // skip the loading splash screen (for development purposes. Setting this from within the app has no effect.)
};

const createSequenceStore = () => {
  const { subscribe, set, update } = writable<SettingsStoreData>(defaults);
  return {
    subscribe,
    update: (
      data: keyof SettingsStoreData,
      newValue: SettingsStoreData[typeof data]
    ) => {
      update((store) => {
        store[data] = newValue;
        return store;
      });
    },
    reset: () => set(defaults),
    set: (data: SettingsStoreData) => set(data),
  };
};

export const settingsStore = createSequenceStore();
