<script lang="ts">
  import { Tooltip } from '@svelte-plugins/tooltips'

  export let checked: boolean
  export let tooltip: string
  export let disabled: boolean = false
</script>

<div
  class="flex gap-2"
  class:brightness-75={disabled}
  class:cursor-not-allowed={disabled}
>
  <label class="switch">
    <input type="checkbox" bind:checked on:click {disabled} />
    <span class="slider" />
  </label>
  {#if tooltip !== '' && !disabled}
    <Tooltip content={tooltip} arrow={false}>
      <span class="flex-grow text-xl text-slate-100 font-medium"
        ><slot />
      </span>
    </Tooltip>
  {:else}
    <span class="flex-grow text-xl text-slate-100 font-medium"><slot /> </span>
  {/if}
</div>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:checked + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
</style>
