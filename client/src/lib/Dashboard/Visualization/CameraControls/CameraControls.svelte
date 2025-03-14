<script context="module" lang="ts">
  let installed = false
</script>

<script lang="ts">
  import {
    T,
    forwardEventHandlers,
    useTask,
    useParent,
    useThrelte,
  } from '@threlte/core'
  import type {
    CameraControlsEvents,
    CameraControlsProps,
    CameraControlsSlots,
  } from './CameraControls.svelte'

  type $$Props = CameraControlsProps
  type $$Events = CameraControlsEvents
  type $$Slots = CameraControlsSlots

  import CameraControls from 'camera-controls'
  import {
    Box3,
    Matrix4,
    Quaternion,
    Raycaster,
    Sphere,
    Spherical,
    Vector2,
    Vector3,
    Vector4,
    type PerspectiveCamera,
  } from 'three'
  // @ts-expect-error
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { cameraState } from './utils/cameraStore'

  const subsetOfTHREE = {
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
  }

  if (!installed) {
    CameraControls.install({ THREE: subsetOfTHREE })
    installed = true
  }

  const parent = useParent()

  if (!$parent) {
    throw new Error('CameraControls must be a child of a ThreeJS camera')
  }

  const { renderer, invalidate } = useThrelte()

  let autoRotate = true
  export let autoRotateSpeed = 1

  export const ref = new CameraControls(
    $parent as PerspectiveCamera,
    renderer?.domElement
  )

  const getControls = () => ref

  useTask(
    delta => {
      if (autoRotate && $cameraState.mode === 'orbit') {
        getControls().azimuthAngle += 4 * delta * DEG2RAD * autoRotateSpeed
      }
      const updated = getControls().update(delta)
      if (updated) invalidate()
    },
    {
      autoInvalidate: false,
    }
  )

  const forwardingComponent = forwardEventHandlers()
</script>

<T
  is={ref}
  on:controlstart={e => {
    autoRotate = false
  }}
  on:controlend={() => {
    autoRotate = true
  }}
  {...$$restProps}
  bind:this={$forwardingComponent}
>
  <slot {ref} />
</T>
