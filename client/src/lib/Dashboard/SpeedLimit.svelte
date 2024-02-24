<!-- 
  @component
  
  @param speedLimit - Speed limit in Miles Per Hour (MPH)

  Displays the speed limit
 -->
<script lang="ts">
  export let speedLimit: number = 5.0
</script>

<div
  class="bg-white p-[0.15rem] text-black rounded-xl shadow-md shadow-neutral-500"
>
  <div
    class="px-3 py-1 border-black rounded-xl border-2 flex flex-col text-center gap-1"
    class:speed-limit-placeholder={speedLimit === -999}
  >
    <div class="text-lg font-medium">SPEED<br />LIMIT</div>
    <div class="text-2xl font-bold">{speedLimit}</div>
  </div>
</div>

<style lang="postcss">
  .speed-limit-placeholder {
    @apply animate-pulse bg-neutral-300 text-neutral-300;
  }
</style>
