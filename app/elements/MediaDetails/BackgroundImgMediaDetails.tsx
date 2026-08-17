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
    <div className="fixed inset-0 -z-10">
      <Image src={bgImageURL} fill alt={title} className="object-cover"></Image>
      <div className="absolute inset-0 bg-linear-to-t from-background from-0% via-background/60 via-60% to-background/0 to-100% in-oklch" />
    </div>

  );
}

// from-[#0A0A0A] from-45% to-[#0A0A0A]/60 to-80%
