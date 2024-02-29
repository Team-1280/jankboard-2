<script lang="ts">
  export let selectedGear: Gear
  export let placeholder: boolean
</script>

<div class="flex justify-center w-full transition">
  <div
    class="flex flex-row gap-2 text-neutral-400 text-xl font-bold"
    class:placeholder
  >
    <div class:highlighted={selectedGear === 'park' && !placeholder}>P</div>
    <div class:highlighted={selectedGear === 'reverse' && !placeholder}>R</div>
    <div class:highlighted={selectedGear === 'neutral' && !placeholder}>N</div>
    <div class:highlighted={selectedGear === 'low' && !placeholder}>L</div>
    <div class:highlighted={selectedGear === 'auto' && !placeholder}>A</div>
    <div class:highlighted={selectedGear === 'drive' && !placeholder}>D</div>
  </div>
</div>

<style lang="postcss">
  .highlighted {
    @apply text-white transition-colors duration-300;
  }
</style>
