"use client"
import { Media } from "@/app/types/media"
import MediaCard from "../Cards/MediaCard"
import { gsap, useGSAP } from "@/app/shared/lib/gsap"
import Slider from "react-slick"
import { useRef } from "react"

interface MoreLikeThisMediaProps {
  media: Media[]
  mediaType: "tv" | "movie"
}

export default function MoreLikeThisMedia({ media, mediaType }: MoreLikeThisMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.effects.slide(".mediacard")
  }, { scope: containerRef })

  const settings = {
    arrows: true,
    infinite: false,
    speed: 800,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 5,
  };

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto pt-20 flex flex-col gap-6 pb-40">
      <h1 className="font-bold text-5xl tracking-wide font-title text-shadow-lg pl-2">More Like This</h1>
      <Slider {...settings}>
        {media.map(item => (
          <MediaCard key={item.id} media={item} mediaType={mediaType} />
        ))}
      </Slider>
    </div>
  )
}
