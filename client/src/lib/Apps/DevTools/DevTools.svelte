<script lang="ts">
  import { onDestroy } from 'svelte'
  import {
    cameraControls,
    cameraState,
  } from '../../Dashboard/Visualization/CameraControls/utils/cameraStore'
  import AppContainer from '../AppContainer.svelte'
  import { simulateMotion } from './simulateMotion'
  import {
    changeGear,
    increaseSpeedTo,
    setStationaryTelemetry,
  } from './telemetrySimulators'

  let value: typeof $cameraState.mode = $cameraState.mode

  $: {
    cameraState.set('mode', value)
  }
  const unsubscribe = cameraState.subscribe(state => {
    if (value !== state.mode) value = state.mode
  })
  onDestroy(unsubscribe)
</script>

<AppContainer
  class="flex gap-6 bg-blue-200 bg-opacity-25 backdrop-blur-xl media-background rounded-3xl flex-wrap px-10 py-20"
>
  <h1 class="text-5xl font-medium text-slate-100 basis-full">
    Developer Tools
  </h1>
  <h2 class="basis-full">
    This is an app where developers can add buttons that trigger code to help
    during development.
  </h2>
  <p class="basis-full">
    Make sure the entry for this app is commented out in appList.ts before
    building for production.
  </p>
  <button class="button" on:click={setStationaryTelemetry}
    >Set robot connected defaults</button
  >
  <button class="button" on:click={() => changeGear('park')}
    >Shift to Park</button
  >
  <button class="button" on:click={() => changeGear('drive')}
    >Shift to Drive</button
  >
  <button class="button" on:click={() => changeGear('neutral')}
    >Shift to Neutral</button
  >
  <button class="button" on:click={() => changeGear('auto')}
    >Shift to Auto</button
  >
  <button class="button" on:click={() => changeGear('reverse')}
    >Shift to Reverse</button
  >
  <button class="button" on:click={() => changeGear('low')}>Shift to Low</button
  >

  <button class="button" on:click={() => increaseSpeedTo(4, 4)}
    >Simulate acceleration to 5.5 m/s</button
  >
  <button class="button" on:click={simulateMotion}>
    Simulate random motion
  </button>
  <select bind:value class="bg-slate-300">
    <option value="orbit">Orbit</option>
    <option value="follow-facing">Follow Facing</option>
    <option value="follow-direction">Follow Direction</option>
  </select>
</AppContainer>

<style lang="postcss">
  .button {
    @apply px-4 py-2 bg-blue-500 hover:brightness-75 font-medium rounded-lg flex-grow;
  }
</style>
