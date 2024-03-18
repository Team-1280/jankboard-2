<!-- 
  @component
  
  @param cameraUrl - URL of the camera

  Displays a camera feed, or a placeholder if it doesn't exist
 -->
<script lang="ts">
  export let cameraUrl: string

  let feed: HTMLImageElement
  let placeholder: HTMLDivElement

  $: {
    if (feed && placeholder) {
      placeholder.style.width = `${feed.clientWidth}px`
      placeholder.style.height = `${feed.clientHeight}px`
    }
  }
</script>

<div>
  <div class="grid">
    <img
      src={cameraUrl}
      width="400px"
      height="400px"
      class="rounded-xl shadow-md layer1 z-10"
      alt="⠀"
      bind:this={feed}
    />
    <div
      class="rounded-xl shadow-md bg-neutral-300 animate-pulse layer2"
      bind:this={placeholder}
    />
  </div>
</div>

<style lang="postcss">
  .layer1,
  .layer2 {
    grid-column: 1;
    grid-row: 1;
  }
</style>
