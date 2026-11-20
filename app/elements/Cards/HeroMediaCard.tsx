"use client"
import Image from "next/image";
import { Eye, Plus, Star } from "lucide-react";
import Button from "../../shared/ui/Button";
import { getImage } from "../../shared/lib/helpers";
import Link from "next/link";
import { Media } from "@/app/types/media";

interface HeroMediaProps {
  trendingMedia: Media;
}

export default function HeroMediaCard({ trendingMedia }: HeroMediaProps) {
  const genre = trendingMedia.genres && trendingMedia.genres
    .find((genre) => genre.name);

  return (
    <div className="relative min-h-100 md:min-h-160">
      <div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10 pointer-events-none z-10"></div>
        <Image
          className="object-cover"
          src={getImage(trendingMedia.backdropPath, "w1280")}
          fill
          sizes="(max-width: 768px) 600px"
          alt={trendingMedia.title}
          loading="eager"
        />
        <div className="absolute flex flex-col inset-be-10 left-8 md:left-12 z-100 font-inter">
          <div className="flex gap-3 pb-4">
            <p className="py-1 px-2 w-fit rounded-lg font-bold text-xs bg-amber text-black">TRENDING</p>
            <p className="text-muted-foreground text-shadow-sm">{trendingMedia.releaseDate}</p>
            <span className="text-sm md:text-base flex items-center gap-1.5">
              <Star size={16} fill="#fab72a" stroke="#fab72a" />
              <p className="text-amber font-bold">{trendingMedia.rating.toFixed(1)}</p>
              <span className="text-muted-foreground grow px-2 text-shadow-sm">
                <p>{genre?.name ?? ""}</p>
              </span>
            </span>
          </div>
          <h1 className="font-title text-5xl md:text-7xl">{trendingMedia.title}</h1>
          <p className="font-inter text-muted-foreground max-w-80 md:max-w-200 text-sm md:text-base text-shadow-sm line-clamp-2">{trendingMedia.overview}</p>
          <div className="flex gap-3 pt-4">
            <Link href={`/${trendingMedia.mediaType}/${trendingMedia.id}`}>
              <Button
                className="transition-all md:scale-100 duration-250 text-black/90 bg-white shadow-white/30 shadow-md hover:shadow-amber/30 hover:shadow-lg hover:bg-amber">
                <Eye />
                <p>View Details</p>
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button
                className="text-white hidden md:inline-flex transition-all duration-250 shadow-surface-2 shadow-md hover:shadow-surface-2 hover:shadow-lg bg-surface-2 border border-white/10 hover:bg-white/15">
                <Plus />
                Add to Watchlist
              </Button>
              <Button
                className="text-white md:hidden transition-all duration-250 shadow-surface-2 shadow-md hover:shadow-surface-2 hover:shadow-lg bg-surface-2 border border-white/10 hover:bg-white/15" >
                <Plus />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
}
