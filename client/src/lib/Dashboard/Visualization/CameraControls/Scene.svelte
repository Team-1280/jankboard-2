<script>
  import { T, useTask } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import CameraControls from './CameraControls.svelte'
  import { cameraControls, mesh } from './utils/cameraStore'
  import Hornet from '../models/Hornet.svelte'
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
    autoRotate
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />

<Hornet
  position.y={1}
  on:create={({ ref }) => {
    $mesh = ref
  }}
/>

<Grid
  sectionColor={'#ff3e00'}
  sectionThickness={1}
  cellColor={'#cccccc'}
  gridSize={40}
  infiniteGrid
/>
