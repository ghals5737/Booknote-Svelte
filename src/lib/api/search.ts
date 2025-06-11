import type { SearchResult } from "$lib/type/book/book.js"

const PUBLIC_API_BASE_URL = "http://localhost:9100"

export const searchBooks = async (query: string): Promise<SearchResult[]> => {
    const response = await fetch(`${PUBLIC_API_BASE_URL}/api/v1/search/books?query=${query}`)
    return response.json()
}

