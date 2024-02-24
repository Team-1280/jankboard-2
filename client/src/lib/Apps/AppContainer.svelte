<!-- 
  @component
  
  A utility component that wraps your app in a container and adds transitions
  
  @param useContainer - Whether or not to use the default app container. Defaults to true.
 -->

<script lang="ts">
  import { fade } from 'svelte/transition'

  export let useContainer: boolean = true
</script>

<div
  in:fade={{ duration: 150, delay: 150 }}
  out:fade={{ duration: 150 }}
  class:app-container={useContainer}
  {...$$restProps}
>
  <slot />
</div>

<style lang="postcss">
  .app-container {
    @apply pb-20;
  }
</style>
