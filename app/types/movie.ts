import { Genre, Media } from "./media";

// Application Types
export type Movie = {
  title: string;
  id: number;
  backdropPath: string;
  posterPath: string;
  tagline: string;
  status: string;
  releaseDate: string;
  runtime: number;
  rating: number;
  ratingCount: number;
  genres: Genre[];
  popularity: number;
  overview: string;
  homepage: string;
  revenue: number;
  budget: number;
  originalLanguage: string;
  spokenLanguages: SpokenLanguages[];
  credits: Credits;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
};

export type AppResponse = {
  movies: Media[];
  currentPage: number;
  totalPages: number;
}

export type Credits = {
  crew: Crew[];
  cast: Cast[];
};

export type Crew = {
  gender: string;
  id: number;
  knownFor: string;
  name: string;
  profilePath: string;
  creditId: string;
  department: string;
  job: string;
};

export type Cast = Omit<Crew, "department" | "job"> & {
  character: string;
  order: number;
};

export type ProductionCompany = {
  id: number;
  name: string;
  originCountry: string;
};

export type ProductionCountry = {
  iso3166: string;
  name: string;
};

export type SpokenLanguages = {
  iso639: string;
  name: string;
};
