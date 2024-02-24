<!-- 
  @component
  
  @param selectedMode - Selected mode

  Displays the drive mode
 -->
<script lang="ts">
  export let selectedMode: Mode | '-999'

  let modeText = ''

  $: switch (selectedMode) {
    case 'chill':
      modeText = 'CHILL'
      break
    case 'cruise':
      modeText = 'CRUISE'
      break
    case 'ludicrous':
      modeText = 'LUDICROUS'
      break
    case '-999':
      modeText = 'DISCONNECTED'
      break
  }
</script>

<div class="font-medium text-xl">
  {modeText}
</div>
