import { getMediaGenres } from "@/lib/media-helpers";
import { MediaGenres, TMDBMedia, TMDBResponse } from "@/app/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = `api_key=${process.env.API_KEY}`;

export async function getPopularMovies(page: number) {
  const response = await fetch(API_URL + "movie/popular?" + API_KEY + `&page=${page}`);
  if (!response.ok) {
    throw new Error(
      `getPopularMovies: HTTP error, status: ${response.status}, message: ${response.statusText}`
    );
  }
  const parsed: TMDBResponse = await response.json();
  const movies: TMDBMedia[] = parsed.results;
  return movies;
}

export async function getTrendingMedia(
  mediaType: "all" | "tv" | "movie",
  timeWindow: string,
  limit?: number
) {
  const response = await fetch(API_URL + `trending/${mediaType}/${timeWindow}?` + API_KEY);
  if (!response.ok) {
    throw new Error(
      `getTrendingMedia: HTTP error, status: ${response.status}, message: ${response.statusText}`
    );
  }

  const json: TMDBResponse = await response.json();
  const parsed = json.results
    .sort((a, b) => b.popularity - a.popularity)
    .map((item) => item.vote_average >= 6.5 && item)
    .filter((item) => item !== false);

  const genresList = await fetchGenresList();
  const currentGenresList = (media: TMDBMedia) =>
    media.media_type === "movie" ? genresList.movieGenres : genresList.tvGenres;

  const parsedWithGenres = parsed.map((media: TMDBMedia) => {
    const { genre_ids, ...rest } = media;

    return { ...rest, genres: getMediaGenres(media.genre_ids, currentGenresList(media)) };
  });

  const media = parsedWithGenres.slice(0, limit || 8);
  return media;
}

export async function fetchGenresList() {
  const tvResponse = await fetch(API_URL + "genre/tv/list?" + API_KEY);
  const movieResponse = await fetch(API_URL + "genre/movie/list?" + API_KEY);
  if (!tvResponse.ok || !movieResponse) {
    throw new Error(
      `getMediaGenres: HTTP error, status: ${tvResponse.status}, message: ${tvResponse.statusText}`
    );
  }

  const tvData = await tvResponse.json();
  const movieData = await movieResponse.json();

  return {
    tvGenres: tvData.genres as MediaGenres[],
    movieGenres: movieData.genres as MediaGenres[],
  };
}
