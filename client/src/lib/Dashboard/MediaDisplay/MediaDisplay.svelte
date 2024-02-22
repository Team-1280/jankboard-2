<script lang="ts">
  import Controls from './Controls.svelte'
</script>

<div class="rounded-t-lg bg-neutral-800 px-4 py-2 h-24 flex justify-between">
  <div class="flex gap-6">
    <div class="aspect-square">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Loggins_-_Danger_Zone_single_cover.png/220px-Loggins_-_Danger_Zone_single_cover.png"
        alt="album cover"
        class="w-full h-full object-cover rounded-lg shadow-sm shadow-neutral-500"
      />
    </div>
    <div class="my-auto">
      <p class="text-xl font-medium">Danger Zone</p>
      <p class="text-lg text-slate-400">Kenny Loggins</p>
    </div>
  </div>
  <Controls playing={false} />
</div>
