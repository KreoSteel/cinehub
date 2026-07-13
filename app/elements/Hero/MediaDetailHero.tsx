"use client";
import Button from "@/app/shared/ui/Button";
import { Movie } from "@/app/types/movie";
import { getImage } from "@/lib/media-helpers";
import { ArrowLeft, Clock, Globe, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CastCard from "../Cards/CastCard";
import ProductionCard from "../Cards/ProductionCard";

interface MediaDetailHeroProps {
  media: Movie;
}

export default function MediaDetailHero({ media }: MediaDetailHeroProps) {
  const bgImageURL = getImage(media.backdropPath, "original");
  const posterImage = getImage(media.posterPath, "original");

  const router = useRouter();
  if (bgImageURL === null) throw new Error("MediaDetailHero: bgImageURL is null");
  if (posterImage === null) throw new Error("MediaDetailHero: posterImage is null");

  // if (mediaType === "tv") to display tv shows details
  console.log(media);
  const hours = Math.floor(media.runtime / 60);
  const minutes = media.runtime % 60;
  const runtime = `${hours}h ${minutes}m`;
  const directors = media.credits.crew.filter((item) => item.job === "Director");
  const casts = media.credits.cast.slice(0, 8);
  const productions = media.productionCompanies;

  return (
    <div className="relative">
      {/*Background image*/}
      <div className="w-full min-h-screen relative">
        <Image src={bgImageURL} width={9999} height={0} alt={media.title} className="-z-100"></Image>
        <div className="absolute inset-0 w-full h-full bg-linear-to-t from-black via-black via-60% to-black/50 to-80%"></div>
      </div>
      <div className="absolute flex justify-self-center top-40 md:top-70 min-w-7xl h-full">
        {/*Image with back button*/}
        <div className="flex flex-col gap-5">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-foreground/60">
            <ArrowLeft strokeWidth={1.5} size={20} /> Back
          </button>
          <Image
            src={posterImage}
            width={260}
            height={300}
            alt={media.title}
            className="rounded-2xl border border-muted-foreground/30"
          ></Image>
        </div>
        {/*Information about media*/}
        <div className="p-10 flex flex-col gap-3 font-inter">
          {/*Status/title/tagline*/}

          <p className="text-muted-foreground tracking-widest text-sm">{media.status.toUpperCase()}</p>
          <h1 className="font-title text-6xl">{media.title}</h1>
          <p className="italic text-amber text-xl">&quot;{media.tagline}&quot;</p>

          {/*Year/runtime/rating/ratingCount/genres*/}

          <div className="text-muted-foreground flex gap-2 items-center">
            <div className="flex gap-4">
              <p>{new Date(media.releaseDate).getFullYear()}</p>
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                <p>{runtime}</p>
              </span>
            </div>
            <div className="flex items-center gap-2.5 mx-2">
              <span className="text-amber flex items-center gap-1.5">
                <Star fill="#FFB900" size={16} />
                <p className="font-bold ">{media.rating.toFixed(1)}</p>
              </span>
              <p>({media.ratingCount} votes)</p>
            </div>
            {media.genres.map((genre) => (
              <div key={genre.id} className="bg-background px-2 py-1 border rounded-full text-xs">
                {genre.name}
              </div>
            ))}
          </div>

          {/*Overview*/}

          <h2 className="max-w-200 text-lg text-mauve-300">{media.overview}</h2>

          {/*Actions*/}

          <div className="flex items-center gap-4">
            <Button
              className="transition-all text-black bg-white hover:bg-amber text-sm"
              Icon={<Plus size={18} />}
              text={"Watchlist"}
            ></Button>
            <Button className="text-white bg-surface-2 border border-white/20 hover:bg-white/15 text-sm" text={"Mark as watched"}></Button>
            <Link href={media.homepage}>
              <Button
                className="text-white border border-white/20 hover:bg-white/10 text-sm"
                Icon={<Globe size={18} />}
                text={"Website"}
              ></Button>
            </Link>
          </div>

          {/*Cast/crew*/}
          {/*Director*/}
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-1">
              <h2 className="uppercase text-muted-foreground/70 tracking-widest text-xs">
                {directors.length < 1 ? "Directors" : "Director"}
              </h2>
              {directors.map((item) => (
                <p className="font-medium" key={item.id}>
                  {item.name}
                </p>
              ))}
            </div>

            {/*Cast*/}

            <div className="flex flex-col gap-1.5">
              <h2 className="uppercase text-muted-foreground/70 tracking-wider text-xs">Cast</h2>
              <div className="grid grid-flow-col grid-rows-2 gap-4">
                {casts.map((item) => (
                  <CastCard cast={item} key={item.id}></CastCard>
                ))}
              </div>
            </div>

            {/*Production*/}

            <div className="flex flex-col gap-1.5">
              <h2 className="uppercase text-muted-foreground/70 tracking-widest text-xs">Production</h2>
              <div className="flex gap-3">
                {productions.map((production) => (
                  <ProductionCard production={production} key={production.id}></ProductionCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
