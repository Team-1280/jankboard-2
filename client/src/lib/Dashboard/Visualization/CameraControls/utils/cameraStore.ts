import type CameraControls from 'camera-controls'
import { writable } from 'svelte/store'
import type { Mesh } from 'three'

export const cameraControls = writable<CameraControls>()
export const mesh = writable<Mesh>()

type CameraMode =
  | 'orbit'
  | 'follow-facing'
  | 'follow-direction'
  | 'follow-position'
  | 'showcase'

interface CameraState {
  mode: CameraMode
  userControlled: boolean
}

const { set, update, subscribe } = writable<CameraState>({
  mode: 'orbit',
  userControlled: false,
})

const createCameraState = () => {
  return {
    update,
    subscribe,
    set: (prop: keyof CameraState, val: any) =>
      update(state => ({ ...state, [prop]: val })),
    reset: () => set({ mode: 'orbit', userControlled: false }),
  }
}

export const cameraState = createCameraState()
