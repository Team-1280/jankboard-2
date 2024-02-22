<script lang="ts">
  import Controls from './Controls.svelte'
  import { musicStore } from '../../stores/musicStore'
  import { songList } from './songList'

  $: currentSong = $musicStore.queue[$musicStore.currentIndex]
  $: songData = songList[currentSong]

  const skip = () => {
    musicStore.skip()
  }

  const handleRewind = () => {}

  const toggle = () => {
    musicStore.toggle()
  }
</script>

{#if songData}
  <div class="rounded-t-lg bg-neutral-800 px-4 py-2 h-24 flex justify-between">
    <div class="flex gap-6">
      <div class="aspect-square">
        <img
          src={songData.coverImg}
          alt="album cover"
          class="w-full h-full object-cover rounded-lg shadow-sm shadow-neutral-500"
        />
      </div>
      <div class="my-auto">
        <p class="text-xl font-medium">{songData.title}</p>
        <p class="text-lg text-slate-400">{songData.artist}</p>
      </div>
    </div>
    <Controls on:skip={skip} on:toggle={toggle} playing={$musicStore.playing} />
  </div>
{/if}
