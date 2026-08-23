export default function MediaDetailsPageSkeleton() {
  return (
    <div className="relative">
      <div className="flex mx-auto pt-40 md:pt-65 w-full max-w-7xl">
        {/* Poster skeleton */}
        <div className="flex flex-col gap-5">
          <span className="w-16 h-5 bg-white/10 rounded animate-pulse" />
          <div className="w-67 h-75 bg-white/10 rounded-lg animate-pulse" />
        </div>

        {/* Info column skeleton */}
        <div className="px-10 py-6 flex flex-col gap-4 w-full">
          <span className="w-24 h-4 bg-white/10 rounded animate-pulse" />
          <span className="w-2/3 max-w-xl h-14 bg-white/10 rounded animate-pulse" />
          <span className="w-1/3 h-5 bg-white/10 rounded animate-pulse" />

          {/* Metadata row */}
          <div className="flex gap-4 items-center">
            <span className="w-14 h-4 bg-white/10 rounded animate-pulse" />
            <span className="w-20 h-4 bg-white/10 rounded animate-pulse" />
            <span className="w-16 h-4 bg-white/10 rounded animate-pulse" />
            <span className="w-24 h-4 bg-white/10 rounded animate-pulse" />
            <span className="w-20 h-6 bg-white/10 rounded-lg animate-pulse" />
            <span className="w-24 h-6 bg-white/10 rounded-lg animate-pulse" />
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-2 max-w-190">
            <span className="w-full h-4 bg-white/10 rounded animate-pulse" />
            <span className="w-11/12 h-4 bg-white/10 rounded animate-pulse" />
            <span className="w-2/3 h-4 bg-white/10 rounded animate-pulse" />
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-2">
            <span className="w-40 h-11 bg-white/10 rounded-lg animate-pulse" />
            <span className="w-44 h-11 bg-white/10 rounded-lg animate-pulse" />
            <span className="w-32 h-11 bg-white/10 rounded-lg animate-pulse" />
          </div>

          {/* Two-column section: details + facts */}
          <div className="flex gap-16 justify-between pt-4 items-start">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="w-20 h-3 bg-white/10 rounded animate-pulse" />
                <span className="w-40 h-4 bg-white/10 rounded animate-pulse" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="w-12 h-3 bg-white/10 rounded animate-pulse" />
                <div className="grid grid-flow-col grid-rows-2 gap-y-4 gap-x-12 w-fit">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="w-12 h-12 bg-white/10 rounded-lg animate-pulse" />
                      <div className="flex flex-col gap-1">
                        <span className="w-28 h-3.5 bg-white/10 rounded animate-pulse" />
                        <span className="w-20 h-3 bg-white/10 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="w-24 h-3 bg-white/10 rounded animate-pulse" />
                <div className="flex flex-wrap gap-3">
                  <span className="w-36 h-8 bg-white/10 rounded-xl animate-pulse" />
                  <span className="w-28 h-8 bg-white/10 rounded-xl animate-pulse" />
                  <span className="w-32 h-8 bg-white/10 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>

            {/* Facts card skeleton */}
            <div className="bg-surface w-1/3 h-fit py-5 px-6 shrink-0 border border-border rounded-lg flex flex-col gap-5">
              <span className="w-14 h-4 bg-white/10 rounded animate-pulse" />
              <div className="flex flex-col gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="w-24 h-3 bg-white/10 rounded animate-pulse" />
                    <span className="w-40 h-4 bg-white/10 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}