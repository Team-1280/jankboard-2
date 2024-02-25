<script lang="ts">
  import { Notifications } from '../../Notifications/notifications'
  import { settingsStore } from '../../stores/settingsStore'
  import AppContainer from '../AppContainer.svelte'
  import SettingsInput from './SettingsInput.svelte'
  import SettingsToggle from './SettingsToggle.svelte'

  settingsStore.subscribe(async value => {
    window.localStorage.setItem('settings', JSON.stringify(value))
  })

  const resetSettings = () => {
    window.localStorage.setItem('settings', '')
    settingsStore.reset()
    Notifications.success('Settings reset! Refresh for all changes to apply.')
  }
</script>

<AppContainer
  class="flex gap-6 bg-blue-200 bg-opacity-25 backdrop-blur-xl media-background rounded-3xl flex-wrap px-10 py-20"
>
  <h1 class="text-5xl font-medium text-slate-100 basis-full">Settings</h1>
  <h2 class="text-2xl font-medium text-slate-200 mt-4 basis-full">General</h2>
  <div class="flex flex-col gap-2">
    <SettingsToggle
      setting="disableAnnoyances"
      tooltip="Disable non-critical popups and audio cues."
      >Disable Annoyances</SettingsToggle
    >
    <SettingsToggle
      setting="goWoke"
      tooltip="Disables content that could be perceived as offensive for PR and DEI purposes."
      >Go Woke</SettingsToggle
    >
    <SettingsInput
      setting="randomWeight"
      tooltip="Changes the likelihood of random events occurring (default: 1). Set to a decimal to lower probability and a number >= 1 to increase it."
      width="3rem"
    >
      RNG Weight
    </SettingsInput>
    <button
      class="mt-10 px-4 py-2 bg-amber-600 hover:brightness-75 text-medium rounded-lg w-min"
      on:click={resetSettings}>Reset</button
    >

    <footer class="bottom-0 -mb-10 mt-10 text-slate-300">
      Settings are synced to Tauri's local storage. If things seem broken, try
      reinstalling the app and try again.
    </footer>
  </div>
</AppContainer>
