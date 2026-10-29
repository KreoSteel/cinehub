"use client"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/app/shared/lib/gsap";
import { Carousel, CarouselContent, CarouselItem } from "@/app/shared/shadcn-ui/carousel";
import { Media } from "@/app/types/media";
import MediaCard from "../Cards/MediaCard";
import type { EmblaOptionsType } from "embla-carousel";

interface TabContentSliderProps {
  media: Media[]
}

export default function TabContentCarousel({ media }: TabContentSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.effects.slide(".mediacard")
  }, { scope: containerRef });

  const settings: EmblaOptionsType = {
    align: 'start',
    dragFree: true,
  }

  return (
    <Carousel opts={settings} ref={containerRef} className="w-screen md:w-full">
      <CarouselContent className="px-6 md:px-2">
        {media.map(item => (
          <CarouselItem key={item.id} className="basis-1/2 md:basis-1/5">
            <MediaCard key={item.id} media={item} mediaType={item.mediaType} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}