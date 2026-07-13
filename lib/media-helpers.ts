import { Genre, GenreLists, Media } from "@/app/types/media";
import { Cast, Crew, Movie, ProductionCompany, ProductionCountry, SpokenLanguages } from "@/app/types/movie";
import { TMDBMedia, TMDBMovie, TMDBCredits, TMDBCast, TMDBCrew } from "@/app/types/tmdb";

export function getGenres(ids: number[] | number, genres: Genre[]): Genre[] | [] {
  if (!ids) return [];
  if (Array.isArray(ids)) {
    const foundGenres = ids.map((id) => genres.find((genre) => genre.id === id)).filter((item): item is Genre => item?.id !== undefined);
    return foundGenres ? foundGenres : [];
  } else if (typeof ids === "number") {
    const foundGenre = genres.find((genre) => genre.id === ids);
    return foundGenre ? [foundGenre] : [];
  }
  return [];
}

export function mapMedia(media: TMDBMedia, genreLists: GenreLists): Media {
  return {
    id: media.id,
    backdropPath: media.backdrop_path,
    posterPath: media.poster_path,
    title: media.title ?? media.name,
    overview: media.overview,
    mediaType: media.media_type,
    genres: getGenres(media.genre_ids, media.media_type === "tv" ? genreLists.tvGenres : genreLists.movieGenres),
    popularity: media.popularity,
    releaseDate: new Date(media.release_date).getFullYear() || new Date(media.first_air_date).getFullYear(),
    rating: media.vote_average,
  };
}

export function mapMovie(movie: TMDBMovie, credits: TMDBCredits): Movie {
  return {
    id: movie.id,
    title: movie.title,
    backdropPath: movie.backdrop_path,
    posterPath: movie.poster_path,
    tagline: movie.tagline,
    status: movie.status,
    overview: movie.overview,
    genres: movie.genres,
    popularity: movie.popularity,
    releaseDate: movie.release_date,
    runtime: movie.runtime,
    rating: movie.vote_average,
    ratingCount: movie.vote_count,
    homepage: movie.homepage,
    revenue: movie.revenue,
    budget: movie.budget,
    originalLanguage: movie.original_language,
    spokenLanguages: movie.spoken_languages.map((item) => ({ iso639: item.iso_639_1, name: item.name }) as SpokenLanguages),
    credits: { cast: mapCast(credits.cast), crew: mapCrew(credits.crew) },
    productionCompanies: mapProdCompanies(movie),
    productionCountries: mapProdCountries(movie),
  };
}

// Map helpers
function mapCast(cast: TMDBCast[]) {
  return cast.map(
    (item) =>
      ({
        gender: item.gender === 1 ? "Female" : "Male",
        id: item.id,
        knownFor: item.known_for_department,
        name: item.name,
        creditId: item.credit_id,
        profilePath: item.profile_path,
        character: item.character,
        order: item.order,
      }) as Cast
  );
}

function mapCrew(crew: TMDBCrew[]) {
  return crew.map(
    (item) =>
      ({
        gender: item.gender === 1 ? "Female" : "Male",
        id: item.id,
        knownFor: item.known_for_department,
        name: item.name,
        creditId: item.credit_id,
        profilePath: item.profile_path,
        department: item.department,
        job: item.job,
      }) as Crew
  );
}

function mapProdCompanies(movie: TMDBMovie) {
  return movie.production_companies.map(
    (item) =>
      ({
        id: item.id,
        logoPath: item.logo_path,
        name: item.name,
        originCountry: item.origin_country,
      }) as ProductionCompany
  );
}

function mapProdCountries(movie: TMDBMovie) {
  return movie.production_countries.map(
    (item) =>
      ({
        iso3166: item.iso_3166_1,
        name: item.name,
      }) as ProductionCountry
  );
}

// TMDb's images
export const baseUrl = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;

export function getImage(path: string, size: string) {
  return path && baseUrl + size + path;
}
