import { Genre } from "./media";

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
};

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

export type TMDBTVShow = {
  adult: boolean;
  backdrop_path: string;
  created_by: TMDBCreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TMDBEpisode | null;
  name: string;
  next_episode_to_air: TMDBEpisode | null;
  networks: TMDBNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  seasons: TMDBSeason[];
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type TMDBCreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
};

export type TMDBEpisode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
};

export type TMDBNetwork = {
  id: number;
  name: string;
  origin_country: string;
};

export type TMDBSeason = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
};

export type TMDBSeasonDetails = {
  air_date: string;
  episodes: TMDBSeasonEpisode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
};

export type TMDBSeasonEpisode = {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  crew: TMDBCrew[];
  guest_stars: TMDBCast[];
};


// Aggregate Credits
export type TMDBTvShowAggregateCredits = {
  cast: TMDBAggregateCast[];
  crew: TMDBAggregateCrew[];
};

export type TMDBAggregateCast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  order: number;
  roles: TMDBAggregateRole[];
  total_episode_count: number;
};

export type TMDBAggregateRole = {
  credit_id: string;
  character: string;
  episode_count: number;
};

export type TMDBAggregateCrew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  department: string;
  jobs: TMDBAggregateJob[];
  total_episode_count: number;
};

export type TMDBAggregateJob = {
  credit_id: string;
  job: string;
  episode_count: number;
};