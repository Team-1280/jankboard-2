<script lang="ts">
  export let voltage: number
  export let placeholder: boolean

  $: formatted = voltage.toFixed(1)
</script>

<span class="flex gap-1">
  <div class="text-lg font-medium transition" class:placeholder>
    {formatted} V
  </div>
  <span
    class="material-symbols-outlined battery-icon transition"
    class:placeholder>battery_horiz_075</span
  >
</span>

<style lang="postcss">
  .battery-icon {
    font-size: 30.8px;
  }
</style>
