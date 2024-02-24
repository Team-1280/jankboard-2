<!-- 
  @component
  
  @param accx - Acceleration in x
  @param accy - Acceleration in y
  @param orientation - Heading in degrees

  Displays the heading direction and acceleration as human readable text
 -->
<script lang="ts">
  import { getAcceleration, getDirection } from '../utils/helpers'
  import { mpss2knps } from '../utils/unitConversions'
  import { fade } from 'svelte/transition'

  export let accx: number
  export let accy: number
  export let orientation: number

  $: accResolved = Math.hypot(accx, accy)
  $: placeholder = accx === -999 && accy === -999
</script>

<div class="flex flex-col gap-2 text-center">
  <p class="text-xl font-medium">
    {#if !placeholder}
      <span
        in:fade={{ duration: 150, delay: 150 }}
        out:fade={{ duration: 150 }}
        class="text-lg font-medium"
        >Heading {getDirection(orientation)} ({orientation.toFixed(2)}°)</span
      >
    {:else}
      <span
        class="placeholder"
        in:fade={{ duration: 150, delay: 150 }}
        out:fade={{ duration: 150 }}>--------------------------------</span
      >
    {/if}
  </p>
  <p class="text-lg font-medium">
    {#if !placeholder}
      <span in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}
        >{getAcceleration(accResolved)} ({mpss2knps(accResolved).toFixed(
          2
        )}</span
      >
      kn/s)
    {:else}
      <span
        class="placeholder"
        in:fade={{ duration: 150, delay: 150 }}
        out:fade={{ duration: 150 }}
        >-----------------------------------------------------</span
      >
    {/if}
  </p>
</div>
