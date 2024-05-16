import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [pageStart, setPageStart] = useState(1);
  const pageEnd = Math.min(pageStart + 3, totalPages);
  const pages = Array.from({ length: pageEnd - pageStart + 2 }, (_, i) => pageStart + i);

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      if (currentPage - pageStart >= 2 && pageEnd < totalPages - 1) {
        setPageStart(pageStart + 1);
      }
    }
  };

  const handlePrev = () => {
    onPageChange(currentPage - 1);
    if (currentPage > 1) {
      if (pageStart - currentPage >= -2 && pageStart > 1) {
        setPageStart(pageStart - 1);
      }
    }
  };

  const handleCurrentPage = (page: number) => {
    onPageChange(page);
    if (currentPage - pageStart >= 2 && pageEnd < totalPages - 1) {
      setPageStart(page - 2);
    } else if (pageStart - currentPage >= -2 && pageStart > 1) {
      setPageStart(page - 2);
    }
  }


  return (
    <>
      <div className="join">
        <button className={`join-item btn btn-sm`} onClick={handlePrev} disabled={currentPage === 1}>{"<"}</button>
        {pages.map((page) => (
          <button key={page} className={`join-item btn btn-sm ${currentPage === page ? "btn-secondary text-accent" : ""}`} onClick={() => handleCurrentPage(page)}>{page}</button>
        ))}
        <button className={`join-item btn btn-sm`} onClick={handleNext} disabled={currentPage === totalPages}>{">"}</button>
      </div>

    </>
  )
}