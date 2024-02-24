<script lang="ts">
  import CameraContainer from './CameraContainer.svelte'
</script>

<div
  class="flex gap-4 w-full py-40 px-10 backdrop-blur-lg justify-center h-full rounded-3xl shadow-md bg-slate-300 bg-opacity-30"
>
  <div class="my-auto">
    <CameraContainer cameraUrl="camera_url_here" />
  </div>
  <div class="my-auto">
    <CameraContainer cameraUrl="camera_url_here" />
  </div>
</div>

<style lang="postcss">
</style>
