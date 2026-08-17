import { NextRequest, NextResponse } from "next/server";
import { mapSeasonDetails } from "@/app/entities/media/lib/map-helpers";
import { TMDBSeasonDetails } from "@/app/types/tmdb";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = `api_key=${process.env.API_KEY}`;

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seasonNumber = req.nextUrl.searchParams.get("seasonNumber");

  if (!seasonNumber) {
    return NextResponse.json({ error: "seasonNumber is required" }, { status: 400 });
  }

  const response = await fetch(API_URL + `tv/${id}/season/${seasonNumber}?` + API_KEY);

  if (!response.ok) {
    throw new Error(`fetchSeasonDetails: HTTP error, status: ${response.status}, message: ${response.statusText}`);
  }

  const data: TMDBSeasonDetails = await response.json();
  return NextResponse.json(mapSeasonDetails(data));
}
