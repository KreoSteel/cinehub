export default function WatchlistEmptyState() {
  return (
    <div className="h-26 w-full bg-surface/70 border-dashed rounded-2xl border flex">
      <p className="m-auto text-muted-foreground">Your watchlist is empty - add a title to see it here.</p>
    </div>
  );
}
