<!-- 
  @component

  @param selectedGear - Selected gear
  @param selectedMode - Selected mode
  @param voltage - Battery voltage
  @param placeholder - Whether or not to show placeholder skeleton UIs

  Displays the top bar of the dashboard
 -->

<script lang="ts">
  import BatteryDisplay from './BatteryDisplay.svelte'
  import GearSelector from './GearSelector.svelte'
  import ModeSelector from './ModeSelector.svelte'

  export let selectedGear: Gear
  export let selectedMode: Mode
  export let voltage: number
  export let placeholder: boolean
</script>

<div class="flex flex-row w-full justify-between">
  <div>
    <GearSelector {selectedGear} {placeholder} />
  </div>
  <div>
    <ModeSelector {selectedMode} {placeholder} />
  </div>
  <div>
    <BatteryDisplay {voltage} {placeholder} />
  </div>
</div>
