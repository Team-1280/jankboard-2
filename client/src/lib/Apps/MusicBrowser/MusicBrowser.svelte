<script lang="ts">
  import Song from './Song.svelte'
  import { songList } from '../../Dashboard/MediaPlayer/songList'
</script>

<div
  class="flex gap-4 w-full py-10 px-10 bg-blue-200 bg-opacity-25 backdrop-blur-xl h-full media-background rounded-3xl flex-wrap"
>
  {#each Object.entries(songList) as [slug, song]}
    <Song {song} {slug} />
  {/each}
</div>
