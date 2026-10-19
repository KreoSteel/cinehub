import { pageSchema } from "@/app/shared/lib/schemas/pagination";
import MoviesPageTabs from "@/app/elements/Tabs/MoviesPageTabs";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/app/entities/media/api/GET-media";
import MoviesPageTabContent from "@/app/elements/Tabs/MoviesPageTabContent";

interface MoviesPageProps {
  searchParams?: Promise<{
    page?: string;
    tab?: string
  }>
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams
  const currentPage = pageSchema.parse(params?.page)
  const tab = params?.tab === undefined ? "popular" : params?.tab

  return (
    <div className="mx-auto pt-10 w-full max-w-7xl">
      <div className="flex flex-col gap-2 pb-10">
        <h1 className="font-title text-6xl">movies</h1>
        <p className="text-muted-foreground">Everything from what&apos;s playing right now to all-time greats.</p>
      </div>
      <MoviesPageTabs active={tab}>
        {tab === "popular" ? <MoviesPageTabContent response={await getPopularMovies(currentPage)} /> :
          tab === "top-rated" ? <MoviesPageTabContent response={await getTopRatedMovies(currentPage)} /> :
            tab === "now-playing" ? <MoviesPageTabContent response={await getNowPlayingMovies(currentPage)} /> :
              tab === "upcoming" && <MoviesPageTabContent response={await getUpcomingMovies(currentPage)} />}
      </MoviesPageTabs>
    </div>
  )
}
