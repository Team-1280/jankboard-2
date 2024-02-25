<script lang="ts">
  import AppContainer from '../AppContainer.svelte'
  import { Notifications } from '../../Notifications/notifications'
  import { onMount } from 'svelte'
  import { gbaEmulatorBootupSequence } from '../../Sequences/sequences'

  onMount(() => {
    fetch('/static/external-apps/gba-emulator/index.html')
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error('GBA failed to load', { cause: res })
        } else {
          gbaEmulatorBootupSequence()
        }
      })
      .catch(() => {
        Notifications.error(
          'Failed to load the GBA Emulator app. Did you add it to the app/static/external-apps directory?',
          { duration: 10000 }
        )
      })
  })
</script>

<AppContainer useContainer={false} class="h-screen w-full">
  <iframe
    title="GBA Emulator"
    src="/static/external-apps/gba-emulator/index.html"
    class="w-full h-screen rounded-xl"
    frameborder="0"
  />
</AppContainer>
