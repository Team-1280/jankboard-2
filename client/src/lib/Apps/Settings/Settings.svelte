<script lang="ts">
  import { Notifications } from '../../Notifications/notifications'
  import AppContainer from '../AppContainer.svelte'

  const handleClick = () => {
    Notifications.error('Jankboard initialized', {
      src: '/static/voices/en/jankboard-initialized.wav',
    })
    Notifications.playAudio('static/voices/en/jankboard-initialized.wav')
  }
</script>

<AppContainer
  class="flex gap-4 bg-blue-200 bg-opacity-25 backdrop-blur-xl media-background rounded-3xl flex-wrap px-10 py-20"
>
  <button
    class="px-4 py-2 bg-blue-500 rounded-md hover:brightness-75"
    on:click={handleClick}
  >
    Test Toast
  </button>
</AppContainer>
