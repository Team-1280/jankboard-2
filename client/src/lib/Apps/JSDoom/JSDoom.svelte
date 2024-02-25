<script lang="ts">
  import { onMount } from 'svelte'
  import AppContainer from '../AppContainer.svelte'
  import { doomBootupSequence } from '../../Sequences/sequences'
  import { Notifications } from '../../Notifications/notifications'

  onMount(() => {
    fetch('/static/external-apps/jsdoom/index.html')
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error('Doom failed to load', { cause: res })
        } else {
          doomBootupSequence()
        }
      })
      .catch(() => {
        Notifications.error(
          'Failed to load the Doom app. Did you add it to the app/static/external-apps directory?',
          { duration: 10000 }
        )
      })
    Notifications.warn(
      'Doom is currently not working in this version of Jankboard.'
    )
  })
</script>

<AppContainer>
  <!-- <iframe
    title="JSDoom"
    src="/static/external-apps/jsdoom/index.html"
    class="w-full h-screen rounded-xl"
    frameborder="0"
  /> -->
</AppContainer>
