"use client";
import Slider from "react-slick";
import { SliderNextArrow, SliderPreviousArrow } from "./SliderArrows";
import HeroMediaCard from "../../elements/Cards/HeroMediaCard";
import { Media } from "@/app/types/media";
import { useGSAP, gsap } from "../lib/gsap";

interface MediaSliderProps {
  medias: Media[];
}

export default function MediaSlider({ medias }: MediaSliderProps) {
  useGSAP(() => {
    gsap.effects.slide(".hero")
  }, []);

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
    <Slider
      {...settings}
      className="group hero opacity-0 translate-y-30 pb-auto"
    >
      {medias.map((media: Media) => (
        <HeroMediaCard key={media.id} trendingMedia={media} />
      ))}
    </Slider>
  );
}