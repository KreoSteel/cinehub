import { Cast } from "@/app/types/movie";
import { getImage } from "@/app/shared/lib/helpers";
import Image from "next/image";
import { AggregateCast } from "@/app/types/tvshow";

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
          <h2 className="text-sm font-medium">{cast.name}</h2>
          <p className="text-xs text-muted-foreground">{role.character}</p>
        </div>
      </div>
    )
  } else
    return (
      <div className="flex gap-2 items-center">
        <Image src={castImg} width={50} height={0} alt={cast.name} className="rounded-lg object-contain"></Image>
        <div className="w-40">
          <h2 className="text-sm font-medium">{cast.name}</h2>
          <p className="text-xs text-muted-foreground">{cast.character}</p>
        </div>
      </div>
    );
}
