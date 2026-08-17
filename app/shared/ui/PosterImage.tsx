"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getImage } from "../lib/helpers";
import Image from "next/image";

interface PosterImgProp {
  title: string;
  posterPath: string;
}

export function PosterImage({ posterPath, title }: PosterImgProp) {
  const posterImage = getImage(posterPath, "original");

  const router = useRouter();

  return (
    // Also add back to previous page button
    <div className="flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center w-fit hover:text-gray-300 gap-1 text-foreground/60">
        <ArrowLeft strokeWidth={1.5} size={20} /> Back
      </button>
      {posterImage ? <Image src={posterImage} width={270} height={300} alt={title} className="rounded-lg border border-muted-foreground/30"></Image> : null}
    </div>
  );
}
