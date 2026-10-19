import { getImage } from "@/app/shared/lib/helpers";
import { Media } from "@/app/types/media";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
  media: Media;
  mediaType: string;
}

export default function MediaCard({ media, mediaType }: MediaCardProps) {
  const firstGenre = media.genres !== null ? media.genres[0] : "";

  return (
    <div className="mediacard opacity-100 px-2 relative group cursor-pointer w-full h-full">
      {media.rating ?
        <span className="absolute right-4 top-2 bg-black/60 rounded-lg z-1000 px-2 py-1 text-xs font-bold text-amber flex items-center gap-1">
          <Star size={12} fill="#fab72a" stroke="#fab72a" />
          <p>{media.rating.toFixed(1)}</p>
        </span> : null}
      <Link href={`/${mediaType}/${media.id}`}>
        <div className="relative aspect-2/3 overflow-hidden rounded-lg">
          <Image
            src={getImage(media.posterPath, "w500")}
            alt={media.title}
            fill
            sizes="400px"
            className="rounded-lg transition-all duration-400 group-hover:scale-105 object-cover"
          ></Image>
        </div>
      </Link>
      <div className="pt-2">
        <h2 className="text-base font-semibold">{media.title}</h2>
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
