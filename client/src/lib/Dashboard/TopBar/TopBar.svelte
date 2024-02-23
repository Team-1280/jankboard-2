<!-- 
  @component

  @param selectedGear - Selected gear
  @param selectedMode - Selected mode
  @param voltage - Battery voltage

  Displays the top bar of the dashboard
 -->

<script lang="ts">
  import BatteryDisplay from './BatteryDisplay.svelte'
  import GearSelector from './GearSelector.svelte'
  import ModeSelector from './ModeSelector.svelte'

  export let selectedGear: Gear | '-999'
  export let selectedMode: Mode | '-999'
  export let voltage: number
</script>

<div class="flex flex-row w-full justify-between">
  <div>
    <GearSelector {selectedGear} />
  </div>
  <div>
    <ModeSelector {selectedMode} />
  </div>
  <div>
    <BatteryDisplay {voltage} />
  </div>
</div>
