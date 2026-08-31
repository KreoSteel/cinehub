import { getImage } from "@/app/shared/lib/helpers";
import { Media } from "@/app/types/media";
import { Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchSuggestionCardProps {
  media: Media;
}

export default function SearchSuggestionCard({ media }: SearchSuggestionCardProps) {
  const isSeries = media.mediaType === "tv";
  const displayMediaType = isSeries ? "SERIES" : "MOVIE";
  const poster = getImage(media.posterPath, "w92");
  const firstGenre = media.genres !== null ? media.genres.find((genre) => genre) : null;

  return (
    <Link
      href={`/${media.mediaType}/${media.id}`}
      className="flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
    >
      <div className="relative h-15 w-10 shrink-0 overflow-hidden rounded-md bg-surface-2">
        {poster ? (
          <Image src={poster} alt={media.title} fill sizes="40px" className="object-cover" />
        ) : (
          <Film className="absolute inset-0 m-auto text-muted-foreground/50" size={16} />
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="truncate text-sm font-medium text-foreground">{media.title}</h2>
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <span className={`shrink-0 text-[10px] font-bold tracking-widest ${isSeries ? "text-sky-400" : "text-amber"}`}>
            {displayMediaType}
          </span>
          {media.releaseDate ? (
            <>
              <span>•</span>
              <p className="shrink-0">{media.releaseDate}</p>
            </>
          ) : null}
          {firstGenre && (
            <>
              <span>•</span>
              <p className="truncate">{firstGenre.name}</p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
