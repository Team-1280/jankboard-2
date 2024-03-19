<script lang="ts">
  import AppContainer from '../AppContainer.svelte'
  import CameraContainer from './CameraContainer.svelte'
  import { settingsStore } from '../../stores/settingsStore'
</script>

<AppContainer
  class="px-10 py-20 flex gap-4 w-full backdrop-blur-lg justify-center h-full rounded-3xl shadow-md bg-slate-300 bg-opacity-30"
>
  <div class="my-auto">
    <CameraContainer cameraUrl={$settingsStore.frontCameraAddr} />
  </div>
  <div class="my-auto">
    <CameraContainer cameraUrl={$settingsStore.rearCameraAddr} />
  </div>
</AppContainer>
