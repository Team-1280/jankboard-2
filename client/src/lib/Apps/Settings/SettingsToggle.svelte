<!-- 
  @component
  
  @param setting - The setting to be toggled
  @param inverted? - If false, the toggle syncs to the setting (toggle = on, setting = true). If true, the toggle syncs to the setting's inverse (toggle = off, setting = true).
  @param tooltip - Helpful tooltip for the setting
  @param disabled - Whether or not the setting is disabled

  @children The setting's label
 -->

<script lang="ts">
  import type { SettingsStoreData } from '../../stores/settingsStore'
  import { settingsStore } from '../../stores/settingsStore'
  import Switch from './Switch.svelte'

  export let setting: keyof SettingsStoreData
  export let inverted: boolean = false
  export let tooltip: string = ''
  export let disabled: boolean = false

  $: value = inverted ? !$settingsStore[setting] : $settingsStore[setting]

  const handleClick = () => {
    settingsStore.update(setting, !value)
  }
</script>

<Switch {disabled} bind:checked={value} on:click={handleClick} {tooltip}
  ><slot /></Switch
>
