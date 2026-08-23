export default function EpisodeAccordionContentSkeleton() {
  return (
    <div className="bg-surface border-l border-amber/50 flex gap-4 p-3 text-xs">
      <p className="w-8 h-4 bg-white/10 rounded animate-pulse shrink-0" />
      <div className="flex flex-col gap-1.5 py-1">
        <h1 className="w-36 h-4 bg-white/10 rounded animate-pulse" />
        <div className="flex flex-col gap-1.5">
          <span className="flex gap-4">
            <p className="w-28 h-3 bg-white/10 rounded animate-pulse" />
            <p className="w-14 h-3 bg-white/10 rounded animate-pulse" />
          </span>
          <p className="w-full max-w-lg h-3 bg-white/10 rounded animate-pulse" />
          <p className="w-3/4 max-w-md h-3 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}