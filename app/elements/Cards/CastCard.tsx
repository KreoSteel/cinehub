import { getImage } from "@/app/shared/lib/helpers";
import { Cast } from "@/app/types/movie";
import { AggregateCast } from "@/app/types/tvshow";
import Image from "next/image";

interface CastCardProps {
  cast: Cast | AggregateCast;
}

export default function CastCard({ cast }: CastCardProps) {
  const castImg = getImage(cast.profilePath, "original");
  if (castImg === null) return null;

  if ("totalEpisodeCount" in cast) {
    const role = cast.roles.find(item => item);
    if (role === undefined) return;
    return (
      <div className="flex gap-2 items-center">
        <Image src={castImg} width={50} height={0} alt={cast.name} className="rounded-lg object-contain"></Image>
        <div className="w-40">
          <h2 className="text-sm font-medium text-shadow-sm">{cast.name}</h2>
          <p className="text-xs text-muted-foreground text-shadow-sm">{role.character}</p>
        </div>
      </div>
    )
  } else
    return (
      <div className="flex gap-2 items-center">
        <Image src={castImg} width={50} height={0} alt={cast.name} className="rounded-lg object-contain"></Image>
        <div className="w-40">
          <h2 className="text-sm font-medium text-shadow-sm">{cast.name}</h2>
          <p className="text-xs text-muted-foreground text-shadow-sm">{cast.character}</p>
        </div>
      </div>
    );
}
