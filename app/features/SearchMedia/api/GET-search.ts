import { Media } from "@/app/types/media";

export async function getSearchSuggestions(query: string | null) {
  const response = await fetch(`/api/search?query=${query}`)

  if (!response.ok) {
    throw new Error(`searchSuggestions: HTTP error, status: ${response.status}, message: ${response.statusText}`);
  }

  const data = await response.json()
  return data as Media[]
}