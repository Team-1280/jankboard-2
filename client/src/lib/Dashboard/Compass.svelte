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

  export let accx: number
  export let accy: number
  export let orientation: number

  $: accResolved = Math.hypot(accx, accy)
  $: placeholder = accx === -999 && accy === -999
</script>

<div class="flex flex-col gap-2 text-center justify-center">
  <p class="text-xl font-medium" class:placeholder>
    Heading {getDirection(orientation)} ({orientation.toFixed(2)}°)
  </p>
  <p class="text-lg font-medium" class:placeholder>
    {getAcceleration(accResolved)} ({mpss2knps(accResolved).toFixed(2)}
    kn/s)
  </p>
</div>
