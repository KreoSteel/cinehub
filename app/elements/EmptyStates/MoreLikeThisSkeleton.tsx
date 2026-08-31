export default function MoreLikeThisSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto pt-20 flex flex-col gap-6 pb-40">
      <h1 className="font-bold text-5xl tracking-wide font-title text-shadow-lg pl-2">More Like This</h1>

      {/* Media card row skeleton */}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <MediaCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function MediaCardSkeleton() {
  return (
    <div className="px-2 w-full shrink-0 basis-1/6">
      <div className="relative w-full aspect-2/3 rounded-lg bg-white/10 animate-pulse" />
      <div className="pt-2 flex flex-col gap-1.5">
        <span className="w-3/4 h-4 bg-white/10 rounded animate-pulse" />
        <span className="flex items-center gap-2">
          <span className="w-14 h-3 bg-white/10 rounded animate-pulse" />
          <span className="w-20 h-3 bg-white/10 rounded animate-pulse" />
        </span>
      </div>
    </div>
  );
}
