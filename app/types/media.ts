export type Media = {
  id: number;
  backdropPath: string;
  posterPath: string;
  title: string;
  overview: string;
  mediaType: string;
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