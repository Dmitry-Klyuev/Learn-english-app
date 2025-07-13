import {useEffect, useState} from "react";
import {useAppSelector} from "@/lib/hooks.ts";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination/pagination.tsx";
import {useNavigate} from "react-router-dom";

export function PaginationWrapper() {
  const totalItems = useAppSelector((state) => state.dictionary.countWords);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    navigate(`/${currentPage}`);
  }, [currentPage]);

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5; // Максимальное количество видимых номеров страниц

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      visiblePages.push(1);
      if (start > 2) {
        visiblePages.push("ellipsis-left");
      }
    }

    for (let i = start; i <= end; i++) {
      if (i > 0 && i <= totalPages) {
        visiblePages.push(i);
      }
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        visiblePages.push("ellipsis-right");
      }
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  return (
    <div className="flex flex-col gap-4 mt-5" >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((prev) => Math.max(1, prev - 1));
              }}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {getVisiblePages().map((page, index) =>
            page === "ellipsis-left" || page === "ellipsis-right" ? (
              <PaginationItem key={`${page}-${index}`}>
                <PaginationEllipsis/>
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page as number);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((prev) => Math.min(totalPages, prev + 1));
              }}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Информация о странице */}
      <div className="text-sm text-muted-foreground text-center">
        Страница {currentPage} из {totalPages} • Всего элементов: {totalItems}
      </div>
    </div>
  );
}
