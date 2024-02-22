<script lang="ts">
  export let activeApp: App
  export let appList: AppData
</script>

<!-- Genius codeium engineering automatically loads apps -->
<div
  class="flex gap-4 justify-between h-20 bg-slate-300 backdrop-blur-sm rounded-xl px-6 shadow-md"
>
  {#each Object.entries(appList) as [appName, appData]}
    <button
      on:click={() => {
        // jank svelte won't let you use typescript in code blocks,
        // so we have to ignore this fake type error
        // @ts-ignore
        activeApp = appName
      }}
    >
      <img
        src={appData.icon}
        alt={appName + ' icon'}
        class="app-icon"
        class:selected={activeApp === appName}
      />
    </button>
  {/each}
</div>

<style lang="postcss">
  .app-icon {
    @apply my-auto hover:brightness-50 h-16 rounded-2xl shadow-md transition-all duration-150;
  }
  .selected {
    @apply brightness-50;
  }
</style>
