<script lang="ts">
  import { Notifications } from '../../Notifications/notifications'
  import { settingsStore } from '../../stores/settingsStore'
  import AppContainer from '../AppContainer.svelte'
  import SettingsSelector from './SettingsSelector.svelte'
  import SettingsInput from './SettingsInput.svelte'
  import SettingsToggle from './SettingsToggle.svelte'
  import KonamiCode from 'konami-code-js'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'

  settingsStore.subscribe(async (value) => {
    window.localStorage.setItem('settings', JSON.stringify(value))
  })

  const resetSettings = () => {
    window.localStorage.setItem('settings', '')
    settingsStore.reset()
    Notifications.success('Settings reset! Refresh for all changes to apply.')
  }

  let unlockSecret = false

  onMount(() => {
    const kc = new KonamiCode()
    kc.setCallback(() => {
      kc.disable()
      unlockSecret = true
    })
  })
</script>

<AppContainer
  class="flex flex-col gap-6 bg-blue-200 bg-opacity-25 backdrop-blur-xl media-background rounded-3xl flex-wrap px-10 py-20 transition-all"
>
  <h1 class="text-5xl font-medium text-slate-100 basis-full">Settings</h1>
  <p class="text-slate-300">Hover over setting names to see helpful tooltips</p>
  <div class="flex flex-col gap-2">
    <h2 class="text-2xl font-medium text-slate-200 mt-4 basis-full">General</h2>
    <ul>
      <li>
        <SettingsToggle
          setting="disableAnnoyances"
          tooltip="Disable non-critical popups and audio cues."
          >Disable Annoyances</SettingsToggle
        >
      </li>
      <li>
        <SettingsSelector
          setting="voiceLang"
          options={['en-US', 'en-RU', 'en-UK']}
          tooltip="Selects the language/locale used for Jankboard voice prompts. Does not affect application language (ie. Jankboard itself will always be in English)."
          >Voice Prompt Language</SettingsSelector
        >
      </li>
    </ul>
    <h2 class="text-2xl font-medium text-slate-200 mt-4 basis-full">
      Camera Configuration
    </h2>
    <ul>
      <li>
        <SettingsInput
          setting="frontCameraAddr"
          tooltip="Set the IP address of the front-facing camera. Input in the format xxx.xxx.xxx.xxx:PORT (eg. 244.178.44.111:8080)"
          width="16rem">Front Camera IP</SettingsInput
        >
      </li>
      <li>
        <SettingsInput
          setting="rearCameraAddr"
          tooltip="Set the IP address of the rear-facing camera. Input in the format xxx.xxx.xxx.xxx:PORT (eg. 244.178.44.111:8080)"
          width="16rem">Rear Camera IP</SettingsInput
        >
      </li>
    </ul>
    <h2 class="text-2xl font-medium text-slate-200 mt-4 basis-full">Fun</h2>
    <ul>
      <li>
        <SettingsToggle
          setting="sentry"
          tooltip="Sentry mode protects the robot and operator from foreign threats (doesn't actually do anything besides add extra voice prompts)"
          >Sentry Mode</SettingsToggle
        >
      </li>
      <li>
        <SettingsInput
          setting="randomWeight"
          tooltip="Changes the likelihood of random events occurring (default: 1). Set to a decimal to lower probability and a number >= 1 to increase it."
          width="3rem"
        >
          RNG Weight
        </SettingsInput>
      </li>
    </ul>
    {#if unlockSecret}
      <div transition:fly={{ y: -100, duration: 200 }}>
        <h2 class="text-2xl font-medium text-slate-200 mt-4 basis-full">
          Secret
        </h2>
        <ul>
          <li>
            <SettingsToggle
              setting="goWoke"
              tooltip="Disables content that could be perceived as offensive for PR and DEI purposes."
              >Go Woke</SettingsToggle
            >
          </li>
        </ul>
      </div>
    {/if}
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
<div class="w-full h-24" />

<style lang="postcss">
  li {
    @apply my-3;
  }
</style>
