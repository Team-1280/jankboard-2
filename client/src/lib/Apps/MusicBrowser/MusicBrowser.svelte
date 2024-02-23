<!-- 
  @component

  Displays the list of songs
 -->
<script lang="ts">
  import Song from './Song.svelte'
  import { songList } from '../../Dashboard/MediaPlayer/songList'
</script>

<div
  class="flex gap-4 w-full py-10 px-10 bg-blue-200 bg-opacity-25 backdrop-blur-xl h-full media-background rounded-3xl flex-wrap"
>
  <h2 class="text-8xl font-bold basis-full text-slate-200">Music</h2>
  <div class="basis-full h-2" />
  {#each Object.entries(songList) as [slug, song]}
    <Song {song} {slug} />
  {/each}
</div>
