import { cache } from "react";
import { Media } from "@/app/types/media";
import { mapMedia, mapMovie, mapTVshow } from "../lib/media-mappers";
import { tmdbGenreListSchema, tmdbResponseSchema } from "./tmdb.schemas";
import { API_URL, API_KEY } from "@/app/shared/constants/api";

export async function getPopularMovies(page: number) {
  const genresList = await getGenresList();
  const response = await fetch(API_URL + "movie/popular?" + API_KEY + `&page=${page}`, { next: { revalidate: 1800 }, cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`getPopularMovies: HTTP error, status: ${response.status}, message: ${response.statusText}`);
  }
  const parsedResponse = tmdbResponseSchema.parse(await response.json())
  const movies = parsedResponse.results.map(movie => mapMedia(movie, genresList))

  const { page: currentPage, total_pages: totalPages } = parsedResponse

  return { movies, currentPage, totalPages };
}

export async function getTopRatedMovies(page: number) {
  const genresList = await getGenresList();
  const response = await fetch(API_URL + "movie/top_rated?" + API_KEY + `&page=${page}`, { next: { revalidate: 1800 }, cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`getTopRatedMovies: HTTP error, status: ${response.status}, message: ${response.statusText}`);
  }
  const parsedResponse = tmdbResponseSchema.parse(await response.json());
  const movies = parsedResponse.results.map(movies => mapMedia(movies, genresList));

  const { page: currentPage, total_pages: totalPages } = parsedResponse

  return { movies, currentPage, totalPages };
}

export async function getTrendingMedia(mediaType: "all" | "tv" | "movie", timeWindow: string, limit?: number): Promise<Media[]> {
  try {
    const genresList = await getGenresList();
    const response = await fetch(API_URL + `trending/${mediaType}/${timeWindow}?` + API_KEY, { next: { revalidate: 1800 }, cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`getTrendingMedia: HTTP error, status: ${response.status}, message: ${response.statusText}`);
    }

    const json = tmdbResponseSchema.parse(await response.json());
    const sorted = json.results
      .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
      .filter((item) => (item.vote_average ?? 0) >= 6.5 && item);

    const parsed = sorted.map((media) => mapMedia(media, genresList));

    return parsed.slice(0, limit);
  } catch (err) {
    console.error(`getTrendingMedia failed, returning empty list:`, err);
    return [];
  }
}

export async function getPopularTVshows(): Promise<Media[]> {
  try {
    const response = await fetch(API_URL + "discover/tv?sort_by=popularity.desc&without_keywords=155477,158086,179430,160926&" + API_KEY, { next: { revalidate: 1800 }, cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`getPopularTVshows: HTTP error, status: ${response.status}, message: ${response.statusText}`);
    }
    const data = tmdbResponseSchema.parse(await response.json());
    const genresList = await getGenresList();
    const parsed: Media[] = data.results
      .map((TVshow) => mapMedia(TVshow, genresList, "tv"))
      .sort((a: Media, b: Media) => (a.popularity ?? 0) - (b.popularity ?? 0))
      .filter((item: Media) => item.posterPath);

    return parsed;
  } catch (err) {
    console.error(`getPopularTVshows failed, returning empty list:`, err);
    return [];
  }
}

export async function getMovieById(id: string) {
  if (!id) throw new Error("getMovieById: id argument is required");
  const getMovie = async () => {
    const response = await fetch(`${API_URL}movie/${id}?${API_KEY}`, { next: { revalidate: 1800 }, cache: "force-cache" });

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`getMediaById(getMovie): HTTP error, status: ${response.status}, message: ${response.statusText}`);
    }
    return response.json();
  };

  const getCredits = async () => {
    const response = await fetch(`${API_URL}movie/${id}/credits?${API_KEY}`, { next: { revalidate: 1800 }, cache: "force-cache" });

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`getMediaById(getCredits): HTTP error, status: ${response.status}, message: ${response.statusText}`);
    }
    return response.json();
  };

  const movieData = getMovie();
  const creditsData = getCredits();
  const [movie, credits] = await Promise.all([movieData, creditsData]);

  return mapMovie(movie, credits);
}

export async function getTVshowById(id: string) {
  const getTVshow = async () => {
    const response = await fetch(`${API_URL}tv/${id}?${API_KEY}`, { next: { revalidate: 1800 }, cache: "force-cache" });

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`getMediaById(tv): HTTP error, status: ${response.status}, message: ${response.statusText}`);
    }
    const TVshow = await response.json();
    return TVshow
  }

  const getAggregateCredits = async () => {
    const response = await fetch(`${API_URL}tv/${id}/aggregate_credits?${API_KEY}`, { next: { revalidate: 1800 }, cache: "force-cache" });

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`getMediaById(getAggregateCredits): HTTP error, status: ${response.status}, message: ${response.statusText}`);
    }
    const credits = await response.json();
    return credits
  };

  const [TVshow, credits] = await Promise.all([getTVshow(), getAggregateCredits()])
  return mapTVshow(TVshow, credits);
}

export const getGenresList = cache(async () => {
  const [tvResponse, movieResponse] = await Promise.all([
    fetch(API_URL + "genre/tv/list?" + API_KEY, { cache: "force-cache" }),
    fetch(API_URL + "genre/movie/list?" + API_KEY, { cache: "force-cache" })
  ]);

  const [tvData, movieData] = await Promise.all([tvResponse.json(), movieResponse.json()]);

  const tvGenres = tmdbGenreListSchema.parse(tvData);
  const movieGenres = tmdbGenreListSchema.parse(movieData);

  return {
    tvGenres: tvGenres.genres,
    movieGenres: movieGenres.genres,
  };
});
