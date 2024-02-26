<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import {
    Camera,
    Vector2,
    Vector3,
    Quaternion,
    Object3D,
    type Object3DEventMap,
    Group,
  } from 'three'
  import { useThrelte, useParent, useTask } from '@threlte/core'

  export let object: Group<Object3DEventMap>
  export let rotateSpeed = 1.0
  export let shouldOrbit: boolean

  $: if (object) {
    // console.log(object)
    // object.position.y = 10
    // // Calculate the direction vector towards (0, 0, 0)
    // const target = new Vector3(0, 0, 0)
    // const direction = target.clone().sub(object.position).normalize()
    // // Extract the forward direction from the object's current rotation matrix
    // const currentDirection = new Vector3(0, 1, 0)
    // currentDirection.applyQuaternion(object.quaternion)
    // // Calculate the axis and angle to rotate the object
    // const rotationAxis = currentDirection.clone().cross(direction).normalize()
    // const rotationAngle = Math.acos(currentDirection.dot(direction))
    // // Rotate the object using rotateOnAxis()
    // object.rotateOnAxis(rotationAxis, rotationAngle)
  }

  export let idealOffset = { x: -0.5, y: 2, z: -3 }
  export let idealLookAt = { x: 0, y: 1, z: 5 }

  const currentPosition = new Vector3()
  const currentLookAt = new Vector3()

  let isOrbiting = false
  let pointerDown = false

  const rotateStart = new Vector2()
  const rotateEnd = new Vector2()
  const rotateDelta = new Vector2()

  const axis = new Vector3(0, 1, 0)
  const rotationQuat = new Quaternion()

  const { renderer, invalidate } = useThrelte()

  const domElement = renderer.domElement
  const camera = useParent()

  const dispatch = createEventDispatcher()

  const isCamera = (p: any): p is Camera => {
    return p.isCamera
  }

  if (!isCamera($camera)) {
    throw new Error(
      'Parent missing: <PointerLockControls> need to be a child of a <Camera>'
    )
  }

  // This is basically your update function
  useTask(delta => {
    // the object's position is bound to the prop
    if (!object) return

    // then we calculate our ideal's
    const offset = vectorFromObject(idealOffset)
    const lookAt = vectorFromObject(idealLookAt)

    // camera is based on character so we rotation character first
    // rotationQuat.setFromAxisAngle(axis, rotateSpeed * delta)
    // object.quaternion.multiply(rotationQuat)

    // and how far we should move towards them
    const t = 1.0 - Math.pow(0.001, delta)
    currentPosition.lerp(offset, t)
    currentLookAt.lerp(lookAt, t)

    // typescript HACKS! never do this! How does this work? who knows!
    const robotPosition = vectorFromObject(
      object as unknown as { x: number; y: number; z: number }
    )

    const horizontalOffsetDistance = 12 // Distance behind the leading vector
    const direction = new Vector3(0, 0, 1) // Default forward direction in Three.js is negative z-axis, so behind is positive z-axis
    const verticalOffset = new Vector3(0, -2.8, 0)

    // Calculate the offset vector
    const offsetVector = direction
      .normalize()
      .multiplyScalar(horizontalOffsetDistance)
      .add(verticalOffset)

    // If the leading object is rotating, apply its rotation to the offset vector
    const rotatedOffsetVector = offsetVector.applyQuaternion(object.quaternion)

    // Calculate the trailing vector's position
    const trailingVector = robotPosition.clone().sub(rotatedOffsetVector)

    if (!shouldOrbit) {
      // then finally set the camera, a bit behind the model
      $camera!.position.copy(trailingVector)
      // Rotate the offset around the Y-axis
      $camera!.lookAt(currentLookAt)
    }
  })

  function vectorFromObject(vec: { x: number; y: number; z: number }) {
    const { x, y, z } = vec
    const ideal = new Vector3(x, y, z)
    ideal.applyQuaternion(object.quaternion)
    ideal.add(
      new Vector3(object.position.x, object.position.y, object.position.z)
    )
    return ideal
  }
</script>
