"use client";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/app/shared/shadcn-ui/tabs";
import DiscoverTabContent from "./DiscoverTabsContent";
import { Media } from "@/app/types";
import MediaCard from "../Cards/MediaCard";
import Slider from "react-slick";

interface DiscoverTabsProps {
  medias: Media[];
}

export default function DiscoverTabs({ medias }: DiscoverTabsProps) {
  return (
    <Tabs defaultValue="trending-week">
      <TabsList variant="line">
        <TabsTrigger value="trending-week">Trending this week</TabsTrigger>
        <TabsTrigger value="top-10-week">Top 10 of the week</TabsTrigger>
        <TabsTrigger value="popular-tv-shows">Popular TV shows</TabsTrigger>
        <TabsTrigger value="watchlist">From your watchlist</TabsTrigger>
      </TabsList>
      <TabsContent value="trending-week">
        <DiscoverTabContent
          title="Trending this week"
          path="/"
          CardComponent={<TrendingThisWeekSlider medias={medias} />}
        ></DiscoverTabContent>
      </TabsContent>
    </Tabs>
  );
}

function TrendingThisWeekSlider({ medias }: DiscoverTabsProps) {
  const settings = {
    arrows: false,
    infinite: false,
    speed: 800,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 3,
  };

  return (
    <Slider {...settings}>
      {medias.map((media) => (
        <MediaCard key={media.id} media={media} />
      ))}
    </Slider>
  );
}
