import { Media } from "@/app/types/media"
import MediaCard from "../Cards/MediaCard"
import Slider from "react-slick"

interface MoreLikeThisMediaProps {
  media: Media[]
  mediaType: "tv" | "movie"
}

export default function MoreLikeThisMedia({ media, mediaType }: MoreLikeThisMediaProps) {
  const settings = {
    arrows: true,
    infinite: false,
    speed: 800,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 5,
  };

  return (
    <div className="w-full max-w-7xl mx-auto pt-20 flex flex-col gap-6 pb-40">
      <h1 className="font-bold text-5xl tracking-wide font-title text-shadow-lg pl-2">More Like This</h1>
      <Slider {...settings}>
        {media.map(item => (
          <MediaCard key={item.id} media={item} mediaType={mediaType} />
        ))}
      </Slider>
    </div>
  )
}
