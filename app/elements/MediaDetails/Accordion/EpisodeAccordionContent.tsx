import { padNumberWithZero } from "@/app/shared/lib/helpers";
import { SeasonEpisode } from "@/app/types/tvshow";
import { Clock } from "lucide-react";
import { format } from "date-fns";

interface EpisodeAccordionContentProp {
  episode: SeasonEpisode;
}

export default function EpisodeAccordionContent({ episode }: EpisodeAccordionContentProp) {
  const { name, runtime, episodeNumber, airDate, overview } = episode
  const withHours = runtime !== null ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : null

  return (
    <div className="bg-surface border-b flex gap-4 p-3 text-xs">
      <p className="text-amber font-medium">{`E${padNumberWithZero(episodeNumber)}`}</p>
      <div>
        <h1 className="font-semibold tracking-wide pb-0.5">{name}</h1>
        <div>
          <div className="flex h-fit gap-4 p-0 text-muted-foreground/90">
            <p className="m-0">{format(airDate, "MMM d, yyyy")}</p>
            <p className="flex items-center h-fit gap-1">{runtime !== null ? <><Clock size={14} /> {runtime > 60 ? withHours : `${runtime}m`}</> : null}</p>
          </div>
          <p className="max-w-lg text-muted-foreground">{overview}</p>
        </div>
      </div>
    </div>
  )
}