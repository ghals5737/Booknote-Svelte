<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

    export let content = '';    
    export let html = '';
    let element: HTMLElement;
    let editor: Editor;

    onMount(() => {
        editor = new Editor({
            element,
            extensions: [
                StarterKit,                
            ],
            content,
            onUpdate: ({ editor }) => {
                html = editor.getHTML();                
                content = editor.getText();
            },
            editorProps: {
                attributes: {
                    class: 'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
                },
            },
        });
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });
</script>

<div class="border border-secondary rounded-lg bg-muted">    
    <div bind:this={element} />
</div>

<style>
    :global(.ProseMirror) {
        @apply text-foreground;
    }
    :global(.ProseMirror p) {
        @apply text-cool;        
    }
    :global(.ProseMirror h1) {
        @apply text-2xl font-bold text-foreground;
    }
    :global(.ProseMirror h2) {
        @apply text-xl font-bold text-foreground;
    }
    :global(.ProseMirror ul) {
        @apply list-disc list-inside;
    }
    :global(.ProseMirror ol) {
        @apply list-decimal list-inside;
    }
    :global(.ProseMirror code) {
        @apply bg-secondary text-foreground px-1 rounded;
    }
    :global(.ProseMirror pre) {
        @apply bg-secondary text-foreground p-4 rounded-lg;
    }
    :global(.ProseMirror blockquote) {
        @apply border-l-4 border-accent pl-4 italic;
    }
    
</style> 