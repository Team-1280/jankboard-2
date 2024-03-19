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
  import { settingsStore } from './lib/stores/settingsStore'
  import getSettings from './lib/utils/getSettings'
  import hideSplashscreen from './lib/utils/hideSplashscreen'
  import Cutouts from './lib/Dashboard/Cutouts/Cutouts.svelte'

  let activeApp: App = 'camera'
  // fake loading splash screen to look cool if the model loads too fast
  let fakeLoadingDone = false
  // and the real one, to wait for massive robot model to load if it's slow
  let realLoadingDone = false
  let started = false

  let unlistenAll: () => void

  onMount(() => {
    let savedSettings = getSettings()
    if (savedSettings !== false) {
      settingsStore.set(savedSettings)
    }
    window.ResizeObserver = ResizeObserver
    // disabled while migrating away from python
    initializeTelemetry().then((unsubFunction: () => void) => {
      unlistenAll = unsubFunction
    })

    settingsStore.subscribe((value) => {
      localStorage.setItem('settings', JSON.stringify(value))
    })

    setTimeout(() => {
      fakeLoadingDone = true
    }, 3000)
  })

  onDestroy(() => {
    unlistenAll && unlistenAll()
  })

  const start = () => {
    hideSplashscreen()
    initializationSequence()
  }

  const onVisualizationLoaded = () => {
    realLoadingDone = true
  }

  $: if (realLoadingDone && fakeLoadingDone && !started) {
    started = true
    start()
  }
</script>

<main class="select-none transition-opacity duration-300">
  <!-- driver dashboard -->
  <div class="h-screen w-[35vw] fixed shadow-lg shadow-slate-800 z-10">
    <Dashboard on:loaded={onVisualizationLoaded} />
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

<!-- Camera cutouts -->
<Cutouts show={activeApp !== 'camera'} />

<!-- toast service -->
<Toaster />

<style lang="postcss">
  main {
    font-family: 'Roboto', sans-serif;
  }

  .infotainment-container {
    background-image: url('./assets/wallpaper.jpg');
    background-repeat: repeat-y;
    background-size: cover;
    /* hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
    background-position: top right;
    width: 65vw;
    height: 100vh;
  }

  .infotainment-container::-webkit-scrollbar {
    /* hide scrollbar */
    display: none;
  }
</style>
