import MediaDetailHero from "@/app/elements/Hero/MediaDetailHero";
import { getMediaById } from "@/app/entities/media/api/GET-media";
import { Movie } from "@/app/types/movie";

interface MediaDetailPageProps {
  mediaType: string;
  id: string;
}

export default async function MediaDetailPage({ params }: { params: Promise<MediaDetailPageProps> }) {
  const { mediaType, id } = await params;

  const media = await getMediaById(id, mediaType);
  return <MediaDetailHero media={media as Movie} />;
}
