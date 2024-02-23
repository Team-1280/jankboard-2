import { writable } from 'svelte/store'
import { songList } from '../Dashboard/MediaPlayer/songList'
import { AudioPlayer } from './audioManager'

interface MusicQueue {
  queue: string[]
  currentIndex: number
  player: AudioPlayer
  playing: boolean
}

function createMusicStore() {
  const { subscribe, set, update } = writable<MusicQueue>({
    queue: [],
    currentIndex: 0,
    player: new AudioPlayer(),
    playing: false,
  })

  return {
    subscribe,
    play: (songSlug: string) =>
      update(store => {
        if (store.queue.length >= 1) {
          store.queue.splice(store.currentIndex + 1, 0, songSlug)
          store.currentIndex++
          store.player.play(songList[songSlug].src)
        } else {
          store.queue[0] = songSlug
          store.currentIndex = 0
          store.player.play(songList[songSlug].src)
        }
        store.playing = true

        return store
      }),
    push: (songSlug: string) =>
      update(store => {
        store.queue.push(songSlug)
        return store
      }),
    skip: () =>
      update(store => {
        if (store.currentIndex < store.queue.length - 1) {
          let next = store.queue[store.currentIndex + 1]
          store.currentIndex++
          store.playing = true
          store.player.play(songList[next].src)
        }
        return store
      }),
    queueNext: (songSlug: string) =>
      update(store => {
        store.queue.splice(store.currentIndex + 1, 0, songSlug)
        return store
      }),
    toggle: () =>
      update(store => {
        if (store.player.playing) {
          store.playing = false
          store.player.pause()
        } else {
          store.playing = true
          store.player.unpause()
        }
        return store
      }),
    pause: update(store => {
      store.player.pause()

      return store
    }),
    unpause: update(store => {
      store.player.unpause()

      return store
    }),
    rewind: () =>
      update(store => {
        store.currentIndex--
        store.player.play(songList[store.queue[store.currentIndex]].src)
        store.playing = true
        return store
      }),
    reset: () =>
      set({
        queue: [],
        currentIndex: 0,
        player: new AudioPlayer(),
        playing: false,
      }),
  }
}

export const musicStore = createMusicStore()
