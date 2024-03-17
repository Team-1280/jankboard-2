<script lang="ts">
  import { fly } from 'svelte/transition'

  import SvelteLogo from './SvelteLogo.svelte'
  import { onMount } from 'svelte'
  import { cubicIn } from 'svelte/easing'

  let loadingStuck = false

  onMount(() => {
    setTimeout(() => {
      loadingStuck = true
    }, 3000)
  })
</script>

<div
  class="absolute w-screen h-screen flex justify-center items-center flex-col overflow-hidden select-none bg"
>
  <div class="max-w-64">
    <SvelteLogo />
  </div>
  {#if loadingStuck}
    <p
      class="text-4xl text-slate-300 absolute bottom-20 animate-pulse font-medium"
      in:fly={{ duration: 150, y: 25, easing: cubicIn }}
    >
      Loading 3D assets...
    </p>
  {/if}
</div>

<style lang="postcss">
  .bg {
    background-image: url('/splash-screen.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
