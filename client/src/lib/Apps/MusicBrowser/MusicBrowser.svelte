<!-- 
  @component

  Displays the list of songs
 -->
<script lang="ts">
  import Song from './Song.svelte'
  import { songList } from '../../Dashboard/MediaPlayer/songList'
  import AppContainer from '../AppContainer.svelte'
  import { onMount } from 'svelte'
  import { musicPlayerBootupSequence } from '../../Sequences/sequences'

  onMount(() => {
    setTimeout(musicPlayerBootupSequence, 5000)
  })
</script>

<AppContainer
  class="flex gap-4 bg-blue-200 bg-opacity-25 backdrop-blur-xl media-background rounded-3xl flex-wrap px-10 py-20"
>
  <h2 class="h-full w-full text-8xl font-bold basis-full text-slate-200">
    Music
  </h2>
  <div class="basis-full h-2" />
  {#each Object.entries(songList) as [slug, song]}
    <Song {song} {slug} />
  {/each}
</AppContainer>
