<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let value = "";
  const activeTab = writable(value);
  
  setContext("tabs", {
    activeTab,
    registerTab: (tabValue: string) => {
      return {
        isActive: activeTab.subscribe(v => v === tabValue)
      };
    }
  });

  $: $activeTab = value;
</script>

<div class="w-full" {...$$restProps}>
  <slot />
</div> 