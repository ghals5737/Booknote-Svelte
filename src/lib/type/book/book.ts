import type { Note } from "../note/note.js"

export interface Book {
    id: string
    title: string
    author: string
    cover: string
    category: string
    notes: Note[]
    createdAt: Date
    progress: number
  }