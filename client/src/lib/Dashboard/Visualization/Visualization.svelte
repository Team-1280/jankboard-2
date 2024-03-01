<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { cameraControls } from './CameraControls/utils/cameraStore'
  import Scene from './Scene.svelte'
  import { onMount } from 'svelte'
  import { type OrthographicCamera, type PerspectiveCamera } from 'three'

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
