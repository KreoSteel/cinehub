import { Cast as CastType } from "@/app/types/movie"
import { AggregateCast } from "@/app/types/tvshow"
import CastCard from "../Cards/CastCard"

interface CastProps {
    cast: AggregateCast[] | CastType[]
}

export default function Cast({ cast }: CastProps) {
    return (
        <div className="flex flex-col gap-2.5">
            <h2 className="uppercase text-muted-foreground/70 tracking-wider text-xs">Cast</h2>
            <div className="grid grid-flow-col grid-rows-2 gap-y-4 gap-x-12 w-fit">
                {cast.map((item) => (
                    <CastCard cast={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}
