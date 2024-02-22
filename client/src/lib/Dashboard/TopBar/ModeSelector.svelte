<script lang="ts">
  export let selectedMode: Mode

  let modeText = ''

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
</script>

<div class="font-medium text-xl">
  {modeText}
</div>
