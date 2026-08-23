'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/shared/shadcn-ui/accordion";
import { format } from "date-fns";
import { Season } from "@/app/types/tvshow";
import { useQuery } from "@tanstack/react-query";
import { getSeasonDetailsOptions } from "@/app/entities/media/queryOptions/getSeasonDetailsOptions";
import { useState } from "react";
import { padNumberWithZero } from "@/app/shared/lib/helpers";
import EpisodeAccordionContentSkeleton from "../../Skeletons/EpisodeAccordionContentSkeleton";
import EpisodeAccordionContent from "./EpisodeAccordionContent";

interface SeasonsAccordionListProps {
  seasons: Season[];
  tvShowID: number;
  seasonsCount: number;
  totalEpisodesCount: number;
}

export default function SeasonsAccordion({ seasons, tvShowID, seasonsCount, totalEpisodesCount }: SeasonsAccordionListProps) {
  const [seasonNumber, setSeasonNumber] = useState<number | null>(null);
  const { data, isPending } = useQuery(getSeasonDetailsOptions(tvShowID, seasonNumber, seasonNumber !== null))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between  text-muted-foreground/70 tracking-wider text-xs">
        <h2 className="uppercase">SEASONS</h2>
        <p>{seasonsCount} seasons · {totalEpisodesCount} episodes</p>
      </div>
      <Accordion onValueChange={(value: number[]) => {
        setSeasonNumber(value[0] ?? null);
      }} className="border rounded-lg min-w-xl">
        {seasons && seasons.map((season, index) => {
          const { id, airDate, episodeCount, name } = season
          const isFirst = index === 0;
          const isLast = index === seasons.length - 1;
          const hoverRadius = isFirst ? "rounded-t-lg rounded-b-none" : isLast ? "rounded-b-lg rounded-t-none" : "rounded-none";

          return (
            <AccordionItem className="border-b border-border last:border-b-0" key={id} value={season.seasonNumber}>
              <AccordionTrigger className={`bg-surface flex gap-4 items-center hover:no-underline px-5 pl-10 hover:bg-surface ${hoverRadius}`}>
                <h1 className="text-2xl font-bald font-title text-amber">{padNumberWithZero(season.seasonNumber)}</h1>
                <div className="flex flex-col gap-1">
                  <h2>{name}</h2>
                  <div className="flex gap-2 text-muted-foreground text-xs">
                    <p>{episodeCount} episodes</p>
                    <p>{format(airDate, "MMM dd, yyyy")}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-l border-amber/50">
                {seasonNumber === season.seasonNumber &&
                  (isPending ?
                    <div className="flex flex-col">
                      <EpisodeAccordionContentSkeleton></EpisodeAccordionContentSkeleton>
                      <EpisodeAccordionContentSkeleton></EpisodeAccordionContentSkeleton>
                      <EpisodeAccordionContentSkeleton></EpisodeAccordionContentSkeleton>
                    </div> :
                    data!.episodes.map(episode => (<EpisodeAccordionContent key={episode.id} episode={episode} />)))}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div >
  )
}

