import { MediaGenres, Media } from "@/app/types";

export function getMediaGenres(ids: number[], genres: MediaGenres[]) {
  const foundGenres = ids
    .map((id) => genres.find((genre) => genre.id === id))
    .filter((item) => item !== undefined);
  return foundGenres;
}

export const titles = (media: Media) => (media.media_type === "tv" ? media.name : media.title);
export const releaseDate = (media: Media) =>
  media.media_type === "tv"
    ? new Date(media.first_air_date).getFullYear()
    : new Date(media.release_date).getFullYear();

// TMDb's images
export const baseUrl = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;

export function getImage(path: string, size: string) {
  return path ? baseUrl + size + path : null;
}
