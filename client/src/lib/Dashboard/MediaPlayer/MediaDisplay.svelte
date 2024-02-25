<!-- 
  @component
  
  The dashboard's media controller. Automatically updates with the music service.
 -->
<script lang="ts">
  import Controls from './Controls.svelte'
  import { musicStore } from '../../stores/musicStore'
  import { songList } from './songList'
  import { fly } from 'svelte/transition'
  import { cubicInOut } from 'svelte/easing'
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'

  $: currentSong = $musicStore.queue[$musicStore.currentIndex]
  $: songData = songList[currentSong]

  const skip = () => {
    musicStore.skip()
  }

  const rewind = () => {
    musicStore.rewind()
  }

  const toggle = () => {
    musicStore.toggle()
  }

  onMount(() => {
    document.addEventListener('ended', () => {
      musicStore.skip()
    })
  })
</script>

{#if songData}
  <div
    class="rounded-t-lg bg-neutral-800 px-4 py-2 h-24 flex justify-between"
    transition:fly={{ y: 100, duration: 300, easing: cubicInOut }}
  >
    <div class="flex gap-6">
      <div class="aspect-square">
        <img
          src={songData.coverImg}
          alt="album cover"
          class="w-20 h-20 aspect-square object-cover rounded-lg shadow-sm shadow-neutral-500"
        />
      </div>
      <div class="my-auto">
        <p class="text-xl font-medium">{songData.title}</p>
        <p class="text-lg text-slate-400">{songData.artist}</p>
      </div>
    </div>
    <Controls
      on:skip={skip}
      on:toggle={toggle}
      on:rewind={rewind}
      playing={$musicStore.playing}
    />
  </div>
{/if}
