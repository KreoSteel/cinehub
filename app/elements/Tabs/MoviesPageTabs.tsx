import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/shared/shadcn-ui/tabs'
import { Media } from '@/app/types/media'
import MediaCard from '../Cards/MediaCard'

interface MoviesPageTabsProps {
  popular: Media[]
}

export default function MoviesPageTabs({ popular }: MoviesPageTabsProps) {
  return (
    <Tabs defaultValue='popular'>
      <TabsList variant="line" className='mb-5'>
        <TabsTrigger value='popular'>Popular</TabsTrigger>
        <TabsTrigger value='top-rated'>Top Rated</TabsTrigger>
        <TabsTrigger value='now-playing'>Now Playing</TabsTrigger>
        <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
      </TabsList>
      <TabsContent value='popular'>
        <div className='grid gap-y-8 gap-x-2 md:grid-cols-5 grid-cols-4'>
          {popular.map((media) => (
            <MediaCard key={media.id} media={media} mediaType="movie" />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
