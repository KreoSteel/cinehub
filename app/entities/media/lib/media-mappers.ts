import { getGenres } from "@/app/shared/lib/helpers";
import { TMDBMedia } from "../api/tmdb.schemas";
import { mapOrganizations, mapProdCountries, mapCreatedBy, mapEpisode, mapSeason, mapMovieCast, mapMovieCrew, mapTVshowCast } from "./map-helpers";
import { GenreLists, Media } from "@/app/types/media";
import { Movie, SpokenLanguages } from "@/app/types/movie";
import { TMDBMovie, TMDBCredits, TMDBTVShow, TMDBTvShowAggregateCredits } from "@/app/types/tmdb";
import { TVShow } from "@/app/types/tvshow";

// Map media/movie/tvshow
export function mapMedia(media: TMDBMedia, genreLists: GenreLists, fallbackMediaType: "movie" | "tv" = "movie"): Media {
  return {
    id: media.id,
    backdropPath: media.backdrop_path ?? null,
    posterPath: media.poster_path ?? null,
    title: media.title ?? media.name ?? "Untitled",
    overview: media.overview ?? "",
    mediaType: media.media_type ?? fallbackMediaType,
    genres: getGenres(media.genre_ids ?? [], media.media_type === "tv" ? genreLists.tvGenres : genreLists.movieGenres),
    popularity: media.popularity ?? 0,
    releaseDate: new Date(media.release_date ?? "").getFullYear() || new Date(media.first_air_date ?? "").getFullYear(),
    rating: media.vote_average ?? 0,
  };
}

export function mapMovie(movie: TMDBMovie, credits: TMDBCredits): Movie | null {
  return movie ? {
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
    credits: { cast: mapMovieCast(credits.cast), crew: mapMovieCrew(credits.crew) },
    productionCompanies: mapOrganizations(movie.production_companies),
    productionCountries: mapProdCountries(movie.production_countries),
  } : null;
}

export function mapTVshow(tvShow: TMDBTVShow, credits: TMDBTvShowAggregateCredits): TVShow | null {
  const castSliced = credits?.cast.slice(0, 100)

  return tvShow ? {
    id: tvShow.id,
    backdropPath: tvShow.backdrop_path,
    createdBy: mapCreatedBy(tvShow.created_by),
    episodeRunTime: tvShow.episode_run_time,
    firstAirDate: tvShow.first_air_date,
    genres: tvShow.genres,
    homepage: tvShow.homepage,
    inProduction: tvShow.in_production,
    languages: tvShow.languages,
    lastAirDate: tvShow.last_air_date,
    lastEpisodeToAir: mapEpisode(tvShow.last_episode_to_air),
    name: tvShow.name,
    nextEpisodeToAir: mapEpisode(tvShow.next_episode_to_air),
    networks: mapOrganizations(tvShow.networks),
    numberOfEpisodes: tvShow.number_of_episodes,
    numberOfSeasons: tvShow.number_of_seasons,
    originCountry: tvShow.origin_country,
    originalLanguage: tvShow.original_language,
    overview: tvShow.overview,
    popularity: tvShow.popularity,
    posterPath: tvShow.poster_path,
    productionCompanies: mapOrganizations(tvShow.production_companies),
    productionCountries: mapProdCountries(tvShow.production_countries),
    cast: mapTVshowCast(castSliced),
    seasons: mapSeason(tvShow.seasons),
    spokenLanguages: tvShow.spoken_languages.map((item) => ({ iso639: item.iso_639_1, name: item.name, }) as SpokenLanguages),
    status: tvShow.status,
    tagline: tvShow.tagline,
    type: tvShow.type,
    rating: tvShow.vote_average,
    ratingCount: tvShow.vote_count,
  } : null;
}