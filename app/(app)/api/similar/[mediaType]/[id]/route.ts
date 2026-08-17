import { NextRequest, NextResponse } from "next/server";
import { TMDBResponse } from "@/app/types/tmdb";
import { Media } from "@/app/types/media";
import { mapMedia } from "@/app/entities/media/lib/media-mappers";
import { getGenresList } from "@/app/entities/media/api/GET-media";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = `api_key=${process.env.API_KEY}`;

export async function GET(req: NextRequest, { params }: { params: Promise<{ mediaType: string, id: string }> }) {
  const { mediaType, id } = await params;
  if (!API_KEY) {
    throw new Error("API_KEY is not configured")
  }

  const response = await fetch(API_URL + `${mediaType}/${id}/similar?` + API_KEY);

  if (!response.ok) {
    throw new Error(`fetchSimilarMedia: HTTP error, status: ${response.status}, message: ${response.statusText}`);
  }

  const genresList = await getGenresList()

  const data: TMDBResponse = await response.json();
  const media: Media[] = data.results.map(item => mapMedia(item, genresList));
  return NextResponse.json(media);
}
