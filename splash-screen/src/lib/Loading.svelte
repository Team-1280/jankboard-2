<script lang="ts">
  import { blur, fade } from 'svelte/transition'

  import SvelteLogo from './SvelteLogo.svelte'
  import { onMount } from 'svelte'

  let loadingStuck = false

  onMount(() => {
    setTimeout(() => {
      loadingStuck = true
    }, 3000)
  })
</script>

<div
  class="absolute w-screen h-screen flex justify-center items-center flex-col overflow-hidden select-none bg"
  transition:blur={{ duration: 300, amount: 0.5 }}
>
  <div class="max-w-64">
    <SvelteLogo />
  </div>
  {#if loadingStuck}
    <p
      class="text-5xl text-slate-300 absolute bottom-20 animate-pulse"
      transition:fade={{ duration: 300 }}
    >
      Loading 3D assets...please wait
    </p>
  {/if}
</div>

<style lang="postcss">
  .bg {
    background-image: url('../../assets/wallpaper.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
