import { MediaGenres, Media } from "@/app/types";

export function getMediaGenres(ids: number[], genres: MediaGenres[]) {
  const foundGenres = ids
    .map((id) => genres.find((genre) => genre.id === id))
    .filter((item) => item !== undefined);
  return foundGenres;
}

export const titles = (media: Media, media_type: "tv" | "movie") => {
  if (media_type === "tv") {
    return media.name;
  } else if (media_type === "movie") {
    return media.title;
  } else {
    throw new Error("titles: Error to get title of the media");
  }
};
export const releaseDate = (media: Media, media_type: "tv" | "movie") => {
  if (media_type === "tv") {
    return new Date(media.first_air_date).getFullYear();
  } else if (media_type === "movie") {
    return new Date(media.release_date).getFullYear();
  } else {
    throw new Error("releaseDate: Error to get releaseDate of the media");
  }
};

// TMDb's images
export const baseUrl = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;

export function getImage(path: string, size: string) {
  return path ? baseUrl + size + path : null;
}
