import { getGenresList, getPopularMovies } from "@/app/entities/media/api/GET-media";
import { mapMedia } from "@/app/entities/media/lib/media-mappers";
import { pageSchema } from "@/app/shared/lib/schemas/pagination";
import Movies from "@/app/pages/Movies";

interface MoviesPageProps {
  searchParams?: Promise<{
    page?: string
  }>
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams
  const currentPage = pageSchema.parse(params?.page)
  const rawMovies = await getPopularMovies(currentPage);
  const genresList = await getGenresList()

  const totalPages = rawMovies.total_pages > 500 ? 500 : rawMovies.total_pages
  const parsedMovies = rawMovies.results.map(movies => mapMedia(movies, genresList))

  return <Movies popular={parsedMovies} totalPages={totalPages} currentPage={rawMovies.page} />
}
