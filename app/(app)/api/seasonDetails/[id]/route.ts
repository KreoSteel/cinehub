import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { mapSeasonDetails } from "@/app/entities/media/lib/map-helpers";
import { API_URL, API_KEY } from "@/app/shared/constants/api";

const seasonDetailsParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
  seasonNumber: z.coerce.number().int().min(0),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const parsedParams = seasonDetailsParamsSchema.safeParse({
    id: (await params).id,
    seasonNumber: req.nextUrl.searchParams.get("seasonNumber"),
  });

  if (!parsedParams.success) {
    return NextResponse.json({ error: "id must be a positive number and seasonNumber is required" }, { status: 400 });
  }

  const { id, seasonNumber } = parsedParams.data;

  const response = await fetch(API_URL + `tv/${id}/season/${seasonNumber}?` + API_KEY);

  if (response.status === 404) {
    return NextResponse.json({ error: "Season not found" }, { status: 404 });
  }

  if (!response.ok) {
    console.error(`TMDB season fetch failed: ${response.status}, ${response.statusText}`)
    return NextResponse.json({ error: "Failed to fetch season details" }, { status: 502 })
  }

  const data = await response.json();
  return NextResponse.json(mapSeasonDetails(data));
}
