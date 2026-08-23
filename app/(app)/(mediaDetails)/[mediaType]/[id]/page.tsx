import MovieDetails from "@/app/pages/MovieDetails";
import TVshowDetails from "@/app/pages/TVshowDetails";
import { getMovieById, getTVshowById } from "@/app/entities/media/api/GET-media";
import { TVShow } from "@/app/types/tvshow";
import { notFound } from "next/navigation";

interface MediaDetailsPageProps {
  mediaType: string;
  id: string;
}

export default async function MediaDetailsPage({ params }: { params: Promise<MediaDetailsPageProps> }) {
  await new Promise((r) => setTimeout(r, 2000))
  const { mediaType, id } = await params;

  if (mediaType === "movie") {
    const movie = await getMovieById(id);

    if (!movie) return notFound()

    return <MovieDetails movie={movie} />;
  } else {
    const tvshow = await getTVshowById(id);

    if (!tvshow) return notFound()

    return <TVshowDetails tvshow={tvshow as TVShow} />;
  }
}
