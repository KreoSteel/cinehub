import MediaCard from '../../Cards/MediaCard'
import PaginationComponent from '@/app/shared/ui/Pagination'
import { getPopularMovies } from '@/app/entities/media/api/GET-media';

interface PopularTabProps {
  currentPage: number;
}

export default async function PopularTab({ currentPage }: PopularTabProps) {
  const popularMovies = await getPopularMovies(currentPage);
  const { movies, totalPages } = popularMovies

  return (
    <>
      <div className='grid gap-y-8 gap-x-2 md:grid-cols-5 grid-cols-4'>
        {movies.map((media) => (
          <MediaCard key={media.id} media={media} mediaType="movie" />
        ))}
      </div>
      <PaginationComponent currentPage={currentPage} totalPage={totalPages} />
    </>
  )
}
