import { useMemo } from "react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
  // 페이지 그룹 단위
  const MAX_VISIBLE_PAGES = 5;

  const currentGroup = Math.floor((currentPage - 1) / MAX_VISIBLE_PAGES);

  const visiblePages = useMemo(() => {
    const start = currentGroup * MAX_VISIBLE_PAGES + 1; //현재 보여지는 페이지그룹의 첫번재페이지
    const end = Math.min(start + MAX_VISIBLE_PAGES - 1, totalPages); //현재 보여지는 페이지그룹의 마지막페이지
    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  }, [currentGroup, totalPages]);

  const buttonCss =
    "rounded border bg-focused-input-background px-3 py-1 hover:bg-page-button-hovered";

  return (
    <div className="flex items-center space-x-2">
      {/* 처음 페이지 이동 */}
      <button className={buttonCss} onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
        <HiChevronDoubleLeft />
      </button>

      {/* 5단위 이전 그룹 이동 */}
      {currentGroup > 0 && (
        <button
          className={buttonCss}
          onClick={() => setCurrentPage(currentGroup * MAX_VISIBLE_PAGES)}
        >
          <HiChevronLeft />
        </button>
      )}

      {/* 페이지 번호 */}
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`rounded border px-3 py-1 ${
            page === currentPage
              ? "bg-Accent text-white"
              : "hover:bg-page-button-hovered bg-focused-input-background"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      {/* 5단위 다음 그룹 이동 */}
      {currentGroup < Math.floor((totalPages - 1) / MAX_VISIBLE_PAGES) && (
        <button
          className={buttonCss}
          onClick={() => setCurrentPage((currentGroup + 1) * MAX_VISIBLE_PAGES + 1)}
        >
          <HiChevronRight />
        </button>
      )}

      {/* 마지막 페이지 이동 */}
      <button
        className={buttonCss}
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        <HiChevronDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
