export default function WatchlistEmptyState() {
  return (
    <div className="h-26 mx-6 md:w-full bg-surface/70 border-dashed rounded-lg border flex">
      <p className="px-4 m-auto text-xs md:text-sm text-muted-foreground">Your watchlist is empty - add a title to see it here.</p>
    </div>
  );
}
