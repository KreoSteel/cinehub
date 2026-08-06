import { TVShow } from "@/app/types/tvshow";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

interface LastAiredEpisodeCardProps {
  tvshow: TVShow;
}

export default function LastAiredEpisodeCard({ tvshow }: LastAiredEpisodeCardProps) {
  const lastEpToAir = tvshow.lastEpisodeToAir;
  if (lastEpToAir === null) return;
  return (
    <div className="bg-surface w-fit max-w-xl border border-border rounded-2xl px-6 py-5 mt-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Calendar size={14} />
          <h3 className="tracking-wider text-xs text-muted-foreground uppercase">last aired episode</h3>
        </div>
        <h1 className="font-medium text-lg">{`S${tvshow.numberOfSeasons} • E${lastEpToAir.episodeNumber} - ${lastEpToAir.name}`}</h1>
        <div className="flex gap-4 text-muted-foreground text-sm">
          <p>{format(lastEpToAir.airDate, "MMM d, yyyy")}</p>
          <div className="flex gap-1.5 items-center">
            <Clock size={16} />
            <p>{`${lastEpToAir.runtime}m`}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-white/80 max-w-160">{lastEpToAir.overview}</p>
      </div>
    </div>
  );
}
