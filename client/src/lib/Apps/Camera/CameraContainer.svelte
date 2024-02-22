<script lang="ts">
  export let cameraUrl: string
</script>

<div>
  <img
    src={cameraUrl}
    width="400px"
    height="400px"
    alt="camera feed"
    class="rounded-xl shadow-md"
  />
</div>
