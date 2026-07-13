import { Genre } from "./media";

export type TVshow = Omit<TMDBMedia, "genre_ids" | "title" | "release_date"> & {
  genres: Genre[];
};

// From TMDB API
export type TMDBMedia = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  title: string;
  original_name: string;
  original_title: string;
  original_language: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

export type TMDBResponse = {
  results: TMDBMedia[];
  totalPages: number;
  totalResults: number;
  page: number;
};


export type TMDBMovie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: TMDBCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TMDBCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type TMDBProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type TMDBProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type TMDBSpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type TMDBCredits = {
  crew: TMDBCrew[];
  cast: TMDBCast[];
}

export type TMDBCrew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type TMDBCast = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  popularity: number;
  profile_path: string | null;
};