<script lang="ts">
  export let selectedGear: Gear | '-999'
</script>

<div class="flex justify-center w-full transition">
  <div
    class="flex flex-row gap-2 text-neutral-400 text-xl font-bold"
    class:placeholder={selectedGear === '-999'}
  >
    <div class:highlighted={selectedGear === 'park'}>P</div>
    <div class:highlighted={selectedGear === 'reverse'}>R</div>
    <div class:highlighted={selectedGear === 'neutral'}>N</div>
    <div class:highlighted={selectedGear === 'low'}>L</div>
    <div class:highlighted={selectedGear === 'auto'}>A</div>
    <div class:highlighted={selectedGear === 'drive'}>D</div>
  </div>
</div>

<style lang="postcss">
  .highlighted {
    @apply text-white;
  }
</style>
