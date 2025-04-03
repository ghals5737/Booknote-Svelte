<script lang="ts">
  import { getContext } from 'svelte';
  const { selectValue } = getContext('select');
  import { cn } from "$lib/utils/utils.js";

  let className = "";
  export { className as class };
</script>

<span class={cn("block truncate", className)}>
  {#if $selectValue}
    <slot>{$selectValue}</slot>
  {:else}
    <slot />
  {/if}
</span> 