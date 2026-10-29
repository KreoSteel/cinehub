import { Card, CardDescription, CardHeader, CardTitle } from "@/app/shared/shadcn-ui/card";
import { Bookmark, Compass, Film, Tv } from "lucide-react";
import Link from "next/link";

export default function MobileNavCards() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 px-4 pt-4">
      <Card className="gap-0 pl-4 bg-surface-2 active:ring-amber active:bg-amber/20">
        <Link href={"/"}>
          <CardHeader className="mr-auto px-0 pb-2 text-amber">
            <Compass />
          </CardHeader>
          <CardTitle>
            Discover
          </CardTitle>
          <CardDescription>
            Trending and picks
          </CardDescription>
        </Link>
      </Card>
      <Card className="gap-0 pl-4 bg-surface-2 active:ring-amber active:bg-amber/20">
        <Link href={"/movies"}>
          <CardHeader className="mr-auto px-0 pb-2 text-amber">
            <Film />
          </CardHeader>
          <CardTitle>
            Movies
          </CardTitle>
          <CardDescription>
            Popular, top rated
          </CardDescription>
        </Link>
      </Card>
      <Card className="gap-0 pl-4 bg-surface-2 active:ring-amber active:bg-amber/20">
        <Link href={"/tv-shows"}>
          <CardHeader className="mr-auto px-0 pb-2 text-amber">
            <Tv />
          </CardHeader>
          <CardTitle>
            TV shows
          </CardTitle>
          <CardDescription>
            Popular series
          </CardDescription>
        </Link>
      </Card>
      <Card className="gap-0 pl-4 bg-surface-2 active:ring-amber active:bg-amber/20">
        <Link href={"/watchlist"}>
          <CardHeader className="mr-auto px-0 pb-2 text-amber">
            <Bookmark />
          </CardHeader>
          <CardTitle>
            Watchlist
          </CardTitle>
          <CardDescription>
            Sign in to save titles
          </CardDescription>
        </Link>
      </Card>
    </div>
  )
}
