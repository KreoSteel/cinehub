"use client";
import { TVShow } from "@/app/types/tvshow";
import { BackgroundImgMediaDetails } from "../elements/MediaDetails/BackgroundImgMediaDetails";
import { PosterImage } from "@/app/shared/ui/PosterImage";
import { Clock, Star } from "lucide-react";
import MediaDetailsActions from "../elements/MediaDetails/MediaDetailsActions";
import LastAiredEpisodeCard from "../elements/Cards/LastAiredEpisodeCard";
import Cast from "../elements/MediaDetails/Cast";
import FactsCard from "../elements/Cards/FactsCard";
import CreatedBy from "../elements/MediaDetails/CreatedBy";
import { Genre } from "@/app/types/media";
import SeasonsAccordionList from "../elements/MediaDetails/Accordion/SeasonsAccordionList";
import MoreLikeThisMedia from "../elements/MediaDetails/MoreLikeThisMedia";
import { useQuery } from "@tanstack/react-query";
import { getSimilarMediaOptions } from "../entities/media/queryOptions/getSimilarMediaOptions";
import MoreLikeThisSkeleton from "../elements/EmptyStates/MoreLikeThisSkeleton";

interface TVShowDetailsProps {
  tvshow: TVShow;
}

export default function TVShowDetails({ tvshow }: TVShowDetailsProps) {
  const cast = tvshow.cast.slice(0, 6);
  const { data: similarData, isPending } = useQuery(getSimilarMediaOptions(tvshow.id, "tv"));

  return (
    <div className="relative">
      <BackgroundImgMediaDetails title={tvshow.name} backdropPath={tvshow.backdropPath} />
      <div className="flex mx-auto pt-40 md:pt-65 w-full max-w-7xl">
        <PosterImage title={tvshow.name} posterPath={tvshow.posterPath} />
        <div className="px-10 py-6 flex flex-col gap-4 font-inter">
          <p className="text-muted-foreground tracking-widest text-sm text-shadow-sm">{tvshow.status.toUpperCase()}</p>
          <h1 className="font-title text-6xl text-shadow-lg">{tvshow.name}</h1>
          {tvshow.tagline && <p className="italic text-amber text-xl text-shadow-md">{"\u201C"}{tvshow.tagline}{"\u201D"}</p>}
          <div className="text-muted-foreground flex gap-4 items-center text-shadow-sm">
            <div className="flex gap-4">
              <p>{new Date(tvshow.firstAirDate).getFullYear()}</p>
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                <p>{`S${tvshow.numberOfSeasons} • ${tvshow.numberOfEpisodes} ep`}</p>
              </span>
            </div>
            <div className="flex items-center gap-2.5 mx-2">
              <span className="text-amber flex items-center gap-1.5">
                <Star fill="#FFB900" size={16} />
                <p className="font-bold ">{tvshow.rating.toFixed(1)}</p>
              </span>
              <p>({tvshow.ratingCount} votes)</p>
            </div>
            <Genres genres={tvshow.genres} />
          </div>
          <p className="max-w-190 text-lg leading-relaxed text-mauve-200 text-shadow-md">{tvshow.overview}</p>
          <MediaDetailsActions homepage={tvshow.homepage} />
          <LastAiredEpisodeCard tvshow={tvshow} />
          <div className="flex gap-16 justify-between pt-4 items-start">
            <div className="flex flex-col gap-8">
              <CreatedBy createdBy={tvshow.createdBy} />
              <Cast cast={cast} />
              <SeasonsAccordionList seasons={tvshow.seasons} tvShowID={tvshow.id} seasonsCount={tvshow.numberOfSeasons} totalEpisodesCount={tvshow.numberOfEpisodes} />
            </div>
            <FactsCard facts={tvshow} mediaType="tv" />
          </div>
        </div>
      </div>
      {isPending ? <MoreLikeThisSkeleton /> :
        <MoreLikeThisMedia mediaType="tv" media={similarData!} />
      }
    </div>
  );
}

interface GenresProp {
  genres: Genre[]
}

export function Genres({ genres }: GenresProp) {
  return (
    genres ? genres.map((genre) => (
      <div key={genre.id} className="bg-background px-2 py-1 border rounded-lg text-xs">
        {genre.name}
      </div>
    )) : null
  )
}

