export default function DiscoverPageSkeleton() {
  return (
    <div className="pt-6 max-w-7xl m-auto">
      {/* Hero skeleton */}
      <div className="relative rounded-lg overflow-hidden aspect-video bg-white/5">
        <div className="absolute bottom-10 left-10 z-10 flex flex-col gap-3 w-full max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="w-24 h-6 bg-white/10 rounded-lg animate-pulse" />
            <span className="w-16 h-4 bg-white/10 rounded animate-pulse" />
            <span className="w-28 h-4 bg-white/10 rounded animate-pulse" />
          </div>
          <span className="w-full max-w-xl h-16 bg-white/10 rounded animate-pulse" />
          <div className="flex flex-col gap-2 pt-1">
            <span className="w-full h-3 bg-white/10 rounded animate-pulse" />
            <span className="w-11/12 h-3 bg-white/10 rounded animate-pulse" />
            <span className="w-2/3 h-3 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="flex gap-4 pt-3">
            <span className="w-32 h-11 bg-white/10 rounded-lg animate-pulse" />
            <span className="w-36 h-11 bg-white/10 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-6 py-6 border-b border-white/10">
        <span className="w-32 h-5 bg-white/10 rounded animate-pulse" />
        <span className="w-28 h-5 bg-white/10 rounded animate-pulse" />
        <span className="w-36 h-5 bg-white/10 rounded animate-pulse" />
      </div>

      {/* Section header skeleton ("Trending this week" + "View all") */}
      <div className="flex items-center justify-between pt-6 pb-4">
        <span className="w-48 h-7 bg-white/10 rounded animate-pulse" />
        <span className="w-16 h-4 bg-white/10 rounded animate-pulse" />
      </div>

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