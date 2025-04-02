<script lang="ts">
    import { Pin,Edit,Trash2 } from '@lucide/svelte';

    export let notes: any[] = [];
    export let selectedNote: any = null;
    export let isEditMode: boolean = false;
    export let note:any = null;

    function toggleNoteBookmark(id: number): any {
        const note = notes.find(note => note.id === id);
        if (note) {
            note.isBookmarked = !note.isBookmarked;
        }
    }

    function selectNote(note: any) {
        if (selectedNote?.id === note.id) {
        selectedNote = null;
        } else {
        selectedNote = note;
        isEditMode = false;
        }
    }

    function deleteNote(id: number): any {
        const note = notes.find(note => note.id === id);
        if (note) {
        notes = notes.filter(note => note.id !== id);
        }
    }

    function saveNote(note: any): any {
        if (note.id) {
        const index = notes.findIndex(n => n.id === note.id);
        if (index !== -1) {
            notes[index] = note;
        }
        } else {
        notes = [...notes, note];
        }
    }

    function getCategoryColor(category:any) {
        switch(category) {
        case "자기계발":
            return "bg-[#FFF4E4] text-[#E25822] border-[#F8D3BD]";
        case "기술":
            return "bg-[#E6F7FF] text-[#0070F3] border-[#B3E0FF]";
        case "심리학":
            return "bg-[#F0F0FF] text-[#5151D3] border-[#D1D1F0]";
        case "에세이":
            return "bg-[#F3F0FF] text-[#7928CA] border-[#E4D7F5]";
        default:
            return "bg-[#F5F5F5] text-[#575757] border-[#BDBDBD]";
        }
    }
</script>
<div class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all">
    <!-- 메모 헤더 -->
    <div 
      class="p-4 cursor-pointer"
      on:click={() => selectNote(note)}
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <h3 class="font-medium text-[#212121]">{note.title}</h3>
            <button 
              class="p-1 hover:bg-gray-100 rounded-full"
              on:click|stopPropagation={() => toggleNoteBookmark(note.id)}
            >
              <Pin class={`h-4 w-4 ${note.isBookmarked ? 'text-yellow-400' : 'text-gray-400'}`}  />
            </button>
          </div>
          <div class="mt-2 flex items-center gap-3">
            <span class="text-xs text-gray-500">{note.date}</span>
            {#if note.category}
              <span class="px-2 py-1 text-xs rounded-full" 
                style="background-color: {getCategoryColor(note.category)}">
                {note.category}
              </span>
            {/if}
          </div>
        </div>
        <div class="flex gap-1">
          <button 
            class="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            on:click|stopPropagation={() => {
              selectNote(note);
              isEditMode = !isEditMode;
            }}
          >
            <Edit class="h-4 w-4" />
          </button>
          <button 
            class="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            on:click|stopPropagation={() => deleteNote(note.id)}
          >
            <Trash2 class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- 메모 내용 (확장 시) -->
    {#if selectedNote?.id === note.id}
      <div class="px-4 pb-4 border-t border-gray-100">
        {#if isEditMode}
          <div class="space-y-3 pt-3">
            <input
              type="text"
              bind:value={note.title}
              class="w-full px-3 py-2 border border-gray-200 rounded-md"
              placeholder="제목"
            />
            <textarea
              bind:value={note.content}
              class="w-full px-3 py-2 border border-gray-200 rounded-md min-h-[200px]"
              placeholder="내용을 입력하세요"
            ></textarea>
            <div class="flex justify-end gap-2">
              <button 
                class="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded"
                on:click={() => isEditMode = false}
              >
                취소
              </button>
              <button 
                class="px-3 py-1.5 text-sm bg-[#E25822] text-white rounded hover:bg-[#B34319]"
                on:click={() => saveNote(note)}
              >
                저장
              </button>
            </div>
          </div>
        {:else}
          <div class="prose prose-sm max-w-none pt-3">
            {note.content}
          </div>
        {/if}
      </div>
    {/if}
  </div>