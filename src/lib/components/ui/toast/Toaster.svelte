<script lang="ts">
  import { toasts } from './use-toast.js';
  import Toast from './Toast.svelte';
  import ToastTitle from './ToastTitle.svelte';
  import ToastDescription from './ToastDescription.svelte';
</script>

<div class="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4">
  {#each $toasts as toast}
    <Toast variant={toast.variant}>
      <ToastTitle>{toast.title}</ToastTitle>
      {#if toast.description}
        <ToastDescription>{toast.description}</ToastDescription>
      {/if}
    </Toast>
  {/each}
</div> 