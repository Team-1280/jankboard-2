<script lang="ts">
  import { onMount } from "svelte";
  import AppContainer from "../AppContainer.svelte";
  import { doomBootupSequence } from "../../Sequences/sequences";
  import { Notifications } from "../../Notifications/notifications";

  onMount(() => {
    doomBootupSequence();
  });

  const handleError = () => {
    Notifications.error(
      "Failed to load the Doom app. Did you add it to the app/static/external-apps directory?"
    );
  };
</script>

<AppContainer>
  <iframe
    title="JSDoom"
    src="/static/external-apps/jsdoom/index.html"
    class="w-full h-screen rounded-xl"
    frameborder="0"
    on:error={handleError}
  />
</AppContainer>
