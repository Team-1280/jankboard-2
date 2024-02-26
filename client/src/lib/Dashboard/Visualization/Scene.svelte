<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls } from '@threlte/extras'
  import Hornet from './models/Hornet.svelte'
  import { onMount } from 'svelte'
  import Controls from './Controls.svelte'
  import type { Camera, Group, Object3D, Object3DEventMap } from 'three'
  import {
    telemetryReadonlyStore,
    telemetryStore,
  } from '../../stores/telemetryStore'
  import { get } from 'svelte/store'

  // const rotate90 = () => {
  //   const originalRot = rot
  // }

  // onMount(() => {
  //   setTimeout(rotate90, 5000)
  // })

  // CONSTANTS
  const maxAngularVelocity = 2 // Max angular velocity, in radians per second
  const stoppingThreshold = 0.005 // Threshold in radians for when to consider the rotation close enough to stop

  // Proportional control factor
  const kP = 2 // Adjust this value based on responsiveness and stability needs

  // simulate some turning for testing
  const simulateTurning = () => {
    let delay = Math.random() * 4500 + 500
    let randOffset = Math.random() * 170 * (Math.random() < 0.5 ? -1 : 1)
    telemetryStore.update({
      ...get(telemetryReadonlyStore),
      orientation: get(telemetryReadonlyStore)['orientation'] + randOffset,
    })
    setTimeout(simulateTurning, delay)
  }
  simulateTurning()

  // Sync robot orientation with target rotation
  let targetRot = 0
  telemetryReadonlyStore.subscribe(value => {
    targetRot = (value['orientation'] * Math.PI) / 180 // convert deg to rad
  })

  // Updates rotation to match target with PID controller (intended to be invoked in useTask)
  let rot = 0 // (initial) rotation in radians
  let angularVelocity = 0
  const updateRotation = (delta: number) => {
    let angleDifference = targetRot - rot

    // Normalize angle difference to the range [-π, π]
    angleDifference = ((angleDifference + Math.PI) % (2 * Math.PI)) - Math.PI

    // Calculate the desired angular velocity based on the angle difference
    let desiredVelocity =
      Math.sign(angleDifference) *
      Math.min(maxAngularVelocity, Math.abs(kP * angleDifference))

    // If the object is very close to the target, adjust the desired velocity to zero to prevent overshooting
    if (Math.abs(angleDifference) < stoppingThreshold) {
      desiredVelocity = 0
    }

    // Adjust angular velocity towards desired velocity
    angularVelocity = desiredVelocity

    // Update rotation
    rot += angularVelocity * delta

    // Normalize rot to the range [0, 2π]
    if (rot < 0) rot += 2 * Math.PI
    else if (rot > 2 * Math.PI) rot -= 2 * Math.PI

    // Snap to the target rotation to prevent tiny oscillations if close enough
    if (Math.abs(angleDifference) < stoppingThreshold) {
      rot = targetRot
      angularVelocity = 0
    }
  }

  // Assuming useTask is called every frame with the time delta
  useTask(delta => {
    updateRotation(delta)
  })

  let capsule: Group<Object3DEventMap>
  let capRef: Camera
  $: if (capsule) {
    // typescript hacks because i dont know what im doing
    capRef = capsule as unknown as Camera
  }
</script>

<!-- <T.PerspectiveCamera makeDefault position={[-10, 10, 10]} fov={15}>
  <OrbitControls
    autoRotate
    enableZoom={true}
    enableDamping
    autoRotateSpeed={0.5}
    target.y={1.5}
  />
</T.PerspectiveCamera> -->

<T.PerspectiveCamera makeDefault position={[0, 8, -20]} fov={75} on:create>
  <OrbitControls
    enableZoom={true}
    enableDamping
    autoRotateSpeed={5}
    target.y={1.5}
    autoRotate
  />
  <Controls bind:object={capRef} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.2} />

<Grid
  position.y={1}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={50}
  cellSize={2}
/>

<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

<Float floatIntensity={1} floatingRange={[0, 0.5]}>
  <!-- <T.Mesh > -->
  <Hornet
    position={[0, 1.7, 0]}
    scale={[0.8, 0.8, 0.8]}
    bind:ref={capsule}
    rotation.y={rot}
  />
  <!-- <T.MeshStandardMaterial color="#F8EBCE" /> -->
  <!-- </T.Mesh> -->
</Float>
