import { Genre } from "@/app/types/media";
import { publicEnv } from "../constants/env.public";

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export const displayNames = new Intl.DisplayNames(["en"], {
  type: "language",
});

export function getGenres(ids: number[] | number, genres: Genre[]): Genre[] | [] {
  if (!ids) return [];
  if (Array.isArray(ids)) {
    const foundGenres = ids.map((id) => genres.find((genre) => genre.id === id)).filter((item): item is Genre => item?.id !== undefined);
    return foundGenres ? foundGenres : [];
  } else if (typeof ids === "number") {
    const foundGenre = genres.find((genre) => genre.id === ids);
    return foundGenre ? [foundGenre] : [];
  }
  return [];
}

// TMDb's images
export const baseUrl = publicEnv.NEXT_PUBLIC_IMAGES_BASE_URL;

export function getImage(path: string | null, size: string) {
  return path !== null ? baseUrl + size + path : "/defaultMediaCard.jpg";
}

export function padNumberWithZero(num: number): string {
  return num.toString().padStart(2, "0");
}