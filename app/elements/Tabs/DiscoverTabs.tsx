"use client";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/app/shared/shadcn-ui/tabs";
import DiscoverTabContent from "./DiscoverTabsContent";
import MediaCard from "../Cards/MediaCard";
import Slider from "react-slick";
import WatchlistEmptyState from "../EmptyStates/WatchlistEmptyState";
import { Media } from "@/app/types/media";

interface DiscoverTabsProps {
  trendingWeek: Media[];
  popularTVShows: Media[];
}

interface TabContentSliderProps {
  Card?: React.ReactNode;
}

export default function DiscoverTabs({ trendingWeek, popularTVShows }: DiscoverTabsProps) {
  return (
    <Tabs defaultValue="trending-week" className="py-6">
      <TabsList variant="line">
        <TabsTrigger value="trending-week">Trending this week</TabsTrigger>
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
                <MediaCard key={media.id} media={media} mediaType={media.mediaType} />
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
                <MediaCard key={TVshow.id} media={TVshow} mediaType="tv" />
              ))}
            />
          }
        ></DiscoverTabContent>
      </TabsContent>

      {/*Watchlist tab content*/}

      <TabsContent value="watchlist">
        <DiscoverTabContent
          title="From your watchlist"
          path="/watchlist"
          Slider={<WatchlistEmptyState />}
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
