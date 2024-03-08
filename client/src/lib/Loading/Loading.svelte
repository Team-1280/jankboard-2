<script lang="ts">
  import { blur } from 'svelte/transition'

  import SvelteLogo from './SvelteLogo.svelte'
</script>

<div
  class="absolute w-screen h-screen flex justify-center items-center flex-col overflow-hidden select-none bg"
  transition:blur={{ duration: 300, amount: 0.5 }}
>
  <div class="max-w-64">
    <SvelteLogo />
  </div>
</div>

<style lang="postcss">
  .bg {
    background-image: url('../../assets/wallpaper.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
