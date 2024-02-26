<script lang="ts">
  import AppContainer from '../AppContainer.svelte'
</script>

<AppContainer
  class="flex gap-6 bg-blue-200 bg-opacity-25 backdrop-blur-xl media-background rounded-3xl flex-wrap px-10 py-20"
>
  <h1 class="text-5xl font-medium text-slate-100 basis-full">
    Developer Tools
  </h1>
  <h2 class="basis-full">
    This is an app where developers can add buttons that trigger code to help
    during development.
  </h2>
  <p class="basis-full">
    Make sure the entry for this app is commented out in appList.ts before
    building for production.
  </p>
  <button class="button">Button</button>
</AppContainer>

<style lang="postcss">
  .button {
    @apply px-4 py-2 bg-blue-500 hover:brightness-75 font-medium rounded-lg w-min;
  }
</style>
