<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import CameraControls from './CameraControls.svelte'
  import { cameraControls, mesh, cameraState } from './utils/cameraStore'
  import { Vector3 } from 'three'
  import { onMount } from 'svelte'
  import RobotDecimated from '../models/RobotDecimated.svelte'
  import { telemetryReadonlyStore } from '../../../stores/telemetryStore'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  const SPEED_MULTIPLIER = 4
  const axis = new Vector3(0, 1, 0)

  const follow = (delta: number) => {
    // the object's position is bound to the prop
    if (!$mesh || !$cameraControls) return

    const offsetPosition = new Vector3()
    offsetPosition.copy($mesh.position)
    const offsetVector = new Vector3(2.5, 0, -2)
    offsetVector.applyAxisAngle(axis, $mesh.rotation.y)
    offsetPosition.add(offsetVector)

    cameraState.set('mode', 'follow-direction')
    if (($cameraState.mode = 'follow-facing')) {
      $cameraControls.setLookAt(
        offsetPosition.x + 15 * Math.sin($mesh.rotation.y),
        offsetPosition.y + 8,
        offsetPosition.z + 15 * Math.cos($mesh.rotation.y),
        offsetPosition.x,
        offsetPosition.y,
        offsetPosition.z,
        true
      )
    }

    if (($cameraState.mode = 'orbit')) {
      $cameraControls.moveTo(
        offsetPosition.x,
        offsetPosition.y,
        offsetPosition.z
        // true
      )
    }
  }

  useTask(delta => {
    $mesh.position.x +=
      $telemetryReadonlyStore['chassis-y-speed'] * delta * SPEED_MULTIPLIER
    $mesh.position.z +=
      $telemetryReadonlyStore['chassis-x-speed'] * delta * SPEED_MULTIPLIER
    $mesh.rotation.y = $telemetryReadonlyStore.orientation * DEG2RAD
    follow(delta)
  })

  onMount(() => {})
</script>

<T.PerspectiveCamera
  makeDefault
  position={[12, 10, 12]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
>
  <CameraControls
    on:create={({ ref }) => {
      $cameraControls = ref
    }}
    autoRotate={$cameraState.mode === 'orbit'}
    autoRotateSpeed={3}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />
<T.AmbientLight color={'#f0f0f0'} intensity={0.1} />

<RobotDecimated
  scale={[10, 10, 10]}
  position.y={0}
  on:create={({ ref }) => {
    // @ts-expect-error
    $mesh = ref
  }}
/>

<Grid
  sectionColor={'#ff3e00'}
  sectionThickness={1}
  fadeDistance={100}
  cellSize={6}
  sectionSize={24}
  cellColor={'#cccccc'}
  infiniteGrid
/>
