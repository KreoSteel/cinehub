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

interface TVShowDetailsProps {
  tvshow: TVShow;
}

export default function TVShowDetails({ tvshow }: TVShowDetailsProps) {
  const cast = tvshow.cast.slice(0, 6);

  return (
    <div className="relative">
      <BackgroundImgMediaDetails title={tvshow.name} backdropPath={tvshow.backdropPath} />
      <div className="absolute flex left-1/2 -translate-x-1/2 top-40 md:top-70 w-full max-w-7xl">
        <PosterImage title={tvshow.name} posterPath={tvshow.posterPath} />
        <div className="px-10 py-6 flex flex-col gap-4 font-inter">
          <p className="text-muted-foreground tracking-widest text-sm">{tvshow.status.toUpperCase()}</p>
          <h1 className="font-title text-6xl">{tvshow.name}</h1>
          {tvshow.tagline && <p className="italic text-amber text-xl">&quot;{tvshow.tagline}&quot;</p>}
          <div className="text-muted-foreground flex gap-4 items-center">
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
            {tvshow.genres.map((genre) => (
              <div key={genre.id} className="bg-background px-2 py-1 border rounded-full text-xs">
                {genre.name}
              </div>
            ))}
          </div>
          <p className="max-w-190 text-lg leading-relaxed text-mauve-200 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">{tvshow.overview}</p>
          <MediaDetailsActions homepage={tvshow.homepage} />
          <LastAiredEpisodeCard tvshow={tvshow} />
          <div className="flex gap-16 justify-between pt-4 items-start">
            <div className="flex flex-col gap-8">
              <CreatedBy createdBy={tvshow.createdBy} />
              <Cast cast={cast} />
            </div>
            <FactsCard facts={tvshow} mediaType="tv" />
          </div>
        </div>
      </div>
    </div>
  );
}
