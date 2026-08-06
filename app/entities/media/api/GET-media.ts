import { TMDBMedia, TMDBResponse, TMDBTVShow, TMDBTvShowAggregateCredits } from "@/app/types/tmdb";
import { Genre, Media } from "@/app/types/media";
import { mapMedia, mapMovie, mapTVshow } from "../lib/media-mappers";
import { AggregateCrew, TVShow, TvShowAggregateCredits } from "@/app/types/tvshow";

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

  const media = parsed.slice(0, limit);
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
    // Sort by popularity in ascending order
    .sort((a: Media, b: Media) => a.popularity - b.popularity)
    // Filter tv shows without the blacklisted id's
    .filter((item: Media) => !blacklist.has(item.id));

  return parsed;
}

export async function getMovieById(id: string) {
  if (!id) throw new Error("getMovieById: id argument is required");
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
}

export async function getTVshowById(id: string) {
  const getTVshow = async (): Promise<TMDBTVShow> => {
    const response = await fetch(`${API_URL}tv/${id}?${API_KEY}`);
    if (!response.ok) {
      throw new Error(`getMediaById(tv): HTTP error, status: ${response.status}, message: ${response.statusText}`);
    }
    const TVshow = await response.json();
    return TVshow
  }

  const getAggregateCredits = async (): Promise<TMDBTvShowAggregateCredits> => {
    const response = await fetch(`${API_URL}tv/${id}/aggregate_credits?${API_KEY}`);
    if (!response.ok) {
      throw new Error(`getMediaById(getAggregateCredits): HTTP error, status: ${response.status}, message: ${response.statusText}`);
    }
    const credits = await response.json();
    console.log(credits)
    return credits
  };

  const [TVshow, credits] = await Promise.all([getTVshow(), getAggregateCredits()])
  console.log("yoo", await getAggregateCredits())
  return mapTVshow(TVshow, credits);
}

export async function fetchGenresList() {
  const [tvResponse, movieResponse] = await Promise.all([
    fetch(API_URL + "genre/tv/list?" + API_KEY),
    fetch(API_URL + "genre/movie/list?" + API_KEY),
  ]);
  console.log(`${API_URL}tv/$37854?${API_KEY}`);

  const [tvData, movieData] = await Promise.all([tvResponse.json(), movieResponse.json()]);

  return {
    tvGenres: tvData.genres as Genre[],
    movieGenres: movieData.genres as Genre[],
  };
}
