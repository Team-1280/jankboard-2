<script lang="ts">
  import '@fontsource/roboto/latin.css'
  import 'material-icons/iconfont/material-icons.css'
  import Dashboard from './lib/Dashboard/Dashboard.svelte'
  import 'material-symbols'
  import AppBar from './lib/Apps/AppBar.svelte'
  import { appList } from './lib/Apps/appList'
  import { initializeTelemetry } from './lib/utils/initializeTelemetry'
  import { onMount } from 'svelte'

  let activeApp: App = 'media-player'
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

  onMount(() => {
    initializeTelemetry(topics, 5)
  })
</script>

<main class="select-none">
  <!-- driver dashboard -->
  <div class="h-screen w-[35vw] fixed shadow-lg shadow-slate-800 z-10">
    <Dashboard />
  </div>
  <!-- the infotainment system -->
  <div class="min-h-screen w-[65vw] right-0 absolute infotainment-container">
    <!-- dynamic app system (edit appList.ts to add new apps) -->
    <div class="mx-10 mt-10">
      <svelte:component this={appList[activeApp].component} />
    </div>
    <div class="fixed w-[65vw] flex justify-center right-0 bottom-0 mb-4">
      <AppBar bind:activeApp {appList} />
    </div>
  </div>
</main>

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
  }
</style>
