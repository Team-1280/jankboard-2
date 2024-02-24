<script lang="ts">
  import AppContainer from '../AppContainer.svelte'
  import CameraContainer from './CameraContainer.svelte'
</script>

<AppContainer
  class="px-10 py-20 flex gap-4 w-full backdrop-blur-lg justify-center h-full rounded-3xl shadow-md bg-slate-300 bg-opacity-30"
>
  <div class="my-auto">
    <CameraContainer cameraUrl="camera_url_here" />
  </div>
  <div class="my-auto">
    <CameraContainer cameraUrl="camera_url_here" />
  </div>
</AppContainer>
