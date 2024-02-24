<script lang="ts">
  import CameraContainer from './CameraContainer.svelte'
  import { fade } from 'svelte/transition'
</script>

<div
  in:fade={{ duration: 150, delay: 150 }}
  out:fade={{ duration: 150 }}
  class="flex gap-4 w-full py-40 px-10 backdrop-blur-lg justify-center h-full rounded-3xl shadow-md bg-slate-300 bg-opacity-30"
>
  <div class="my-auto">
    <CameraContainer cameraUrl="camera_url_here" />
  </div>
  <div class="my-auto">
    <CameraContainer cameraUrl="camera_url_here" />
  </div>
</div>
