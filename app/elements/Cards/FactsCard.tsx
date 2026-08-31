"use client";
import { displayNames, formatCurrency } from "@/app/shared/lib/helpers";
import { Movie } from "@/app/types/movie";
import { TVShow } from "@/app/types/tvshow";
import { format } from "date-fns";

interface FactsCardProps {
  facts: Movie | TVShow;
  mediaType: "tv" | "movie"
}

export default function FactsCard({ facts, mediaType }: FactsCardProps) {

  if (mediaType === "tv") {
    const tvFacts = facts as TVShow
    const firstAired = format(tvFacts.firstAirDate, "MMM dd, yyyy");
    const lastAired = format(tvFacts.lastAirDate, "MMM dd, yyyy");
    const inProduction = tvFacts.inProduction === true ? "Yes" : "No"
    const spokenLanguages = tvFacts.spokenLanguages.map((item) => item.name).join(", ");
    const productionCountries = tvFacts.productionCountries.map((item) => item.name).join(", ");

    return (
      <div className="bg-surface w-1/3 h-fit py-5 px-6 text-sm shrink-0 border border-border rounded-lg flex flex-col gap-5">
        <div className="text-amber font-medium tracking-wide">
          <h1>FACTS</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">status</p>
            <h2 className="font-medium">{tvFacts.status}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">first aired</p>
            <h2 className="font-medium">{firstAired}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">last aired</p>
            <h2 className="font-medium">{lastAired}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">in production</p>
            <h2 className="font-medium">{inProduction}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">original language</p>
            <h2 className="font-medium">{displayNames.of(tvFacts.originalLanguage)}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">spoken languages</p>
            <div>
              <h2 className="font-medium">{spokenLanguages}</h2>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">country</p>
            <h2 className="font-medium">{productionCountries}</h2>
          </div>
        </div>
      </div>
    );
  } else {
    const movieFacts = facts as Movie
    const formatedDate = format(movieFacts.releaseDate, "MMM dd, yyyy");
    const spokenLanguages = movieFacts.spokenLanguages.map((item) => item.name).join(", ");
    const productionCountries = movieFacts.productionCountries.map((item) => item.name).join(", ");
    return (
      <div className="bg-surface w-1/3 h-fit py-5 px-6 text-sm shrink-0 border border-border rounded-lg flex flex-col gap-5">
        <div className="text-amber font-medium tracking-wide">
          <h1>FACTS</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">status</p>
            <h2 className="font-medium">{movieFacts.status}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">release date</p>
            <h2 className="font-medium">{formatedDate}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">budget</p>
            <h2 className="font-medium">{formatCurrency(movieFacts.budget)}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">revenue</p>
            <h2 className="font-medium">{formatCurrency(movieFacts.revenue)}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">original language</p>
            <h2 className="font-medium">{displayNames.of(movieFacts.originalLanguage)}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">spoken languages</p>
            <div>
              <h2 className="font-medium">{spokenLanguages}</h2>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="uppercase text-muted-foreground/70 tracking-wide text-xs">country</p>
            <h2 className="font-medium">{productionCountries}</h2>
          </div>
        </div>
      </div>
    );
  }
}
