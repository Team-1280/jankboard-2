<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fade, draw, fly } from 'svelte/transition'
  import { expand } from './customTransitions'
  import { inner, outer } from './shape'
  import { onMount } from 'svelte'

  let visible = false

  onMount(() => {
    visible = true
  })
</script>

{#if visible}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 124">
    <g out:fade={{ duration: 200 }} opacity="0.35">
      <path
        in:expand={{ duration: 400, delay: 1000, easing: quintOut }}
        style="stroke: #ff3e00; fill: #ff3e00; stroke-width: 50;"
        d={outer}
      />
      <path
        in:draw={{ duration: 1000 }}
        style="stroke:#ff3e00; stroke-width: 2;"
        stroke-linecap="round"
        d={inner}
      />
    </g>
  </svg>

  <div class="centered" out:fly={{ y: -20, duration: 800 }}>
    {#each 'JANKBOARD' as char, i}
      <span in:fade|global={{ delay: 1000 + i * 150, duration: 800 }}
        >{char}</span
      >
    {/each}
  </div>
{/if}

<style lang="postcss">
  svg {
    width: 100%;
    height: 100%;
  }

  path {
    fill: white;
    opacity: 1;
  }

  .centered {
    @apply text-8xl absolute text-slate-300;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 0.12em;
    font-weight: 400;
  }

  .centered span {
    will-change: filter;
  }
</style>
