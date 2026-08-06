import MovieDetails from "@/app/pages/MovieDetails";
import TVshowDetails from "@/app/pages/TVshowDetails";
import { getMovieById, getTVshowById } from "@/app/entities/media/api/GET-media";
import { TVShow } from "@/app/types/tvshow";

interface MediaDetailsPageProps {
  mediaType: string;
  id: string;
}

export default async function MediaDetailsPage({ params }: { params: Promise<MediaDetailsPageProps> }) {
  const { mediaType, id } = await params;

  if (mediaType === "movie") {
    const movie = await getMovieById(id);
    return <MovieDetails movie={movie} />;
  } else {
    const tvshow = await getTVshowById(id);
    console.log("TVshow:", tvshow)
    return <TVshowDetails tvshow={tvshow as TVShow} />;
  }
}
