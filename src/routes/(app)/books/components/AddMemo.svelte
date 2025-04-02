<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import Highlight from '@tiptap/extension-highlight';
    import Typography from '@tiptap/extension-typography';
    import Table from '@tiptap/extension-table';
    import TableRow from '@tiptap/extension-table-row';
    import TableCell from '@tiptap/extension-table-cell';
    import TableHeader from '@tiptap/extension-table-header';
    import Image from '@tiptap/extension-image';
    import TaskList from '@tiptap/extension-task-list';
    import TaskItem from '@tiptap/extension-task-item';
    import { Pin, Bold, Italic, List, Code, Heading1, Table as TableIcon, Image as ImageIcon, CheckSquare, Quote } from 'lucide-svelte';

    export let showAddNote: boolean = false;
    export let categories: any[] = [];
    let noteTitle = '';
    let element: HTMLElement;
    let editor: Editor;

    const addImage = () => {
        const url = window.prompt('이미지 URL을 입력하세요:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const addTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                StarterKit,
                Highlight,
                Typography,
                Table.configure({
                    resizable: true,
                }),
                TableRow,
                TableHeader,
                TableCell,
                Image,
                TaskList,
                TaskItem.configure({
                    nested: true,
                }),
            ],
            editorProps: {
                attributes: {
                    class: 'prose prose-sm max-w-none focus:outline-none',
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

{#if showAddNote}
<div class="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-[#212121]">새 메모 작성</h2>
        <div class="flex items-center gap-2">
            <button class="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Pin class="h-4 w-4" />
            </button>
            <select class="text-sm border border-gray-200 rounded-md px-2 py-1">
                <option value="">카테고리 선택</option>
                {#each categories as category}
                    <option value={category.id}>{category.name}</option>
                {/each}
            </select>
        </div>
    </div>

    <div class="space-y-4">
        <input
            type="text"
            placeholder="제목을 입력하세요 (선택사항)"
            class="w-full px-3 py-2 border border-gray-200 rounded-md"
            bind:value={noteTitle}
        />
        
        <!-- 에디터 툴바 -->
        <div class="border border-gray-200 rounded-t-md p-2 bg-gray-50 flex flex-wrap gap-2">
            <div class="flex items-center gap-1 border-r pr-2">
                <button 
                    class="p-1.5 hover:bg-gray-200 rounded"
                    on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <Heading1 class="w-4 h-4" />
                </button>
                <button 
                    class="p-1.5 hover:bg-gray-200 rounded"
                    on:click={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold class="w-4 h-4" />
                </button>
                <button 
                    class="p-1.5 hover:bg-gray-200 rounded"
                    on:click={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic class="w-4 h-4" />
                </button>
            </div>

            <div class="flex items-center gap-1 border-r pr-2">
                <button 
                    class="p-1.5 hover:bg-gray-200 rounded"
                    on:click={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List class="w-4 h-4" />
                </button>
                <button 
                    class="p-1.5 hover:bg-gray-200 rounded"
                    on:click={() => editor.chain().focus().toggleTaskList().run()}
                >
                    <CheckSquare class="w-4 h-4" />
                </button>
                <button 
                    class="p-1.5 hover:bg-gray-200 rounded"
                    on:click={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <Quote class="w-4 h-4" />
                </button>
            </div>

            <div class="flex items-center gap-1 border-r pr-2">
                <button 
                    class="p-1.5 hover:bg-gray-200 rounded"
                    on:click={addTable}
                >
                    <TableIcon class="w-4 h-4" />
                </button>
                <button 
                    class="p-1.5 hover:bg-gray-200 rounded"
                    on:click={addImage}
                >
                    <ImageIcon class="w-4 h-4" />
                </button>
                <button 
                    class="p-1.5 hover:bg-gray-200 rounded"
                    on:click={() => editor.chain().focus().toggleCode().run()}
                >
                    <Code class="w-4 h-4" />
                </button>
            </div>
        </div>

        <!-- 에디터 본문 -->
        <div 
            bind:this={element}
            class="min-h-[300px] border border-t-0 border-gray-200 rounded-b-md p-4"
        />

        <div class="flex justify-end gap-2">
            <button 
                on:click={() => showAddNote = false}
                class="py-2 px-4 bg-white text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50"
            >
                취소
            </button>
            <button class="py-2 px-4 bg-[#E25822] text-white rounded-md hover:bg-[#B34319]">
                저장
            </button>
        </div>
    </div>
</div>
{/if}

<style>
/* 에디터 스타일링 */
:global(.ProseMirror) {
    min-height: 300px;
    outline: none;
}

:global(.ProseMirror p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
}

/* 테이블 스타일링 */
:global(.ProseMirror table) {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
}

:global(.ProseMirror table td),
:global(.ProseMirror table th) {
    border: 2px solid #ced4da;
    box-sizing: border-box;
    min-width: 1em;
    padding: 3px 5px;
    position: relative;
    vertical-align: top;
}

:global(.ProseMirror table th) {
    background-color: #f8f9fa;
    font-weight: bold;
    text-align: left;
}

/* 체크리스트 스타일링 */
:global(.ProseMirror ul[data-type="taskList"]) {
    list-style: none;
    padding: 0;
}

:global(.ProseMirror ul[data-type="taskList"] li) {
    display: flex;
    align-items: center;
}

:global(.ProseMirror ul[data-type="taskList"] li > label) {
    margin-right: 0.5rem;
}

/* 코드 블록 스타일링 */
:global(.ProseMirror pre) {
    background: #0d0d0d;
    color: #fff;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
}

:global(.ProseMirror code) {
    background: none;
    color: inherit;
    font-size: 0.8rem;
    padding: 0;
}

/* 마크다운 스타일링 */
:global(.ProseMirror h1) {
    font-size: 1.875rem;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
}

:global(.ProseMirror h2) {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
}

:global(.ProseMirror h3) {
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}

:global(.ProseMirror blockquote) {
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: #4a5568;
}

:global(.ProseMirror mark) {
    background-color: #fef3c7;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
}

:global(.ProseMirror s) {
    text-decoration: line-through;
}

:global(.ProseMirror strong) {
    font-weight: bold;
}

:global(.ProseMirror em) {
    font-style: italic;
}

:global(.ProseMirror ul:not([data-type="taskList"])) {
    list-style-type: disc;
    padding-left: 1.5rem;
}

:global(.ProseMirror ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
}
</style>