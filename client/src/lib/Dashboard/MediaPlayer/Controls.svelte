<!-- 
  @component
  
  @param playing - Whether the music is playing
 -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let playing = false
</script>

<div class="my-auto flex gap-4 mr-4">
  <button class="mt-2 hover:brightness-75" on:click={() => dispatch('rewind')}>
    <span class="material-symbols-outlined icon">skip_previous</span>
  </button>
  <button class="mt-2 hover:brightness-75" on:click={() => dispatch('toggle')}>
    {#if playing}
      <span class="material-symbols-outlined icon">pause</span>
    {:else}
      <span class="material-symbols-outlined icon">play_arrow</span>
    {/if}
  </button>
  <button class="mt-2 hover:brightness-75" on:click={() => dispatch('skip')}>
    <span class="material-symbols-outlined icon">skip_next</span>
  </button>
</div>

<style lang="postcss">
  .icon {
    font-size: 34px;
    font-variation-settings: 'FILL' 1;
  }
</style>
