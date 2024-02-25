<script lang="ts">
  import { blur } from "svelte/transition";

  import SvelteLogo from "./SvelteLogo.svelte";
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
    background: #2c3e50; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #2c3e50,
      #fd746c
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #2c3e50,
      #fd746c
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
