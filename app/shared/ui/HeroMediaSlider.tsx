"use client";
import HeroMediaCard from "../../elements/Cards/HeroMediaCard";
import { Media } from "@/app/types/media";
import { useGSAP, gsap } from "../lib/gsap";
import { Carousel, CarouselContent, CarouselItem } from "../shadcn-ui/carousel";
import Autoplay from "embla-carousel-autoplay"
interface HeroMediaSliderProps {
  medias: Media[];
}

export default function HeroMediaSlider({ medias }: HeroMediaSliderProps) {
  useGSAP(() => {
    gsap.effects.slide(".hero");
    window.scrollTo(0, 0)
  }, []);

  const settings = {
    loop: true
  }

  const autoplaySettings = {
    delay: 5000
  }

  return (
    <Carousel
      opts={settings}
      plugins={[Autoplay(autoplaySettings)]}
      className="hero px-2 h-100 w-screen md:h-full md:w-full opacity-0 translate-y-30"
    >
      <CarouselContent>
        {medias.map((media: Media) => (
          <CarouselItem key={media.id}>
            <HeroMediaCard trendingMedia={media} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}