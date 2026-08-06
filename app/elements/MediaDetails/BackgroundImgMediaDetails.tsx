import { getImage } from "@/app/shared/lib/helpers";
import Image from "next/image";

interface BackgroundImgProp {
  title: string;
  backdropPath: string | null;
}

export function BackgroundImgMediaDetails({ backdropPath, title }: BackgroundImgProp) {
  const bgImageURL = getImage(backdropPath, "original");
  if (bgImageURL === null) return null;

  return (
    <div className="w-full min-h-screen relative">
      <Image src={bgImageURL} width={9999} height={0} alt={title} className="-z-100"></Image>
      <div className="absolute inset-0 w-full h-full bg-linear-to-t from-black via-black via-40% to-black/60 to-80%"></div>
    </div>
  );
}
