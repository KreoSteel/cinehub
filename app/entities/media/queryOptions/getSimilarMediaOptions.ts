import { queryOptions } from "@tanstack/react-query";
import { Media } from "@/app/types/media";

export async function getSimilarMedia(id: number, mediaType: string) {
  const response = await fetch(`/api/similar/${mediaType}/${id}`)

  if (!response.ok) {
    throw new Error(`seasonDetails: HTTP error, status: ${response.status}, message: ${response.statusText}`);
  }
  const data = await response.json()
  return data.filter((item: Media) => item.backdropPath) as Media[]
}

export function getSimilarMediaOptions(mediaId: number, mediaType: "tv" | "movie") {
  return queryOptions({
    queryKey: ["similarMedia", mediaId, mediaType],
    queryFn: () => getSimilarMedia(mediaId, mediaType)
  })
}