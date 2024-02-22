<script lang="ts">
  import CameraContainer from './CameraContainer.svelte'
</script>

<div
  class="flex gap-4 w-full py-40 px-10 backdrop-blur-lg justify-center h-full rounded-3xl shadow-md bg-slate-300 bg-opacity-30"
>
  <div class="my-auto">
    <CameraContainer
      cameraUrl="https://www.investopedia.com/thmb/1epKngue22nqkTg1v8H_Yz5O6Ng=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Soros-final-f2fd5a6b1dce4ef88d60443754b79bcb.png"
    />
  </div>
  <div class="my-auto">
    <CameraContainer
      cameraUrl="https://www.investopedia.com/thmb/1epKngue22nqkTg1v8H_Yz5O6Ng=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Soros-final-f2fd5a6b1dce4ef88d60443754b79bcb.png"
    />
  </div>
</div>

<style lang="postcss">
</style>
