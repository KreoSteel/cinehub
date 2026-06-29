import { getTrendingMedia } from "../../entities/media/api/GET-media";
import MediaSlider from "../../shared/ui/MediaSlider";
import DiscoverTabs from "../../elements/Tabs/DiscoverTabs";

export default async function Home() {
  const trendingDaily = await getTrendingMedia("all", "day");
  const trendingWeekly = await getTrendingMedia("all", "week");

  return (
    <div className="pt-6">
      <MediaSlider medias={trendingDaily} />
      <DiscoverTabs medias={trendingWeekly} />
    </div>
  );
}
