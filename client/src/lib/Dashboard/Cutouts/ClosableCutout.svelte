<!-- 
  @component

  An individual camera cutout that can be closed

  @param src - The source URL of the camera feed
  @param show - Whether or not to show the cutout
 -->
<script lang="ts">
  import { fly } from 'svelte/transition'

  export let src: string
  export let show: boolean = true

  const closeCutout = () => {
    show = false
  }
</script>

{#if show}
  <div
    class="rounded-lg bg-white bg-opacity-20 backdrop-blur-xl p-4 relative"
    out:fly={{ y: -50 }}
  >
    <button
      class="absolute top-2 right-2 bg-white bg-opacity-20 backdrop-blur-md hover:brightness-75 rounded-lg pt-2 px-2 pb-1"
      on:click={closeCutout}
      ><span class="material-symbols-outlined">close</span></button
    >
    <img {src} alt="Front Camera" class="min-w-[300px] min-h-[300px]" />
  </div>
{/if}
