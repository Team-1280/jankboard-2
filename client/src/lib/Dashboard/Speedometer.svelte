<!--
  @component

  @param speed - Speed in meters per second

  Displays the speed in miles per hour
-->

<script lang="ts">
  import { mps2mph } from '../utils/unitConversions'

  export let speed: number = 0.0

  $: formatted = mps2mph(speed).toFixed(1)

  $: placeholder = speed === Math.hypot(-999, -999)
</script>

<div class="flex flex-col gap-4">
  <div class="text-6xl" class:placeholder class:width-limit={placeholder}>
    {placeholder ? '-----' : formatted}
  </div>
  <div
    class="text-2xl font-medium"
    class:placeholder={speed === Math.hypot(-999, -999)}
  >
    MPH
  </div>
</div>
