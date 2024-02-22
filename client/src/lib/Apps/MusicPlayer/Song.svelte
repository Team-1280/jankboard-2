<script lang="ts">
  export let song: SongData

  let { title, artist, coverImg } = song
</script>

<div
  class="flex gap-1 flex-col rounded-lg p-4 bg-slate-800 backdrop-blur-xl shadow-md w-60"
>
  <img src={coverImg} alt="album cover" class="shadow-md rounded-lg w-full" />
  <p class="mt-2 text-3xl font-medium">{title}</p>
  <p class="text-xl text-slate-400">{artist}</p>
  <div class="flex justify-center">
    <div class="my-auto flex gap-4">
      <button class="mt-2">
        <span class="material-symbols-outlined icon">skip_previous</span>
      </button>
      <button class="mt-2">
        <span class="material-symbols-outlined icon">play_arrow</span>
      </button>
      <button class="mt-2">
        <span class="material-symbols-outlined icon">skip_next</span>
      </button>
    </div>
  </div>
</div>

<style lang="postcss">
  .icon {
    font-size: 28px;
    font-variation-settings: 'FILL' 1;
  }
</style>
