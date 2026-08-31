import { Crew } from "@/app/types/movie"
import { AggregateCrew } from "@/app/types/tvshow"

interface DirectorsProps {
    directors: AggregateCrew[] | Crew[]
}

export default function Directors({ directors }: DirectorsProps) {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="uppercase text-muted-foreground/70 tracking-widest text-xs text-shadow-sm">
                {directors.length > 1 ? "Directors" : "Director"}
            </h2>
            {directors.map((item) => (
                <p className="font-medium text-shadow-sm" key={item.id}>
                    {item.name}
                </p>
            ))}
        </div>
    )
}
