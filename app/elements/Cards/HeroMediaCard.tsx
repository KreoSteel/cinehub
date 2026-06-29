import Image from "next/image";
import { Media } from "../../types";
import { Play, Plus, Star } from "lucide-react";
import Button from "../../shared/ui/Button";
import { titles, releaseDate, getImage } from "../../../lib/media-helpers";

interface HeroMediaProps {
  trendingMedia: Media;
}

export default function HeroMediaCard({ trendingMedia }: HeroMediaProps) {
  const genresToDisplay = trendingMedia.genres
    .map((genre) => genre.name)
    .slice(0, 2)
    .join(" • ");

  return (
    <div className="py-6">
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10 pointer-events-none"></div>

        <Image
          src={getImage(trendingMedia.backdrop_path, "original") || ""}
          width={1920}
          height={1080}
          alt=""
          loading="eager"
          className="rounded-sm"
        />
        <div className="absolute inset-be-10 left-10 z-10 font-inter">
          <div className="flex gap-2 pb-3">
            <div className="py-1 px-2 w-fit rounded-md font-bold text-xs bg-amber text-black">TRENDING</div>
            <p className="text-muted-foreground pl-2">{releaseDate(trendingMedia)}</p>
            <span className="flex items-center gap-1.5">
              <Star size={16} fill="#fab72a" stroke="#fab72a" />
              <p className="text-amber font-bold">{trendingMedia.vote_average.toFixed(1)}</p>
              <span className="text-muted-foreground px-2">
                <p>{genresToDisplay}</p>
              </span>
            </span>
          </div>
          <h1 className="font-title text-8xl">{titles(trendingMedia)}</h1>
          <p className="font-inter text-muted-foreground">{trendingMedia.overview}</p>
          <div className="flex gap-4 pt-5">
            <Button
              className="transition-all text-black bg-white hover:bg-amber"
              Icon={Plus}
              text={"Watchlist"}
            ></Button>
            <Button
              className="text-white bg-surface-2 border border-white/20 hover:bg-white/15"
              Icon={Play}
              text={"View Details"}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
