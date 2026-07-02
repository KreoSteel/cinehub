import DiscoverTabs from "@/app/elements/Tabs/DiscoverTabs";
import { getPopularTVshows, getTrendingMedia } from "@/app/entities/media/api/GET-media";
import MediaSlider from "@/app/shared/ui/MediaSlider";

export default async function Home() {
  const trendingDaily = await getTrendingMedia("all", "day", 5);
  const trendingWeekly = await getTrendingMedia("all", "week");
  const dailyIds = new Set(trendingDaily.map((media) => media.id));
  const popularTVshows = await getPopularTVshows();

  const weeklyUniqueMedia = trendingWeekly.filter((media) => !dailyIds.has(media.id));
  return (
    <div className="pt-6">
      <MediaSlider medias={trendingDaily} />
      <DiscoverTabs trendingWeek={weeklyUniqueMedia} popularTVShows={popularTVshows} />
    </div>
  );
}
