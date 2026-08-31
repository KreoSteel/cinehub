import { ProductionCompany } from "@/app/types/movie";

interface ProductionCardProps {
  production: ProductionCompany;
}

export default function ProductionCard({ production }: ProductionCardProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs bg-surface border border-border rounded-lg px-2.5 py-1.5">
      <h2 className="text-white/80 text-shadow-sm">{production.name}</h2>
      <p className="text-muted-foreground text-shadow-sm">•</p>
      <p className="text-muted-foreground text-shadow-sm">{production.originCountry}</p>
    </div>
  );
}
