import { Cast } from "@/app/types/movie";
import { getImage } from "@/lib/media-helpers";
import Image from "next/image";

interface CastCardProps {
  cast: Cast;
}

export default function CastCard({ cast }: CastCardProps) {
  return (
    <div className="flex gap-2 items-center">
        <Image
          src={getImage(cast.profilePath, "original")}
          width={50}
          height={0}
          alt={cast.name}
          className="rounded-lg object-contain"
        ></Image>
      <div>
        <h2 className="text-sm font-medium">{cast.name}</h2>
        <p className="text-xs text-muted-foreground">{cast.character}</p>
      </div>
    </div>
  );
}
