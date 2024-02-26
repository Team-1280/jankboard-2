import type CameraControls from 'camera-controls'
import { writable } from 'svelte/store'
import Hornet from '../../models/Hornet.svelte'
import type { Mesh, Object3DEventMap } from 'three'
import type { Group } from 'three/examples/jsm/libs/tween.module.js'

export const cameraControls = writable<CameraControls>()
export const mesh = writable<Mesh>()
