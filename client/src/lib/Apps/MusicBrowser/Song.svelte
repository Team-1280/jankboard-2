<!-- 
  @component
  
  @param song - Song data
  @param slug - Song slug

  Displays a song and its metadata
 -->
<script lang="ts">
  import { musicStore } from '../../stores/musicStore'

  export let song: SongData
  export let slug: string

  let { title, artist, coverImg } = song

  const handlePlay = () => {
    musicStore.play(slug)
  }

  const handleQueueNext = () => {
    musicStore.queueNext(slug)
  }

  const handleQueueLast = () => {
    musicStore.push(slug)
  }

  $: nowPlaying = slug === $musicStore.queue[$musicStore.currentIndex]
</script>

<div
  class="flex gap-1 flex-col rounded-lg p-4 bg-slate-800 backdrop-blur-xl shadow-md w-60 flex-grow basis-1/5"
>
  <img src={coverImg} alt="album cover" class="shadow-md rounded-lg w-full" />
  <p class="mt-2 text-2xl font-medium">{title}</p>
  <p class="text-xl text-slate-400">{artist}</p>
  <div class="flex justify-center">
    <div class="my-auto flex gap-4">
      <button
        class="mt-2 hover:brightness-75"
        on:click={!nowPlaying ? handlePlay : () => {}}
      >
        <span class="material-symbols-outlined icon fill">play_arrow</span>
      </button>
      <button class="mt-2 hover:brightness-75" on:click={handleQueueNext}>
        <span class="material-symbols-outlined icon fill">next_plan</span>
      </button>
      <button class="mt-2 hover:brightness-75" on:click={handleQueueLast}>
        <span class="material-symbols-outlined icon">queue_music</span>
      </button>
    </div>
  </div>
</div>

<style lang="postcss">
  .icon {
    font-size: 28px;
  }
  .fill {
    font-variation-settings: 'FILL' 1;
  }
</style>
