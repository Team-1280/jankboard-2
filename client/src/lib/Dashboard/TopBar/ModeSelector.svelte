<!-- 
  @component
  
  @param selectedMode - Selected mode
  @param placeholder - Whether or not to show the placeholder skeleton

  Displays the drive mode
 -->
<script lang="ts">
  import { fade } from 'svelte/transition'

  export let selectedMode: Mode
  export let placeholder: boolean

  let modeText = ''

  $: {
    if (placeholder) {
      modeText = 'DISCONNECTED'
    } else {
      switch (selectedMode) {
        case 'chill':
          modeText = 'CHILL'
          break
        case 'cruise':
          modeText = 'CRUISE'
          break
        case 'ludicrous':
          modeText = 'LUDICROUS'
          break
      }
    }
  }
</script>

<div class="font-medium text-xl">
  <span>{modeText}</span>
</div>
