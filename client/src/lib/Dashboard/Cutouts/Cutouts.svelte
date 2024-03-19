<!-- 
  @component

  Camera cutout overlay that displays over the app
 -->

<script lang="ts">
  import { fly } from 'svelte/transition'
  import { settingsStore } from '../../stores/settingsStore'
  import ClosableCutout from './ClosableCutout.svelte'

  export let show: boolean = false
</script>

{#if show}
  <div class="fixed top-4 right-4 flex gap-4" transition:fly={{ y: -50 }}>
    <ClosableCutout src={$settingsStore.frontCameraAddr} />
    <ClosableCutout src={$settingsStore.rearCameraAddr} />
  </div>
{/if}
