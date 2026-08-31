import MoviesPageTabs from "../elements/Tabs/MoviesPageTabs";
import PaginationComponent from "../shared/ui/Pagination";
import { Media } from "@/app/types/media";

interface MoviesProps {
  popular: Media[]
  totalPages: number
  currentPage: number
}

export default function Movies({ popular, totalPages, currentPage }: MoviesProps) {
  return (
    <div className="mx-auto pt-10 w-full max-w-7xl">
      <div className="flex flex-col gap-2 pb-10">
        <h1 className="font-title text-6xl">movies</h1>
        <p className="text-muted-foreground">Everything from what&apos;s playing right now to all-time greats.</p>
      </div>
      <MoviesPageTabs popular={popular} />
      <PaginationComponent totalPage={totalPages} currentPage={currentPage} />
    </div>
  )
}
