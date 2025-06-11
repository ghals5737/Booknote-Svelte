import type { Note } from "../note/note.js"

export interface Book {
    id: string
    title: string
    author: string
    cover: string
    category: string
    notes: Note[]
    createdAt: Date
    currentPage: number
    totalPages: number
    publisher: string
    isbn: string
    description: string
    progress: number
  }

  export interface SearchResult {
    author: string;
    description: string;
    discount: string;
    image: string;
    isbn: string;
    link: string;    
    pubdate: string;
    publisher: string;
    title: string;
  }
    
  