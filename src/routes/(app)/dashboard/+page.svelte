<script lang="ts">
    import BookCard from "../../../lib/components/book/BookCard.svelte";
    import ReadingStats from "../../../lib/components/dashboard/ReadingStats.svelte";
    import RecommendedCategories from "../../../lib/components/dashboard/RecommendedCategories.svelte";
        
    // Mock data for demonstration
    const recentBooks = [
      {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover: "https://shopping-phinf.pstatic.net/main_4684697/46846973619.20240404092858.jpg",
        progress: 75,
        totalPages: 180,
        currentPage: 135,
      },
      {
        id: "2",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        cover: "https://shopping-phinf.pstatic.net/main_4684697/46846973619.20240404092858.jpg",
        progress: 30,
        totalPages: 281,
        currentPage: 84,
      },
      {
        id: "3",
        title: "1984",
        author: "George Orwell",
        cover: "https://shopping-phinf.pstatic.net/main_4684697/46846973619.20240404092858.jpg",
        progress: 100,
        totalPages: 328,
        currentPage: 328,
      },
      {
        id: "4",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        cover: "https://shopping-phinf.pstatic.net/main_4684697/46846973619.20240404092858.jpg",
        progress: 50,
        totalPages: 224,
        currentPage: 112,
      },
    ];
  
    const categories = [
      { id: "1", name: "Fiction", count: 12 },
      { id: "2", name: "Science", count: 8 },
      { id: "3", name: "Biography", count: 5 },
      { id: "4", name: "Self-Help", count: 7 },
    ];
  
    const readingStats = {
      booksRead: 24,
      pagesRead: 6248,
      averageRating: 4.2,
      readingTime: 156, // hours
      monthlyProgress: [
        { month: "Jan", books: 2 },
        { month: "Feb", books: 3 },
        { month: "Mar", books: 1 },
        { month: "Apr", books: 4 },
        { month: "May", books: 2 },
        { month: "Jun", books: 3 },
      ],
    };
  </script>
  
  <div class="container py-8">
    <!-- <h1 class="text-3xl font-bold mb-8 text-[#8B4513]">Dashboard</h1> -->
    
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4 text-[#255DAA]">Recently Viewed Books</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each recentBooks as book}
          <BookCard {book} />
        {/each}
      </div>
    </section>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section class="lg:col-span-2">
        <h2 class="text-2xl font-semibold mb-4 text-[#255DAA]">Reading Statistics</h2>
        <ReadingStats stats={readingStats} />
      </section>
      
      <section>
        <h2 class="text-2xl font-semibold mb-4 text-[#255DAA]">Recommended Categories</h2>
        <RecommendedCategories {categories} />
      </section>
    </div>
  </div>
  
  
  