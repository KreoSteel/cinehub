import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { mapMedia } from "@/app/entities/media/lib/media-mappers";
import { getGenresList } from "@/app/entities/media/api/GET-media";
import { tmdbResponseSchema } from "@/app/entities/media/api/tmdb.schemas";
import { API_KEY, API_URL } from "@/app/shared/constants/api";

const similarParamsSchema = z.object({
  mediaType: z.enum(["movie", "tv"]),
  id: z.coerce.number().int().positive(),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ mediaType: string, id: string }> }) {
  const parsedParams = similarParamsSchema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json({ error: "mediaType must be 'movie' or 'tv' and id must be a positive number" }, { status: 400 });
  }

  const { mediaType, id } = parsedParams.data;
  const response = await fetch(API_URL + `${mediaType}/${id}/similar?` + API_KEY);

  if (!response.ok) {
    console.error(`TMDB similar media fetch failed: ${response.status}, ${response.statusText}`)
    return NextResponse.json({ error: "Failed to fetch similar media" }, { status: 502 })
  }

  const genresList = await getGenresList()

  const parsedResponse = tmdbResponseSchema.safeParse(await response.json());

  if (!parsedResponse.success) {
    console.error(`TMDB similar media returned an unexpected shape: ${parsedResponse.error.message}`)
    return NextResponse.json({ error: "Unexpected response from TMDB" }, { status: 502 })
  }

  const media = parsedResponse.data.results.map(item => mapMedia(item, genresList, mediaType));
  return NextResponse.json(media);
}
