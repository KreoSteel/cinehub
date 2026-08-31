import MovieDetails from "@/app/pages/MovieDetails";
import TVshowDetails from "@/app/pages/TVshowDetails";
import { getMovieById, getTVshowById } from "@/app/entities/media/api/GET-media";
import { mediaTypeSchema } from "@/app/shared/lib/schemas/media";
import { notFound } from "next/navigation";
import { TVShow } from "@/app/types/tvshow";

interface MediaDetailsPageProps {
  mediaType: string;
  id: string;
}

export default async function MediaDetailsPage({ params }: { params: Promise<MediaDetailsPageProps> }) {
  const { mediaType, id } = await params;
  const parsedMediaType = mediaTypeSchema.safeParse(mediaType);

  if (!parsedMediaType.success) return notFound()

  if (parsedMediaType.data === "movie") {
    const movie = await getMovieById(id);

    if (!movie) return notFound()

    return <MovieDetails movie={movie} />;
  } else {
    const tvshow = await getTVshowById(id);

    if (!tvshow) return notFound()

    return <TVshowDetails tvshow={tvshow as TVShow} />;
  }
}
