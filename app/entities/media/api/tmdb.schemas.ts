import { z } from "zod";

export const tmdbMediaSchema = z.object({
  adult: z.boolean().optional(),
  backdrop_path: z.string().nullable().optional(),
  id: z.number(),
  name: z.string().optional(),
  title: z.string().optional(),
  original_name: z.string().optional(),
  original_title: z.string().optional(),
  original_language: z.string().optional(),
  overview: z.string().nullable().optional(),
  poster_path: z.string().nullable().optional(),
  media_type: z.enum(["movie", "tv", "person"]).optional(),
  genre_ids: z.array(z.number()).optional(),
  popularity: z.number().optional(),
  first_air_date: z.string().optional(),
  release_date: z.string().optional(),
  video: z.boolean().optional(),
  vote_average: z.number().optional(),
  vote_count: z.number().optional(),
  origin_country: z.array(z.string()).optional(),
});

export const tmdbResponseSchema = z.object({
  page: z.number(),
  results: z.array(tmdbMediaSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const tmdbGenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const tmdbGenreListSchema = z.object({
  genres: z.array(tmdbGenreSchema),
});

export type TMDBMedia = z.infer<typeof tmdbMediaSchema>;
export type TMDBResponse = z.infer<typeof tmdbResponseSchema>;
export type TMDBGenre = z.infer<typeof tmdbGenreSchema>;