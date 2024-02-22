<script>
  import BatteryDisplay from './BatteryDisplay.svelte'
  import GearSelector from './GearSelector.svelte'
  import ModeSelector from './ModeSelector.svelte'
</script>

<div class="flex flex-row w-full justify-between">
  <div>
    <GearSelector selectedGear="p" />
  </div>
  <div>
    <ModeSelector selectedMode="chill" />
  </div>
  <div>
    <BatteryDisplay voltage={12.5} />
  </div>
</div>
