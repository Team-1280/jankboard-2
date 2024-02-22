<script lang="ts">
  import Song from './Song.svelte'
  import { songList } from './songList'
</script>

<div
  class="flex gap-4 w-full py-10 px-10 backdrop-blur-xl h-full media-background rounded-3xl flex-wrap"
>
  {#each songList as song}
    <Song {song} />
  {/each}
</div>

<style lang="postcss">
  .media-background {
    background: radial-gradient(
      circle,
      rgba(238, 174, 202, 1) 0%,
      rgba(148, 187, 233, 1) 100%
    );
  }
</style>
