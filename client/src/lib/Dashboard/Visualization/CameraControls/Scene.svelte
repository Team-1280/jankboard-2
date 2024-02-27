<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import CameraControls from './CameraControls.svelte'
  import { cameraControls, mesh } from './utils/cameraStore'
  import Hornet from '../models/Hornet.svelte'
  import { Vector3 } from 'three'
  import { onMount } from 'svelte'
  import RobotDecimated from '../models/RobotDecimated.svelte'

  function vectorFromObject() {
    let ideal: Vector3 = new Vector3()
    $cameraControls.getPosition(ideal, true)

    ideal.applyQuaternion($mesh.quaternion)
    ideal.add(new Vector3($mesh.position.x, $mesh.position.y, $mesh.position.z))
    return ideal
  }

  const follow = (delta: number) => {
    // the object's position is bound to the prop
    if (!$mesh || !$cameraControls) return

    // typescript HACKS! never do this! How does this work? who knows!
    const robotPosition = vectorFromObject()

    const horizontalOffsetDistance = 12 // Distance behind the leading vector
    const direction = new Vector3(0, 0, 1) // Default forward direction in Three.js is negative z-axis, so behind is positive z-axis
    const verticalOffset = new Vector3(0, -2.8, 0)

    // Calculate the offset vector
    const offsetVector = direction
      .normalize()
      .multiplyScalar(horizontalOffsetDistance)
      .add(verticalOffset)

    // If the leading object is rotating, apply its rotation to the offset vector
    const rotatedOffsetVector = offsetVector.applyQuaternion($mesh.quaternion)

    // Calculate the trailing vector's position
    const trailingVector = robotPosition.clone().sub(rotatedOffsetVector)

    $cameraControls.setLookAt(
      trailingVector.x,
      trailingVector.y,
      trailingVector.z,
      $mesh.position.x,
      $mesh.position.y,
      $mesh.position.z,
      true
    )
  }

  useTask(delta => {
    // follow(delta)
    // $cameraControls.moveTo(
    //   $mesh.position.x,
    //   $mesh.position.y,
    //   $mesh.position.z,
    //   true
    // )
  })

  onMount(() => {
    setTimeout(() => {
      // $cameraControls.setLookAt(
      //   $mesh.position.x,
      //   $mesh.position.y,
      //   $mesh.position.z,
      //   $mesh.position.x,
      //   $mesh.position.y,
      //   $mesh.position.z,
      //   true
      // )
      $cameraControls.setLookAt(
        30,
        20,
        -40,
        $mesh.position.x,
        $mesh.position.y,
        $mesh.position.z,
        true
      )
    }, 8000)
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
>
  <CameraControls
    on:create={({ ref }) => {
      $cameraControls = ref
    }}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />

<RobotDecimated
  scale={[10, 10, 10]}
  position.y={0}
  on:create={({ ref }) => {
    $mesh = ref
  }}
/>

<Grid
  sectionColor={'#ff3e00'}
  sectionThickness={1}
  fadeDistance={125}
  cellSize={6}
  cellColor={'#cccccc'}
  infiniteGrid
/>
