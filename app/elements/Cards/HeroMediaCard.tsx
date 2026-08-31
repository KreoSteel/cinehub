import Image from "next/image";
import { Eye, Play, Plus, Star } from "lucide-react";
import Button from "../../shared/ui/Button";
import { getImage } from "../../shared/lib/helpers";
import Link from "next/link";
import { Media } from "@/app/types/media";

interface HeroMediaProps {
  trendingMedia: Media;
}

export default function HeroMediaCard({ trendingMedia }: HeroMediaProps) {
  const genresToDisplay =
    trendingMedia.genres &&
    trendingMedia.genres
      .map((genre) => genre.name)
      .slice(0, 2)
      .join(" • ");

  return (
    <div className="relative">
      <div className="rounded-lg">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10 pointer-events-none z-10"></div>
        <Image
          src={getImage(trendingMedia.backdropPath, "original") || ""}
          width={1920}
          height={1080}
          alt={trendingMedia.title}
          loading="eager"
        />
        <div className="absolute inset-be-10 left-10 z-100 font-inter">
          <div className="flex gap-2 pb-3">
            <div className="py-1 px-2 w-fit rounded-lg font-bold text-xs bg-amber text-black">TRENDING</div>
            <p className="text-muted-foreground pl-2">{trendingMedia.releaseDate}</p>
            <span className="flex items-center gap-1.5">
              <Star size={16} fill="#fab72a" stroke="#fab72a" />
              <p className="text-amber font-bold">{trendingMedia.rating.toFixed(1)}</p>
              <span className="text-muted-foreground px-2">
                <p>{genresToDisplay || ""}</p>
              </span>
            </span>
          </div>
          <h1 className="font-title text-8xl">{trendingMedia.title}</h1>
          <p className="font-inter text-muted-foreground">{trendingMedia.overview}</p>
          <div className="flex gap-4 pt-5">
            <Link href={`${trendingMedia.mediaType}/${trendingMedia.id}`}>
              <Button
                className="transition-all duration-250 text-black/90 bg-white shadow-white/30 shadow-md hover:shadow-amber/30 hover:shadow-lg hover:bg-amber"
                Icon={<Eye />}
                text={"View Details"}
              ></Button>
            </Link>
            <Button
              className="text-white transition-all duration-250 shadow-surface-2 shadow-md hover:shadow-surface-2 hover:shadow-lg bg-surface-2 border border-white/10 hover:bg-white/15"
              Icon={<Plus />}
              text={"Add to Watchlist"}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
