<!-- 
  @component
  
  @param cameraUrl - URL of the camera

  Displays a camera feed, or a placeholder if it doesn't exist
 -->
<script lang="ts">
  export let cameraUrl: string
</script>

<div>
  <!-- svelte-ignore a11y-missing-attribute -->
  <div class="grid">
    <img
      src={cameraUrl}
      width="400px"
      height="400px"
      class="rounded-xl shadow-md layer1 z-10"
      alt="⠀"
    />
    <div
      class="w-[400px] h-[400px] rounded-xl shadow-md bg-neutral-300 animate-pulse layer2"
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
