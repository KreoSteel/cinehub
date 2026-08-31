import { CreatedBy as CreatedByType } from "@/app/types/tvshow"

interface CreatedByProps {
  createdBy: CreatedByType[]
}

export default function CreatedBy({ createdBy }: CreatedByProps) {
  return (
    createdBy.length > 0 ? <div className="flex flex-col gap-1">
      <h2 className="uppercase text-muted-foreground/70 tracking-widest text-xs text-shadow-sm">
        created by
      </h2>
      {createdBy.map((item) => (
        <p className="font-medium text-shadow-sm" key={item.id}>
          {item.name}
        </p>
      ))}
    </div> : null
  )
}
