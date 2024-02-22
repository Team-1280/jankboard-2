<script lang="ts">
  // in mph
  export let speed: number = 0.0

  $: formatted = speed.toFixed(1)
</script>

<div class="flex flex-col gap-4">
  <div class="text-6xl">{formatted}</div>
  <div class="text-2xl font-medium">MPH</div>
</div>
