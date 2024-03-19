<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import CameraControls from './CameraControls/CameraControls.svelte'
  import {
    cameraControls,
    mesh,
    cameraState,
  } from './CameraControls/utils/cameraStore'
  import { Vector3 } from 'three'
  import RobotDecimated from './models/RobotDecimated.svelte'
  import { telemetryReadonlyStore } from '../../stores/telemetryStore'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

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

    const followDirection = () => {
      const angle = Math.atan2(
        $telemetryReadonlyStore['chassis-y-speed'],
        $telemetryReadonlyStore['chassis-x-speed']
      )

      $cameraControls.setLookAt(
        offsetPosition.x - 13 * Math.sin(angle),
        offsetPosition.y + 4,
        offsetPosition.z - 13 * Math.cos(angle),
        offsetPosition.x,
        offsetPosition.y,
        offsetPosition.z,
        true
      )
      $cameraControls.zoomTo(1.1, true)
    }

    const followFacing = () => {
      if ($cameraState.mode === 'follow-facing') {
        $cameraControls.setLookAt(
          offsetPosition.x + 13 * Math.sin($mesh.rotation.y),
          offsetPosition.y + 5,
          offsetPosition.z + 13 * Math.cos($mesh.rotation.y),
          offsetPosition.x,
          offsetPosition.y + 2,
          offsetPosition.z,
          true
        )
      }
      $cameraControls.zoomTo(1.2, true)
    }

    const orbit = () => {
      $cameraControls.zoomTo(0.8, true)
      $cameraControls.moveTo(
        offsetPosition.x + 4 * Math.sin($mesh.rotation.y),
        offsetPosition.y + 3,
        offsetPosition.z * Math.cos($mesh.rotation.y),
        true
      )
    }

    switch ($cameraState.mode) {
      case 'follow-direction':
        followDirection()
        break
      case 'follow-facing':
        followFacing()
        break
      case 'orbit':
        orbit()
        break
      default:
        orbit()
        break
    }
  }

  let gridFadeDistance = 30

  const fadeGridIn = (delta: number) => {
    if (gridFadeDistance < 100) {
      gridFadeDistance += delta * 40
    }
  }

  const fadeGridOut = (delta: number) => {
    if (gridFadeDistance > 30) {
      gridFadeDistance -= delta * 40
    }
  }

  useTask((delta) => {
    /* TODO: standardize a scale (meters : grid lengths) so we can have
    accurate positioning of sensor detected objects */
    // update position data for robot model
    $mesh.position.x +=
      $telemetryReadonlyStore['chassis-y-speed'] * delta * SPEED_MULTIPLIER
    $mesh.position.z +=
      $telemetryReadonlyStore['chassis-x-speed'] * delta * SPEED_MULTIPLIER
    $mesh.rotation.y = $telemetryReadonlyStore.orientation * DEG2RAD

    if ($cameraState.mode === 'orbit') {
      fadeGridOut(delta)
    } else {
      fadeGridIn(delta)
    }

    // run the follow function
    follow(delta)
  })
</script>

<T.PerspectiveCamera makeDefault position={[8, 4, 8]}>
  <CameraControls
    on:create={({ ref }) => {
      cameraControls.set(ref)
    }}
    autoRotateSpeed={3}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />
<T.AmbientLight color={'#f0f0f0'} intensity={0.1} />

<RobotDecimated
  scale={[10, 10, 10]}
  position.y={0}
  position.x={-3}
  position.z={3}
  on:create={({ ref }) => {
    // @ts-expect-error
    mesh.set(ref)
    dispatch('loaded')
  }}
/>

<Grid
  sectionColor={'#ff3e00'}
  sectionThickness={1}
  bind:fadeDistance={gridFadeDistance}
  cellSize={3}
  sectionSize={24}
  cellColor={'#cccccc'}
  infiniteGrid
/>
