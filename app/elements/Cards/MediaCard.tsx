import { getImage, releaseDate, titles } from "@/lib/media-helpers";
import { Media } from "@/app/types";
import { Star } from "lucide-react";
import Image from "next/image";

interface MediaCardProps {
  media: Media;
}

export default function MediaCard({ media }: MediaCardProps) {
  const genre = media.genres.find((genre) => genre);
  if (!genre) throw new Error("Genre is not found, try reload the page");
  return (
    <div className="px-2 relative">
      <span className="absolute right-4 top-2 bg-black/60 rounded-full px-2 py-1 text-xs font-bold text-amber flex items-center gap-1">
        <Star size={12} fill="#fab72a" stroke="#fab72a" />
        <p>{media.vote_average.toFixed(1)}</p>
      </span>
      <div className="relative">
        <Image
          src={getImage(media.poster_path, "w500") || "undefined"}
          alt=""
          width={200}
          height={200}
          className="rounded-xl"
        ></Image>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-80% pointer-events-none"></div>
        <p className="font-title text-lg absolute bottom-1 left-3">{titles(media)}</p>
      </div>
      <div className="pt-2">
        <h2 className="text-base font-semibold">{titles(media)}</h2>
        <div className="text-muted-foreground flex">
          <p>{releaseDate(media)}</p>
          <p className="px-1">•</p>
          <p>{genre.name}</p>
        </div>
      </div>
    </div>
  );
}
