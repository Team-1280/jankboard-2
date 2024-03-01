<!-- 
  @component
  
  A selector component that updates settings with the selected value. Designed
  to be used with settings which have a fixed amount of set values. Only works with
  settings with number or string values. Prefer the Toggle input type for boolean
  settings.

  @param setting - The setting to be toggled
  @param options - The options to be shown in the selector. Must be possible (valid) 
  values for the setting.
  @param tooltip - Helpful tooltip for the setting
 -->
<script lang="ts">
  import { settingsStore } from '../../stores/settingsStore'
  import type { SettingsStoreData } from '../../stores/settingsStore'
  import { tooltip as tooltipAction } from '@svelte-plugins/tooltips'

  export let setting: keyof SettingsStoreData
  export let options: string[] | number[]
  export let tooltip: string = ''

  if (typeof setting !== 'string') {
    throw new Error('Selector setting must be a string')
  }

  let selected: string | number = $settingsStore[setting] as string | number

  // Setting is guaranteed to be string by guard clause above
  // @ts-expect-error
  $: selected && settingsStore.update(setting, selected)
</script>

<div class="flex gap-2 my-1">
  <select bind:value={selected} class="w-min bg-slate-400 text-md">
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  <label
    class="text-xl font-medium text-slate-100"
    for={setting}
    use:tooltipAction={{ content: tooltip, action: 'hover', arrow: false }}
    ><slot /></label
  >
</div>
