<script lang="ts">
  import TopBar from './TopBar/TopBar.svelte'
  import Speedometer from './Speedometer.svelte'
  import SpeedLimit from './SpeedLimit.svelte'
  import MediaDisplay from './MediaPlayer/MediaDisplay.svelte'
  import Player from './MediaPlayer/Player.svelte'
</script>

<Player />

<div class="mt-2">
  <div class="px-5">
    <TopBar />
    <div class="h-0.5 mt-1 w-full bg-slate-300 border-0"></div>
    <div class="mt-8 flex justify-between">
      <Speedometer />
      <SpeedLimit />
    </div>
  </div>

  <div class="fixed bottom-0 w-[35vw]">
    <MediaDisplay />
  </div>
</div>
