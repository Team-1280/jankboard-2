<script lang="ts">
  export let voltage: number

  $: formatted = voltage.toFixed(1)
</script>

<span class="flex gap-1">
  <div class="text-lg font-medium">
    {formatted} V
  </div>
  <span class="material-symbols-outlined battery-icon">battery_horiz_075</span>
</span>

<style lang="postcss">
  .battery-icon {
    font-size: 30.8px;
  }
</style>
