import { Media } from "@/app/types/media";
import SearchSuggestionCard from "./SearchSuggestionCard";

interface SearchSuggestionsMenuProps {
  media: Media[];
  isPending?: boolean;
  query?: string | null;
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 rounded-lg p-2">
      <div className="h-15 w-10 shrink-0 animate-pulse rounded-md bg-white/10" />
      <div className="flex min-w-0 flex-col gap-2">
        <div className="h-3 w-36 animate-pulse rounded bg-white/10" />
        <div className="h-2.5 w-20 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}

export default function SearchSuggestionsMenu({ media, isPending, query }: SearchSuggestionsMenuProps) {
  if (isPending) {
    return (
      <div className="absolute top-12 right-0 z-50 w-96 rounded-xl border border-white/10 bg-surface/95 p-2 shadow-xl shadow-black/40 backdrop-blur-md">
        <div className="flex max-h-96 flex-col gap-1 overflow-y-auto">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </div >
    );
  }

  if (!media.length) {
    if (!query) return null;
    return (
      <div className="absolute top-12 right-0 z-50 w-96 rounded-xl border border-white/10 bg-surface/95 p-2 shadow-xl shadow-black/40 backdrop-blur-md">
        <p className="p-4 text-center text-sm text-muted-foreground">No results for “{query}”</p>
      </div>
    );
  }

  return (
    <div className="absolute top-12 right-0 z-50 w-96 rounded-xl border border-white/10 bg-surface/95 p-2 shadow-xl shadow-black/40 backdrop-blur-md">
      <div className="flex max-h-96 flex-col gap-1 overflow-y-auto">
        {media.map((item) => (
          <SearchSuggestionCard key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
}