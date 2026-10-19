import MediaCard from '../Cards/MediaCard'
import PaginationComponent from '@/app/shared/ui/Pagination'
import { AppResponse } from '@/app/types/movie';

interface MoviesPageTabContentProps {
  response: AppResponse;
}

export default async function MoviesPageTabContent({ response }: MoviesPageTabContentProps) {
  const { movies, totalPages, currentPage } = response;

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
