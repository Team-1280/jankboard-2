<script lang="ts">
  import {
    shiftedInAutoSequence,
    shiftedInDriveSequence,
    shiftedInLowSequence,
    shiftedInNeutralSequence,
    shiftedInParkSequence,
    shiftedInReverseSequence,
  } from '../../Sequences/sequences'

  export let selectedGear: Gear
  export let placeholder: boolean

  const shift = (selectedGear: Gear) => {
    switch (selectedGear) {
      case 'park':
        shiftedInParkSequence()
        break
      case 'reverse':
        shiftedInReverseSequence()
        break
      case 'neutral':
        shiftedInNeutralSequence()
        break
      case 'low':
        shiftedInLowSequence()
        break
      case 'auto':
        shiftedInAutoSequence()
        break
      case 'drive':
        shiftedInDriveSequence()
        break
    }
  }

  $: shift(selectedGear)
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
