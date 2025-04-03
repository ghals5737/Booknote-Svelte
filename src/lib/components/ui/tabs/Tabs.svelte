<script lang="ts">
  import { setContext } from "svelte";
  import { writable, derived, type Writable, type Readable } from "svelte/store";

  export let value = "";
  const activeTab = writable(value);
  
  interface TabsContext {
    activeTab: Writable<string>;
    registerTab: (tabValue: string) => {
      isActive: Readable<boolean>;
    };
  }
  
  setContext<TabsContext>("tabs", {
    activeTab,
    registerTab: (tabValue: string) => {
      return {
        isActive: derived(activeTab, $activeTab => $activeTab === tabValue)
      };
    }
  });

  $: $activeTab = value;
</script>

<div class="w-full" {...$$restProps}>
  <slot />
</div> 