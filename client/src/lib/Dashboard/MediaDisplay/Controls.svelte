<script lang="ts">
  export let playing = false
</script>

<div class="my-auto flex gap-4">
  <button class="mt-2">
    <span class="material-symbols-outlined icon">skip_previous</span>
  </button>
  {#if playing}
    <button class="mt-2">
      <span class="material-symbols-outlined icon"> pause </span>
    </button>
  {:else}
    <button class="mt-2">
      <span class="material-symbols-outlined icon">play_arrow</span>
    </button>
  {/if}
  <button class="mt-2">
    <span class="material-symbols-outlined icon">skip_next</span>
  </button>
</div>

<style lang="postcss">
  .icon {
    font-size: 34px;
    font-variation-settings: 'FILL' 1;
  }
</style>
