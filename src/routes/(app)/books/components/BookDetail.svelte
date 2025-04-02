<script lang="ts">
    import { Pin,ChevronUp,ChevronDown } from '@lucide/svelte';

    export let selectedBook: any = null;
    export let showAddNote: boolean = false;

    function getStatusColor(status:any) {
        switch(status) {
        case "독서중":
            return "bg-[#F8D3BD] text-[#E25822] border-[#E25822]";
        case "완독":
            return "bg-[#D0E3FF] text-[#2D4B73] border-[#2D4B73]";
        case "읽고싶은":
            return "bg-[#F5F5F5] text-[#575757] border-[#BDBDBD]";
        default:
            return "bg-[#F5F5F5] text-[#575757] border-[#BDBDBD]";
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
<div class="flex flex-col md:flex-row md:items-start gap-6 mb-8 bg-white p-6 rounded-lg shadow-sm">
    <div class="flex-shrink-0">
      <img
        src={selectedBook.coverUrl || "/placeholder.svg"}
        alt={selectedBook.title}
        width={120}
        height={160}
        class="rounded-lg shadow-md object-cover h-40 w-30"
      />
    </div>
    <div class="flex-1">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 class="text-2xl md:text-3xl font-bold text-[#212121]">{selectedBook.title}</h1>
        <button class="p-2 bg-white text-[#E25822] border border-gray-200 rounded-md hover:bg-[#FFF4E4]">
          <Pin class="h-4 w-4" />
        </button>
      </div>
      <p class="text-sm text-gray-500 mt-2">{selectedBook.date}</p>
      
      <div class="mt-6 flex flex-wrap gap-2">
        <span class={`px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedBook.status)}`}>
          {selectedBook.status}
        </span>
        <span class={`px-3 py-1 text-sm rounded-full border ${getCategoryColor(selectedBook.category)}`}>
          {selectedBook.category}
        </span>
      </div>
      
      <div class="mt-6">
        <button 
          on:click={() => showAddNote = !showAddNote}
          class="py-2 px-4 bg-white text-[#E25822] border border-[#E25822] rounded-md hover:bg-[#FFF4E4] flex items-center"
        >
          {#if showAddNote}
            <ChevronUp class="h-4 w-4 mr-2" />
            <span>메모 닫기</span>
          {:else}
            <ChevronDown class="h-4 w-4 mr-2" />
            <span>메모 추가</span>
          {/if}
        </button>
      </div>
    </div>
  </div>