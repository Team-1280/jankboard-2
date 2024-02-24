<!-- 
  @component
  
  @param speedLimit - Speed limit in Miles Per Hour (MPH)

  Displays the speed limit
 -->
<script lang="ts">
  export let speedLimit: number = 5.0

  $: placeholder = speedLimit === -999
</script>

<div
  class="bg-white p-[0.15rem] text-black rounded-xl shadow-md shadow-neutral-500"
>
  <div
    class="px-3 py-1 border-black rounded-xl border-2 flex flex-col text-center gap-1 transition-all"
  >
    <div class="text-lg font-medium">SPEED<br />LIMIT</div>
    <div
      class="text-2xl font-bold transition"
      class:speed-limit-placeholder={placeholder}
    >
      {speedLimit}
    </div>
  </div>
</div>

<style lang="postcss">
  .speed-limit-placeholder {
    @apply text-neutral-200 bg-neutral-200 animate-pulse rounded-lg;
  }
</style>
