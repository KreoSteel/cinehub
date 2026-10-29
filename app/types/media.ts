export type Media = {
  id: number;
  backdropPath: string | null;
  posterPath: string | null;
  title: string;
  overview: string;
  mediaType: "movie" | "tv" | "person";
  genres: Genre[] | null;
  popularity: number;
  releaseDate: number;
  rating: number;
};

// Genres
export type Genre = {
  id: number;
  name: string;
};

export type GenreLists = {
  tvGenres: Genre[];
  movieGenres: Genre[];
};