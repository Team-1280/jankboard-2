type Gear = 'p' | 'r' | 'n' | 'l' | 'a' | 'd'

type Mode = 'chill' | 'ludicrous' | 'cruise'

type App = 'camera' | 'media-player'

interface SongData {
  title: string
  artist: string
  src: string
  coverImg: string
}

interface AppData {
  [key: App]: {
    name: string
    component: SvelteComponent
    icon: string
  }
}
