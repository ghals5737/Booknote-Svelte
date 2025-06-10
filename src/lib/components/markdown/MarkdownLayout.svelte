<script>
  import { page } from '$app/stores';
</script>

<div class="prose prose-slate dark:prose-invert max-w-none">
  <slot />
</div>

<style>
  :global(.prose) {
    @apply text-foreground;
  }
  :global(.prose h1) {
    @apply text-foreground;
  }
  :global(.prose h2) {
    @apply text-foreground;
  }
  :global(.prose h3) {
    @apply text-foreground;
  }
  :global(.prose p) {
    @apply text-cool;
  }
  :global(.prose a) {
    @apply text-accent no-underline hover:underline;
  }
  :global(.prose code) {
    @apply bg-muted text-foreground px-1 rounded;
  }
  :global(.prose pre) {
    @apply bg-muted text-foreground p-4 rounded-lg;
  }
  :global(.prose blockquote) {
    @apply border-l-4 border-accent pl-4 italic;
  }
  :global(.prose ul) {
    @apply list-disc list-inside;
  }
  :global(.prose ol) {
    @apply list-decimal list-inside;
  }
</style> 