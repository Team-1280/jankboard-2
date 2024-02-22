<script lang="ts">
  import { AudioManager } from './audioManager'
  import { musicStore } from '../../stores/musicStore'
  import { songList } from './songList'

  const audioManager = new AudioManager()
  $: currentSong = songList[$musicStore.queue[$musicStore.currentIndex]]

  let src: string = ''
  $: {
    if (currentSong) src = currentSong.src
    console.log(currentSong)
  }

  $: {
    if (src !== '' && $musicStore.playing) {
      audioManager.playAudio(src)
      console.log(src)
    } else if (!$musicStore.playing) {
      console.log('stopping')
      audioManager.stopAudio()
    }
    console.log($musicStore.queue)
    console.log($musicStore.currentIndex)
  }
</script>
