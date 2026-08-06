import { Cast, Crew, ProductionCountry } from "@/app/types/movie";
import { TMDBCast, TMDBCrew, TMDBProductionCompany, TMDBNetwork, TMDBProductionCountry, TMDBSeason, TMDBEpisode, TMDBCreatedBy, TMDBTvShowAggregateCredits, TMDBAggregateCrew, TMDBAggregateCast } from "@/app/types/tmdb";
import { Season, Episode, CreatedBy, TvShowAggregateCredits, AggregateCrew, AggregateCast } from "@/app/types/tvshow";

// Movie map helpers
export function mapMovieCast(cast: TMDBCast[]) {
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

export function mapMovieCrew(crew: TMDBCrew[]) {
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

export type TMDBOrganization = TMDBProductionCompany[] | TMDBNetwork[];

export function mapOrganizations(organizations: TMDBOrganization) {
    return organizations.map((item) => ({
        id: item.id,
        name: item.name,
        originCountry: item.origin_country,
    }));
}

export function mapProdCountries(prodCountries: TMDBProductionCountry[]) {
    return prodCountries.map(
        (item) =>
            ({
                iso3166: item.iso_3166_1,
                name: item.name,
            }) as ProductionCountry
    );
}

// TV show map helpers
export function mapSeason(seasons: TMDBSeason[]) {
    return seasons.map(
        (item) =>
            ({
                airDate: item.air_date,
                episodeCount: item.episode_count,
                id: item.id,
                name: item.name,
                overview: item.overview,
                posterPath: item.poster_path !== null ? item.poster_path : null,
                seasonNumber: item.season_number,
                rating: item.vote_average,
            }) as Season
    );
}

export function mapEpisode(episode: TMDBEpisode | null) {
    if (episode === null) return null;
    return {
        id: episode.id,
        name: episode.name,
        overview: episode.overview,
        rating: episode.vote_average,
        ratingCount: episode.vote_count,
        airDate: episode.air_date,
        episodeNumber: episode.episode_number,
        runtime: episode.runtime,
        seasonNumber: episode.season_number,
        showID: episode.show_id,
        stillPath: episode.still_path,
    } as Episode;
}

export function mapCreatedBy(createdBy: TMDBCreatedBy[]) {
    return createdBy.map(
        (item) =>
            ({
                id: item.id,
                name: item.name,
                gender: item.gender === 1 ? "Female" : "Male",
                profilePath: item.profile_path,
            }) as CreatedBy
    );
}

// TV show aggregate credits mappers
export function mapAggregateCredits(credits: TMDBTvShowAggregateCredits): TvShowAggregateCredits {
    return { crew: mapTVshowCrew(credits.crew), cast: mapTVshowCast(credits.cast) }
}

export function mapTVshowCrew(crew: TMDBAggregateCrew[]): AggregateCrew[] {
    return crew.map(
        (item) =>
        ({
            id: item.id,
            gender: item.gender === 1 ? "Female" : "Male",
            knownFor: item.known_for_department,
            name: item.name,
            popularity: item.popularity,
            profilePath: item.profile_path,
            department: item.department,
            jobs: item.jobs.map(job => ({
                creditID: job.credit_id,
                job: job.job,
                episodeCount: job.episode_count
            })),
            totalEpisodeCount: item.total_episode_count
        })
    );
}

export function mapTVshowCast(cast: TMDBAggregateCast[]): AggregateCast[] {
    return cast.map((item) => ({
        id: item.id,
        gender: item.gender === 1 ? "Female" : "Male",
        knownFor: item.known_for_department,
        name: item.name,
        popularity: item.popularity,
        profilePath: item.profile_path,
        order: item.order,
        roles: item.roles.map(role => ({
            creditID: role.credit_id,
            character: role.character,
            episodeCount: role.episode_count
        })),
        totalEpisodeCount: item.total_episode_count
    }))
}