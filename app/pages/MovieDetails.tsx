"use client";
import { Movie } from "@/app/types/movie";
import { Clock, Star } from "lucide-react";
import CastCard from "../elements/Cards/CastCard";
import ProductionCard from "../elements/Cards/ProductionCard";
import FactsCard from "../elements/Cards/FactsCard";
import { PosterImage } from "@/app/shared/ui/PosterImage";
import { BackgroundImgMediaDetails } from "../elements/MediaDetails/BackgroundImgMediaDetails";
import MediaDetailsActions from "../elements/MediaDetails/MediaDetailsActions";
import Directors from "../elements/MediaDetails/Directors";
import Cast from "../elements/MediaDetails/Cast";

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  console.log(movie);
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const runtime = `${hours}h ${minutes}m`;
  const directors = movie.credits.crew.filter((item) => item.job === "Director");
  const casts = movie.credits.cast.slice(0, 6);

  return (
    <div className="relative min-h-fit">
      <BackgroundImgMediaDetails title={movie.title} backdropPath={movie.backdropPath} /> 
      <div className="absolute flex left-1/2 h-fit -translate-x-1/2 top-40 md:top-70 w-full max-w-7xl">
        {/*Image with back button*/}
        <PosterImage title={movie.title} posterPath={movie.posterPath} />
        {/*Information about movie*/}
        <div className="px-10 py-6 flex h-fit flex-col gap-5 font-inter">
          {/*Status/title/tagline*/}
          <p className="text-muted-foreground tracking-widest text-sm">{movie.status.toUpperCase()}</p>
          <h1 className="font-title text-6xl">{movie.title}</h1>
          {movie.tagline && <p className="italic text-amber text-xl">&quot;{movie.tagline}&quot;</p>}

          {/*Year/runtime/rating/ratingCount/genres*/}

          <div className="text-muted-foreground flex gap-2 items-center">
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
            {movie.genres.map((genre) => (
              <div key={genre.id} className="bg-background px-2 py-1 border rounded-full text-xs">
                {genre.name}
              </div>
            ))}
          </div>

          <p className="max-w-160 text-lg leading-relaxed text-mauve-200 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">{movie.overview}</p>
          <MediaDetailsActions homepage={movie.homepage} />

          <div className="flex flex-col gap-4 ">
            {/*Director*/}
            <Directors directors={directors} />

            <div className="flex gap-16 justify-between items-start">
              <div className="flex flex-col gap-8">
                {/*Cast*/}
                <Cast cast={casts} />
                {/*Production*/}
                <div className="flex flex-col gap-2.5">
                  <h2 className="uppercase text-muted-foreground/70 tracking-widest text-xs">Production</h2>
                  <div className="flex flex-wrap gap-3">
                    {movie.productionCompanies.map((production) => (
                      <ProductionCard production={production} key={production.id}></ProductionCard>
                    ))}
                  </div>
                </div>
              </div>
              <FactsCard facts={movie} mediaType="movie"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
