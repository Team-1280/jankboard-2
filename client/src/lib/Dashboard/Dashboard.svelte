<!-- 
  @component

  @param selectedGear - Selected gear
  @param selectedMode - Selected mode
  @param voltage - Battery voltage

  Displays the driver dashboard and HUD
 -->
<script lang="ts">
  import TopBar from './TopBar/TopBar.svelte'
  import Speedometer from './Speedometer.svelte'
  import SpeedLimit from './SpeedLimit.svelte'
  import MediaDisplay from './MediaPlayer/MediaDisplay.svelte'
  import Compass from './Compass.svelte'
  import { telemetryReadonlyStore } from '../stores/telemetryStore'
  import Bottom from './Bottom.svelte'

  $: speedResolved = Math.hypot(
    $telemetryReadonlyStore['chassis-x-speed'],
    $telemetryReadonlyStore['chassis-y-speed']
  )
</script>

<div class="mt-2">
  <div class="px-5">
    <TopBar
      selectedGear={$telemetryReadonlyStore.gear}
      selectedMode={$telemetryReadonlyStore['acc-profile']}
      voltage={$telemetryReadonlyStore.voltage}
    />
    <div class="h-0.5 mt-1 w-full bg-slate-300 border-0"></div>
    <div class="mt-8 flex justify-between">
      <Speedometer speed={speedResolved} />
      <SpeedLimit />
    </div>
  </div>

  <Bottom>
    <div class="mb-10">
      <Compass
        accx={$telemetryReadonlyStore['accx']}
        accy={$telemetryReadonlyStore['accy']}
        orientation={$telemetryReadonlyStore['orientation']}
      />
    </div>
    <MediaDisplay />
  </Bottom>
</div>
