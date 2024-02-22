import { writable } from 'svelte/store'

interface MusicQueue {
  queue: string[]
  currentIndex: number
  playing: boolean
}

function createMusicStore() {
  const { subscribe, set, update } = writable<MusicQueue>({
    queue: [],
    currentIndex: 0,
    playing: false,
  })

  return {
    subscribe,
    push: (songSlug: string) =>
      update(store => {
        store.queue.push(songSlug)
        return store
      }),
    skip: () =>
      update(store => {
        let next = store.queue[store.currentIndex + 1]

        if (next !== undefined) {
          store.currentIndex++
        }
        return store
      }),
    setCurrent: (songSlug: string) =>
      update(store => {
        store.currentIndex = store.queue.length
        store.queue.push(songSlug)
        return store
      }),
    queueNext: (songSlug: string) =>
      update(store => {
        store.queue.splice(store.currentIndex + 1, 0, songSlug)
        return store
      }),
    pause: update(store => {
      store.playing = false
      return store
    }),
    play: update(store => {
      store.playing = true
      return store
    }),
    toggle: () =>
      update(store => {
        store.playing = !store.playing
        return store
      }),
    reset: () => set({ queue: [], currentIndex: 0, playing: false }),
  }
}

export const musicStore = createMusicStore()
