<script lang="ts">
  export let speedLimit: number = 5.0

  $: formatted = speedLimit.toFixed(1)
</script>

<div
  class="bg-white p-[0.15rem] text-black rounded-xl shadow-md shadow-neutral-500"
>
  <div
    class="px-3 py-1 border-black rounded-xl border-2 flex flex-col text-center gap-1"
  >
    <div class="text-lg font-medium">
      SPEED<br />LIMIT
    </div>
    <div class="text-2xl font-bold">{formatted}</div>
  </div>
</div>
