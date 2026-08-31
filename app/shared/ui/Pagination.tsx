"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../shadcn-ui/pagination";
import clsx from "clsx";

interface PaginationProps {
  totalPage: number
  currentPage: number
}

export default function PaginationComponent({ totalPage, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const { replace } = useRouter()

  const handlePageChange = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params}`)
  }

  function getPageNumbers() {
    let start = currentPage - 2;

    if (start < 1) {
      start = 1
    } else if (start > totalPage - 6) {
      start = totalPage - 6;
    }

    let end = start + 5;

    if (end > totalPage) {
      end = totalPage
    }

    if (totalPage <= 6) {
      return Array.from({ length: totalPage }, (_, i) => i + 1)
    }

    return Array.from(
      { length: end - start + 1 },
      (_, i) => start + i,
    );
  }

  const pageNumbers = getPageNumbers()

  return (
    <Pagination className="py-15">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} className={clsx(currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-surface-2")} />
        </PaginationItem>
        {!pageNumbers.includes(1) ?
          <>
            <PaginationItem key={1}>
              <PaginationLink onClick={() => handlePageChange(1)} isActive={1 === currentPage} className="cursor-pointer">
                {1}
              </PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
          </> : null}

        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink onClick={() => handlePageChange(page)} isActive={page === currentPage} className="cursor-pointer">
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {!pageNumbers.includes(totalPage) ?
          <>
            <PaginationEllipsis />
            <PaginationItem key={totalPage}>
              <PaginationLink onClick={() => handlePageChange(totalPage)} isActive={totalPage === currentPage} className="cursor-pointer">
                {totalPage}
              </PaginationLink>
            </PaginationItem>
          </> : null}

        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} className={clsx(currentPage === totalPage && "pointer-events-none opacity-50")} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}