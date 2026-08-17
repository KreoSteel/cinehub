"use client";
import { Movie } from "@/app/types/movie";
import { Clock, Star } from "lucide-react";
import ProductionCard from "../elements/Cards/ProductionCard";
import FactsCard from "../elements/Cards/FactsCard";
import { PosterImage } from "@/app/shared/ui/PosterImage";
import { BackgroundImgMediaDetails } from "../elements/MediaDetails/BackgroundImgMediaDetails";
import MediaDetailsActions from "../elements/MediaDetails/MediaDetailsActions";
import Directors from "../elements/MediaDetails/Directors";
import Cast from "../elements/MediaDetails/Cast";
import { Genre } from "../types/media";
import MoreLikeThisMedia from "../elements/MediaDetails/MoreLikeThisMedia";
import { useQuery } from "@tanstack/react-query";
import { getSimilarMediaOptions } from "../entities/media/queryOptions/getSimilarMediaOptions";

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const runtime = `${hours}h ${minutes}m`;
  const directors = movie.credits.crew.filter((item) => item.job === "Director");
  const casts = movie.credits.cast.slice(0, 6);
  const { data: similarData, isPending } = useQuery(getSimilarMediaOptions(movie.id, "movie"));

  return (
    <div className="relative">
      <BackgroundImgMediaDetails title={movie.title} backdropPath={movie.backdropPath} />
      <div className="flex mx-auto pt-40 md:pt-65 w-full max-w-7xl">
        <PosterImage title={movie.title} posterPath={movie.posterPath} />
        <div className="px-10 py-6 flex flex-col gap-4 font-inter">
          <p className="text-muted-foreground tracking-widest text-sm text-shadow-sm">{movie.status.toUpperCase()}</p>
          <h1 className="font-title text-6xl text-shadow-lg">{movie.title}</h1>
          {movie.tagline && <p className="italic text-amber text-xl text-shadow-md">{"\u201C"}{movie.tagline}{"\u201D"}</p>}
          <div className="text-muted-foreground flex gap-4 items-center text-shadow-sm">
            <div className="flex gap-4">
              <p>{new Date(movie.releaseDate).getFullYear()}</p>
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                <p>{runtime}</p>
              </span>
            </div>
            <div className="flex items-center gap-2.5 mx-2">
              <span className="text-amber flex items-center gap-1.5">
                <Star fill="#FFB900" size={16} />
                <p className="font-bold ">{movie.rating.toFixed(1)}</p>
              </span>
              <p>({movie.ratingCount} votes)</p>
            </div>
            <Genres genres={movie.genres} />
          </div>
          <p className="max-w-190 text-lg leading-relaxed text-mauve-200 text-shadow-md">{movie.overview}</p>
          <MediaDetailsActions homepage={movie.homepage} />
          <div className="flex gap-16 justify-between pt-4 items-start">
            <div className="flex flex-col gap-8">
              <Directors directors={directors} />
              <Cast cast={casts} />
              <div className="flex flex-col gap-2.5">
                <h2 className="uppercase text-muted-foreground/70 tracking-widest text-xs">Production</h2>
                <div className="flex flex-wrap gap-3">
                  {movie.productionCompanies.map((production) => (
                    <ProductionCard production={production} key={production.id}></ProductionCard>
                  ))}
                </div>
              </div>
            </div>
            <FactsCard facts={movie} mediaType="movie" />
          </div>
        </div>
      </div>
      {isPending ? <p>Loading...</p> :
        <MoreLikeThisMedia mediaType="movie" media={similarData!} />
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