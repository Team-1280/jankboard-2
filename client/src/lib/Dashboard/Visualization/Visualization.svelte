<script lang="ts">
  import { Canvas } from '@threlte/core'
  // @ts-expect-error
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { Pane, Button, Separator } from 'svelte-tweakpane-ui'
  import { cameraControls, mesh } from './CameraControls/utils/cameraStore'
  import Scene from './CameraControls/Scene.svelte'
  import { onMount } from 'svelte'
  import {
    Vector3,
    type OrthographicCamera,
    type PerspectiveCamera,
  } from 'three'

  let camera: PerspectiveCamera | OrthographicCamera

  $: if ($cameraControls) {
    // @ts-expect-error
    camera = $cameraControls._camera
  }

  onMount(() => {
    // setTimeout(() => {
    //   // $cameraControls.moveTo(3, 5, 2, true)
    //   // $cameraControls.setOrbitPoint(20, 20, 20)
    //   $cameraControls.setLookAt(
    //     3,
    //     5,
    //     2,
    //     $mesh.position.x,
    //     $mesh.position.y,
    //     $mesh.position.z,
    //     true
    //   )
    // }, 8000)
  })
</script>

<Canvas>
  <Scene />
</Canvas>
