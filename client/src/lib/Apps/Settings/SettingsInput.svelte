<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { settingsStore } from '../../stores/settingsStore'
  import type { SettingsStoreData } from '../../stores/settingsStore'
  import { tooltip as tooltipAction } from '@svelte-plugins/tooltips'
  import { get } from 'svelte/store'

  export let setting: keyof SettingsStoreData
  export let tooltip: string
  export let width: string = 'auto'

  let value: string

  const handleSubmit = async () => {
    await tick()
    settingsStore.update(setting, value)
  }

  const checkKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  onMount(async () => {
    await tick()
    // @ts-expect-error
    value = get(settingsStore)[setting]
  })

  settingsStore.subscribe(data => {
    // @ts-expect-error
    value = data[setting]
  })
</script>

<span class="flex flex-row gap-2">
  <input
    bind:value
    type="text"
    on:keydown={checkKeyPress}
    style="width: {width};"
    class="text-slate-800 rounded-lg p-0.5 text-center"
  />
  <button
    class="bg-blue-500 px-2 py-1 rounded-lg hover:brightness-75 font-medium"
    on:click={handleSubmit}
  >
    <span class="material-symbols-outlined mt-1">check</span>
  </button>
  <label
    class="text-xl text-slate-100 font-medium my-auto"
    use:tooltipAction={{ content: tooltip, action: 'hover', arrow: false }}
    for={setting}><slot /></label
  >
</span>
