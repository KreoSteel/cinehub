import { mapMedia, mapMovie } from "@/lib/media-helpers";
import { TMDBMedia, TMDBResponse } from "@/app/types/tmdb";
import { Genre, Media } from "@/app/types/media";

const originalFetch = global.fetch;

global.fetch = async (...args) => {
  console.log("[FETCH]", args[0]);

  return originalFetch(...args);
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = `api_key=${process.env.API_KEY}`;

export async function getPopularMovies(page: number) {
  const response = await fetch(API_URL + "movie/popular?" + API_KEY + `&page=${page}`);
  if (!response.ok) {
    throw new Error(`getPopularMovies: HTTP error, status: ${response.status}, message: ${response.statusText}`);
  }
  const parsed: TMDBResponse = await response.json();
  const movies: TMDBMedia[] = parsed.results;
  return movies;
}

export async function getTrendingMedia(mediaType: "all" | "tv" | "movie", timeWindow: string, limit?: number) {
  const genresList = await fetchGenresList();
  const response = await fetch(API_URL + `trending/${mediaType}/${timeWindow}?` + API_KEY);
  if (!response.ok) {
    throw new Error(`getTrendingMedia: HTTP error, status: ${response.status}, message: ${response.statusText}`);
  }

  const json: TMDBResponse = await response.json();
  const sorted = json.results
    .sort((a, b) => b.popularity - a.popularity)
    .map((item) => item.vote_average >= 6.5 && item)
    .filter((item) => item !== false);

  const parsed = sorted.map((media) => mapMedia(media, genresList));

  const media = parsed.slice(0, limit || 20);
  return media;
}

export async function getPopularTVshows() {
  const response = await fetch(API_URL + "discover/tv?sort_by=popularity.desc&without_keywords=155477,158086,179430,160926&" + API_KEY);
  if (!response.ok) {
    throw new Error(`getPopularTVshows: HTTP error, status: ${response.status}, message: ${response.statusText}`);
  }
  const blacklist = new Set([241002]);
  const data = await response.json();
  const genresList = await fetchGenresList();
  const parsed: Media[] = data.results
    // Get rid of genre_ids and add genres property
    .map((TVshow: TMDBMedia) => mapMedia(TVshow, genresList))
    // Filter tv shows without the blacklisted id's
    .filter((item: Media) => !blacklist.has(item.id));

  return parsed;
}

export async function getMediaById(id: string, mediaType: string) {
  if (!id) throw new Error("getMediaById: id argument is required");
  if (!mediaType) throw new Error("getMediaById: mediaType argument is required");
  const genresList = await fetchGenresList();

  if (mediaType === "movie") {
    const getMovie = async () => {
      const response = await fetch(`${API_URL}movie/${id}?${API_KEY}`);
      if (!response.ok) {
        throw new Error(`getMediaById(getMovie): HTTP error, status: ${response.status}, message: ${response.statusText}`);
      }
      return response.json();
    };
    const getCredits = async () => {
      const response = await fetch(`${API_URL}movie/${id}/credits?${API_KEY}`);
      if (!response.ok) {
        throw new Error(`getMediaById(getCredits): HTTP error, status: ${response.status}, message: ${response.statusText}`);
      }
      return response.json();
    };

    const movieData = getMovie();
    const creditsData = getCredits();
    const [movie, credits] = await Promise.all([movieData, creditsData]);

    return mapMovie(movie, credits);
  } else if (mediaType === "tv") {
    const response = await fetch(`${API_URL}tv/${id}?${API_KEY}`);
    if (!response.ok) {
      throw new Error(`getMediaById(tv): HTTP error, status: ${response.status}, message: ${response.statusText}`);
    }

    const data = await response.json();
    return mapMedia(data, genresList);
  }

  throw new Error(`getMediaById: Couldn't get media, try again`);
}

export async function fetchGenresList() {
  // TODO: Promise.all
  const tvResponse = await fetch(API_URL + "genre/tv/list?" + API_KEY);
  const movieResponse = await fetch(API_URL + "genre/movie/list?" + API_KEY);
  if (!tvResponse.ok || !movieResponse) {
    throw new Error(`fetchGenresList: HTTP error, status: ${tvResponse.status}, message: ${tvResponse.statusText}`);
  }

  const tvData = await tvResponse.json();
  const movieData = await movieResponse.json();

  return {
    tvGenres: tvData.genres as Genre[],
    movieGenres: movieData.genres as Genre[],
  };
}
