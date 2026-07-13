import { Media } from "@/app/types/media";
import { getImage } from "@/lib/media-helpers";
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
    <div className="px-2 relative group cursor-pointer w-full h-full">
      <span className="absolute right-4 top-2 bg-black/60 rounded-full z-1000 px-2 py-1 text-xs font-bold text-amber flex items-center gap-1">
        <Star size={12} fill="#fab72a" stroke="#fab72a" />
        <p>{media.rating ? media.rating.toFixed(1) : 0.0}</p>
      </span>
      <div className="relative w-full aspect-2/3 overflow-hidden rounded-xl">
        <Link href={`/${mediaType}/${media.id}`}>
          <Image
            src={getImage(media.posterPath, "w500") || "undefined"}
            alt=""
            width={200}
            height={200}
            className="rounded-xl transition-all duration-400 group-hover:scale-105 object-cover"
          ></Image>
        </Link>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-80% pointer-events-none"></div>
        <p className="font-title text-lg absolute bottom-1 left-3">{media.title}</p>
      </div>
      <div className="pt-2">
        <h2 className="text-base font-semibold">{media.title}</h2>
        <div className="text-muted-foreground flex">
          <p>{media.releaseDate}</p>
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
