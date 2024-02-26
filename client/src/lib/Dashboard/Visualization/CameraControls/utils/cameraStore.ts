import type CameraControls from 'camera-controls'
import { writable } from 'svelte/store'
import Hornet from '../../models/Hornet.svelte'

export const cameraControls = writable<CameraControls>()
export const mesh = writable()
