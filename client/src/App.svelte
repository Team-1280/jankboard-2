<script lang="ts">
  import '@fontsource/roboto/latin.css'
  import 'material-icons/iconfont/material-icons.css'
  import Dashboard from './lib/Dashboard/Dashboard.svelte'
  import 'material-symbols'
  import AppBar from './lib/Apps/AppBar.svelte'
  import { appList } from './lib/Apps/appList'
  import { initializeTelemetry } from './lib/utils/initializeTelemetry'
  import { onDestroy, onMount } from 'svelte'
  import { Toaster } from 'svelte-french-toast'
  import { initializationSequence } from './lib/Sequences/sequences'
  import Loading from './lib/Loading/Loading.svelte'
  import { settingsStore } from './lib/stores/settingsStore'
  import getSettings from './lib/utils/getSettings'
  import { Canvas } from '@threlte/core'
  import { emit } from '@tauri-apps/api/event'

  let activeApp: App = 'camera'
  let topics: TelemetryTopics = {
    doubles: [
      'orientation',
      'chassis-x-speed',
      'chassis-y-speed',
      'accx',
      'accy',
      'accz',
      'jerk-x',
      'jerk-y',
      'voltage',
    ],
    strings: ['acc-profile', 'gear'],
    booleans: ['ebrake', 'reorient', 'gpws'],
  }

  let loading = $settingsStore.fastStartup ? false : true
  let unlistenAll: () => void

  onMount(() => {
    let savedSettings = getSettings()
    if (savedSettings !== false) {
      settingsStore.set(savedSettings)
    }
    window.ResizeObserver = ResizeObserver
    // disabled while migrating away from python
    initializeTelemetry(topics, 200).then((unsubFunction: () => void) => {
      unlistenAll = unsubFunction
    })
    setTimeout(() => {
      loading = false
      initializationSequence()
    }, 3000)

    settingsStore.subscribe(value => {
      localStorage.setItem('settings', JSON.stringify(value))
    })
  })

  onDestroy(() => {
    unlistenAll && unlistenAll()
  })
</script>

<main
  class="select-none transition-opacity duration-300"
  class:opacity-0={loading}
>
  <!-- driver dashboard -->
  <div class="h-screen w-[35vw] fixed shadow-lg shadow-slate-800 z-10">
    <Dashboard />
  </div>
  <!-- the infotainment system -->
  <div class="min-h-screen w-[65vw] right-0 absolute infotainment-container">
    <!-- dynamic app system (edit appList.ts to add new apps) -->
    <div class="mx-10 mt-10 overflow-hidden">
      <svelte:component this={appList[activeApp].component} />
    </div>
    <div class="fixed w-[65vw] flex justify-center right-0 bottom-0 mb-4">
      <AppBar bind:activeApp {appList} />
    </div>
  </div>
</main>

{#if loading}
  <Loading />
{/if}

<!-- toast service -->
<Toaster />

<style lang="postcss">
  main {
    font-family: 'Roboto', sans-serif;
  }

  .infotainment-container {
    background: #2c3e50; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #2c3e50,
      #fd746c
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #2c3e50,
      #fd746c
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    /* hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .infotainment-container::-webkit-scrollbar {
    /* hide scrollbar */
    display: none;
  }
</style>
