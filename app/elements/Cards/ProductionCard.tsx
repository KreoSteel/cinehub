import { ProductionCompany } from "@/app/types/movie";

interface ProductionCardProps {
  production: ProductionCompany;
}

export default function ProductionCard({ production }: ProductionCardProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs bg-surface border border-border rounded-xl px-2.5 py-1.5">
      <h2 className="text-white/80 ">{production.name}</h2>
      <p className="text-muted-foreground">•</p>
      <p className="text-muted-foreground">{production.originCountry}</p>
    </div>
  );
}
