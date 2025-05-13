<script lang="ts">
  import Popover from "$lib/components/ui/popover/Popover.svelte"
  import PopoverTrigger from "$lib/components/ui/popover/PopoverTrigger.svelte"
  import PopoverContent from "$lib/components/ui/popover/PopoverContent.svelte"
</script>

<div class="flex h-screen items-center justify-center">
  <Popover>
    <PopoverTrigger>Open Popover</PopoverTrigger>
    <PopoverContent>
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Dimensions</h4>
          <p class="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</div>