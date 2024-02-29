<!--
  @component

  @param speed - Speed in meters per second
  @param placeholder - Whether or not to show the placeholder skeleton

  Displays the speed in miles per hour
-->

<script lang="ts">
  import { mps2mph } from '../utils/unitConversions'

  export let speed: number = 0.0
  export let placeholder: boolean

  $: formatted = mps2mph(speed).toFixed(1)
</script>

<div class="flex flex-col gap-4">
  <div
    class="text-6xl transition"
    class:placeholder
    class:width-limit={placeholder}
  >
    {placeholder ? '-----' : formatted}
  </div>
  <div class="text-2xl font-medium transition" class:placeholder>MPH</div>
</div>
