<script lang="ts">
  export let selectedGear: Gear
</script>

<div class="flex justify-center w-full">
  <div class="flex flex-row gap-2 text-neutral-400 text-xl font-bold">
    <div class:highlighted={selectedGear === 'p'}>P</div>
    <div class:highlighted={selectedGear === 'r'}>R</div>
    <div class:highlighted={selectedGear === 'n'}>N</div>
    <div class:highlighted={selectedGear === 'l'}>L</div>
    <div class:highlighted={selectedGear === 'a'}>A</div>
    <div class:highlighted={selectedGear === 'd'}>D</div>
  </div>
</div>

<style lang="postcss">
  .highlighted {
    @apply text-white;
  }
</style>
