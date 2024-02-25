import Camera from './Camera/Camera.svelte'
import MusicBrowser from './MusicBrowser/MusicBrowser.svelte'
import Settings from './Settings/Settings.svelte'

type Format = 'png' | 'jpg' | 'webp'
const resolveIconPath = (slug: keyof typeof appList, format: Format) => {
  return `/static/app-icons/${slug}.${format}`
}

import GBAEmulator from './GBAEmulator/GBAEmulator.svelte'

interface AppList {
  [key: string]: {
    name: string
    component: any
    icon: string
    external: boolean
  }
}

export const appList: AppList = {
  'camera': {
    name: 'Camera',
    component: Camera,
    icon: resolveIconPath('camera', 'png'),
    external: false,
  },
  'media-player': {
    name: 'Media Player',
    component: MusicBrowser,
    icon: resolveIconPath('media-player', 'png'),
    external: false,
  },
  'settings': {
    name: 'Settings',
    component: Settings,
    icon: resolveIconPath('settings', 'webp'),
    external: false,
  },
  'gba-emulator': {
    name: 'GBA Emulator',
    component: GBAEmulator,
    icon: resolveIconPath('gba-emulator', 'png'),
    external: true,
  },
}
