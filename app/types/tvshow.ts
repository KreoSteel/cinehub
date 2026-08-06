import { Genre } from "./media";
import { ProductionCompany, ProductionCountry, SpokenLanguages } from "./movie";

export type TVShow = {
  backdropPath: string;
  createdBy: CreatedBy[];
  episodeRunTime: number[];
  firstAirDate: string;
  genres: Genre[];
  homepage: string;
  id: number;
  inProduction: boolean;
  languages: string[];
  lastAirDate: string;
  lastEpisodeToAir: Episode | null;
  name: string;
  nextEpisodeToAir: Episode | null;
  networks: Network[];
  numberOfEpisodes: number;
  numberOfSeasons: number;
  originCountry: string[];
  originalLanguage: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  cast: AggregateCast[];
  seasons: Season[];
  spokenLanguages: SpokenLanguages[];
  status: string;
  tagline: string;
  type: string;
  rating: number;
  ratingCount: number;
};

export type CreatedBy = {
  id: number;
  name: string;
  gender: string;
  profilePath: string | null;
};

export type Episode = {
  id: number;
  name: string;
  overview: string;
  rating: number;
  ratingCount: number;
  airDate: string;
  episodeNumber: number;
  runtime: number | null;
  seasonNumber: number;
  showID: number;
  stillPath: string | null;
};

export type Network = {
  id: number;
  name: string;
  originCountry: string;
};

export type Season = {
  airDate: string;
  episodeCount: number;
  id: number;
  name: string;
  overview: string;
  posterPath: string | null;
  seasonNumber: number;
  rating: number;
};


// Agreggate credits
export type TvShowAggregateCredits = {
  cast: AggregateCast[];
  crew: AggregateCrew[];
};

export type AggregateCast = {
  gender: string;
  id: number;
  knownFor: string;
  name: string;
  popularity: number;
  profilePath: string | null;
  order: number;
  roles: AggregateRole[];
  totalEpisodeCount: number;
};

export type AggregateRole = {
  creditID: string;
  character: string;
  episodeCount: number;
};

export type AggregateCrew = {
  gender: string;
  id: number;
  knownFor: string;
  name: string;
  popularity: number;
  profilePath: string | null;
  department: string;
  jobs: AggregateJob[];
  totalEpisodeCount: number;
};

type AggregateJob = {
  creditID: string;
  job: string;
  episodeCount: number;
};
