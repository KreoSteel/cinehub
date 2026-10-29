"use client";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/app/shared/shadcn-ui/tabs";
import DiscoverTabContent from "./DiscoverTabsContent";
import WatchlistEmptyState from "../EmptyStates/WatchlistEmptyState";
import { Media } from "@/app/types/media";
import TabContentCarousel from "./TabContentCarousel";

interface DiscoverTabsProps {
  trendingWeek: Media[];
  popularTVShows: Media[];
}

export default function DiscoverTabs({ trendingWeek, popularTVShows }: DiscoverTabsProps) {
  return (
    <Tabs defaultValue="trending-week" className="max-w-7xl md:w-screen py-4 md:px-6">
      <TabsList className="flex flex-wrap gap-1 mb-4 px-6 md:px-0" variant="line">
        <TabsTrigger value="trending-week">Trending this week</TabsTrigger>
        <TabsTrigger value="popular-tv-shows">Popular TV shows</TabsTrigger>
        <TabsTrigger value="watchlist">From your watchlist</TabsTrigger>
      </TabsList>

      <TabsContent value="trending-week">
        <DiscoverTabContent
          title="Trending this week"
          path="/"
          Carousel={<TabContentCarousel media={trendingWeek} />}
        ></DiscoverTabContent>
      </TabsContent>

      <TabsContent value="popular-tv-shows">
        <DiscoverTabContent
          title="Popular TV shows"
          path="/"
          Carousel={<TabContentCarousel media={popularTVShows} />}
        ></DiscoverTabContent>
      </TabsContent>

      <TabsContent value="watchlist">
        <DiscoverTabContent title="From your watchlist" path="/watchlist" Carousel={<WatchlistEmptyState />}></DiscoverTabContent>
      </TabsContent>
    </Tabs>
  );
}
