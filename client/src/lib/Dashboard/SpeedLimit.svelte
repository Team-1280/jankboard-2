<!-- 
  @component
  
  @param speedLimit - Speed limit in Miles Per Hour (MPH)
  @param placeholder - Whether or not to show the placeholder skeleton

  Displays the speed limit
 -->
<script lang="ts">
  export let speedLimit: number
  export let placeholder: boolean
</script>

<div
  class="bg-white p-[0.15rem] text-black rounded-xl shadow-md shadow-neutral-500"
>
  <div
    class="px-3 py-1 border-black rounded-xl border-2 flex flex-col text-center gap-1 transition-all"
    class:speed-limit-placeholder={placeholder}
  >
    <div class="text-lg font-medium">SPEED<br />LIMIT</div>
    <div class="text-2xl font-bold transition">
      {speedLimit.toFixed(1)}
    </div>
  </div>
</div>

<style lang="postcss">
  .speed-limit-placeholder {
    @apply text-neutral-300 bg-neutral-300 animate-pulse rounded-lg;
  }
</style>
