"use client";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/app/shared/shadcn-ui/tabs";
import DiscoverTabContent from "./DiscoverTabsContent";
import { Media, TVshow } from "@/app/types";
import MediaCard from "../Cards/MediaCard";
import Slider from "react-slick";

interface DiscoverTabsProps {
  trendingWeek: Media[];
  popularTVShows: TVshow[];
}

interface TabContentSliderProps {
  Card?: React.ReactNode;
}

export default function DiscoverTabs({ trendingWeek, popularTVShows }: DiscoverTabsProps) {
  console.log("Popular tv show: ", popularTVShows);
  return (
    <Tabs defaultValue="trending-week">
      <TabsList variant="line">
        <TabsTrigger value="trending-week">Trending this week</TabsTrigger>
        <TabsTrigger value="top-10-week">Top 10 of the week</TabsTrigger>
        <TabsTrigger value="popular-tv-shows">Popular TV shows</TabsTrigger>
        <TabsTrigger value="watchlist">From your watchlist</TabsTrigger>
      </TabsList>

      {/*Trending this week tab content*/}

      <TabsContent value="trending-week">
        <DiscoverTabContent
          title="Trending this week"
          path="/"
          Slider={
            <TabContentSlider
              Card={trendingWeek.map((media) => (
                <MediaCard key={media.id} media={media as Media} mediaType={media.media_type} />
              ))}
            />
          }
        ></DiscoverTabContent>
      </TabsContent>

      {/*Popular TV shows tab content*/}

      <TabsContent value="popular-tv-shows">
        <DiscoverTabContent
          title="Popular TV shows"
          path="/"
          Slider={
            <TabContentSlider
              Card={popularTVShows.map((TVshow) => (
                <MediaCard key={TVshow.id} media={TVshow as Media} mediaType="tv" />
              ))}
            />
          }
        ></DiscoverTabContent>
      </TabsContent>
    </Tabs>
  );
}

function TabContentSlider({ Card }: TabContentSliderProps) {
  const settings = {
    arrows: false,
    infinite: false,
    speed: 800,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 3,
  };

  return <Slider {...settings}>{Card}</Slider>;
}
