// Application types for Media and Genres
export type Media = Omit<TMDBMedia, | "genre_ids"> & {
  genres: MediaGenres[]
}

export type MediaGenres = {
  id: number;
  name: string;
};

export type GenreLists = {
  tvGenres: MediaGenres[];
  movieGenres: MediaGenres[];
};

// TMDB types
export type TMDBMedia = {
  id: number;
  media_type: "tv" | "movie";
  name: string;
  title: string;
  overview: string;
  genre_ids: number[];
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  userRating: number;
  release_date: string;
  first_air_date: string;
  popularity: number;
};

export type TMDBResponse = {
  results: TMDBMedia[];
  totalPages: number;
  totalResults: number;
  page: number;
};
