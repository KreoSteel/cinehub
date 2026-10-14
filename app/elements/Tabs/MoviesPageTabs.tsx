"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/shared/shadcn-ui/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface MoviesPageTabsProps {
  active: string;
  children: React.ReactNode;
}

export default function MoviesPageTabs({ active, children }: MoviesPageTabsProps) {
  const pathname = usePathname()
  const { replace } = useRouter();
  const searchParams = useSearchParams()

  const appendTabParam = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Tabs defaultValue={active} onValueChange={value => appendTabParam(value)}>
      <TabsList variant="line" className='mb-5'>
        <TabsTrigger value='popular'>Popular</TabsTrigger>
        <TabsTrigger value='top-rated'>Top Rated</TabsTrigger>
        <TabsTrigger value='now-playing'>Now Playing</TabsTrigger>
        <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
      </TabsList>
      <TabsContent value={active}>
        {children}
      </TabsContent>
    </Tabs>
  )
}
