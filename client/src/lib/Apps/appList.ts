import Camera from './Camera/Camera.svelte'
import MusicBrowser from './MusicBrowser/MusicBrowser.svelte'

export const appList = {
  'camera': {
    name: 'Camera',
    component: Camera,
    icon: '/static/app-icons/camera.png',
  },
  'media-player': {
    name: 'Media Player',
    component: MusicBrowser,
    icon: '/static/app-icons/media-player.png',
  },
}
