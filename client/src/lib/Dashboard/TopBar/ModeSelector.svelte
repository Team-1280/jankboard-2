<!-- 
  @component
  
  @param selectedMode - Selected mode
  @param placeholder - Whether or not to show the placeholder skeleton

  Displays the drive mode
 -->
<script lang="ts">
  import {
    modeChillSequence,
    modeCruiseSequence,
    modeLudicrousSequence,
  } from '../../Sequences/sequences'

  export let selectedMode: Mode
  export let placeholder: boolean

  let modeText = ''

  const setModeText = (selectedMode: Mode) => {
    switch (selectedMode) {
      case 'chill':
        modeText = 'CHILL'
        modeChillSequence()
        break
      case 'cruise':
        modeText = 'CRUISE'
        modeCruiseSequence()
        break
      case 'ludicrous':
        modeText = 'LUDICROUS'
        modeLudicrousSequence()
        break
    }
  }

  $: {
    if (placeholder) {
      modeText = 'DISCONNECTED'
    } else {
      setModeText(selectedMode)
    }
  }
</script>

<div class="font-medium text-xl">
  <span>{modeText}</span>
</div>
