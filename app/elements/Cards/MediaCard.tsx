import { Media } from "@/app/types/media";
import { getImage } from "@/app/shared/lib/helpers";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
  media: Media;
  mediaType: string;  
}

export default function MediaCard({ media, mediaType }: MediaCardProps) {
  const firstGenre = media.genres !== null ? media.genres.find((genre) => genre) : "";

  return (
    <div className="mediacard opacity-0 translate-y-30 px-2 relative group cursor-pointer w-full h-full">
      {media.rating ?
        <span className="absolute right-4 top-2 bg-black/60 rounded-lg z-1000 px-2 py-1 text-xs font-bold text-amber flex items-center gap-1">
          <Star size={12} fill="#fab72a" stroke="#fab72a" />
          <p>{media.rating.toFixed(1)}</p>
        </span> : null}
      <div className="relative w-full aspect-2/3 overflow-hidden rounded-lg">
        <Link href={`/${mediaType}/${media.id}`}>
          <Image
            src={getImage(media.posterPath, "w500") || ""}
            alt=""
            width={200}
            height={200}
            className="rounded-lg transition-all duration-400 group-hover:scale-105 object-cover"
          ></Image>
        </Link>
      </div>
      <div className="pt-2">
        <h2 className="text-base font-s It w.map((item) => item.vote_average >= 6.5 && item)
        .filter((item) => item !== false);orks, but server actions are the wrong tool for querying:emibold">{media.title}</h2>
        <div className="text-muted-foreground flex">
          {media.releaseDate ? <p>{media.releaseDate}</p> : null}
          {firstGenre && (
            <>
              <p className="px-1">•</p>
              <p>{firstGenre.name}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
