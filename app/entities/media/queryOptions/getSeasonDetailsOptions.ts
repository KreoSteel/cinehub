import { SeasonDetails } from "@/app/types/tvshow";
import { queryOptions } from "@tanstack/react-query";

export async function getSeasonDetails(tvShowID: number, seasonNumber: number | null) {
  if (!tvShowID || !seasonNumber) {
    throw new Error(`getSeasonDetails: Arguments are not confugured. (tvShowID: ${tvShowID}, seasonNumber: ${seasonNumber})`)
  }

  const response = await fetch(`/api/seasonDetails/${tvShowID}?seasonNumber=${seasonNumber}`)
  if (!response.ok) {
    throw new Error(`seasonDetails: HTTP error, status: ${response.status}, message: ${response.statusText}`);
  }
  const data = await response.json()
  return data as SeasonDetails
}

export function getSeasonDetailsOptions(tvShowID: number, seasonNumber: number | null, enabled: boolean = false) {
  return queryOptions({
    queryKey: ['seasonDetails', tvShowID, seasonNumber],
    queryFn: () => getSeasonDetails(tvShowID, seasonNumber),
    enabled,
  })
}