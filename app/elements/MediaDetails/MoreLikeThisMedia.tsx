"use client"
import { Media } from "@/app/types/media"
import MediaCard from "../Cards/MediaCard"
import { gsap, useGSAP } from "@/app/shared/lib/gsap"
import { useRef } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/app/shared/shadcn-ui/carousel"
import { EmblaOptionsType } from "embla-carousel"

interface MoreLikeThisMediaProps {
  media: Media[]
  mediaType: "tv" | "movie"
}

export default function MoreLikeThisMedia({ media, mediaType }: MoreLikeThisMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.effects.slide(".mediacard")
  }, { scope: containerRef })

  const settings: EmblaOptionsType = {
    dragFree: true
  };

  return (
    <Carousel opts={settings} ref={containerRef} className="w-full max-w-7xl mx-auto flex flex-col gap-6 pb-40">
      <h1 className="font-bold text-5xl tracking-wide font-title text-shadow-lg pl-2">More Like This</h1>
      <CarouselContent>
        {media.map(item => (
          <CarouselItem key={item.id} className="basis-1/2 md:basis-1/5">
            <MediaCard key={item.id} media={item} mediaType={mediaType} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
