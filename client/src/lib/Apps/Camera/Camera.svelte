<script lang="ts">
  import CameraContainer from './CameraContainer.svelte'
</script>

<div
  class="flex gap-4 w-full py-40 px-10 backdrop-blur-lg justify-center h-full camera-background rounded-3xl"
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
  .camera-background {
    background: #4b79a1; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #4b79a1,
      #283e51
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #4b79a1,
      #283e51
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
