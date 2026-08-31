import { getGenresList } from "@/app/entities/media/api/GET-media";
import { mapMedia } from "@/app/entities/media/lib/media-mappers";
import { tmdbResponseSchema } from "@/app/entities/media/api/tmdb.schemas";
import { API_KEY, API_URL } from "@/app/shared/constants/api";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const searchQuerySchema = z.string().trim().pipe(z.string().min(1).max(200));

export async function GET(req: NextRequest) {
  const parsedQuery = searchQuerySchema.safeParse(req.nextUrl.searchParams.get("query"));

  if (!parsedQuery.success) {
    return NextResponse.json({ error: "query search param is required (1-200 characters)" }, { status: 400 });
  }

  const response = await fetch(API_URL + "search/multi?" + API_KEY + `&query=${encodeURIComponent(parsedQuery.data)}&page=1`);

  if (!response.ok) {
    console.error(`TMDB search media failed: ${response.status}, ${response.statusText}`);
    return NextResponse.json({ error: "Failed to fetch search media" }, { status: 502 });
  }

  const parsedResponse = tmdbResponseSchema.safeParse(await response.json());

  if (!parsedResponse.success) {
    console.error(`TMDB search media returned an unexpected shape: ${parsedResponse.error.message}`);
    return NextResponse.json({ error: "Unexpected response from TMDB" }, { status: 502 });
  }

  const genresList = await getGenresList();

  const parsed = parsedResponse.data.results
    .filter(item => item.media_type !== "person")
    .map(item => mapMedia(item, genresList))
    .slice(0, 8);
  return NextResponse.json(parsed);
}