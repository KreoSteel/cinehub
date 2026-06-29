"use client";
import { Media } from "@/app/types";
import Slider from "react-slick";
import { SliderNextArrow, SliderPreviousArrow } from "./SliderArrows";
import HeroMediaCard from "../../elements/Cards/HeroMediaCard";

interface MediaSliderProps {
  medias: Media[];
}

export default function MediaSlider({ medias }: MediaSliderProps) {
  const settings = {
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPreviousArrow />,
    dots: true,
    infinite: true,
    speed: 800,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="group">
      {medias.map((media: Media) => {
        return <HeroMediaCard key={media.id} trendingMedia={media} />;
      })}
    </Slider>
  );
}
