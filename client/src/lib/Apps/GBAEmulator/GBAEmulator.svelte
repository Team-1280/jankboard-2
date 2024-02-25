<script lang="ts">
  import AppContainer from '../AppContainer.svelte'
  import { Notifications } from '../../Notifications/notifications'
  import { onMount } from 'svelte'
  import { gbaEmulatorBootupSequence } from '../../Sequences/sequences'

  const handleError = () => {
    Notifications.warn(
      'Failed to load the GBA Emulator app. Did you add it to the app/static/external-apps directory?'
    )
  }

  onMount(() => {
    gbaEmulatorBootupSequence()
  })
</script>

<AppContainer useContainer={false} class="h-screen w-full">
  <iframe
    title="GBA Emulator"
    src="/static/external-apps/gba-emulator/index.html"
    class="w-full h-screen rounded-xl"
    frameborder="0"
    on:error={handleError}
  />
</AppContainer>
