import DiscoverTabs from "@/app/elements/Tabs/DiscoverTabs";
import { getPopularTVshows, getTrendingMedia } from "@/app/entities/media/api/GET-media";
import MediaSlider from "@/app/shared/ui/MediaSlider";

export default async function Home() {
  const trendingDaily = getTrendingMedia("all", "day", 5);
  const trendingWeekly = getTrendingMedia("all", "week");
  const popularTVshows = getPopularTVshows();
  const [daily, weekly, TVshows] = await Promise.all([trendingDaily, trendingWeekly, popularTVshows]);

  const dailyIds = new Set(daily.map((media) => media.id));
  const weeklyUniqueMedia = weekly.filter((media) => !dailyIds.has(media.id));
  
  return (
    <div className="pt-6 max-w-7xl mx-auto">
      <MediaSlider medias={daily} />
      <DiscoverTabs trendingWeek={weeklyUniqueMedia} popularTVShows={TVshows} />
    </div>
  );
}
