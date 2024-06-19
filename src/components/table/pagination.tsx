import { useEffect, useRef, useState } from "react";
import ActionButton from "../actionButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer"; // Import useInView hook

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  lengthData: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  lengthData,
  onPageChange,
}: PaginationProps) {
  const [pageStart, setPageStart] = useState(1);
  const [mobileData, setMobileData] = useState(7);
  const [loading, setLoading] = useState(false);

  const pageEnd = Math.min(pageStart + 3, totalPages);
  let manyPage = 0;

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams().get("search") || "";
  const filterParams = useSearchParams().get("filter") || "";

  if (lengthData === 0) {
    manyPage = 0;
  } else if (lengthData <= 32) {
    manyPage = 1;
  } else {
    manyPage = 2;
  }

  const pages = Array.from(
    { length: pageEnd - pageStart + manyPage },
    (_, i) => pageStart + i
  );

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
    if (page - pageStart >= 2 && pageEnd < totalPages - 1) {
      setPageStart(page - 2);
    } else if (page - pageStart <= 1 && pageStart > 1) {
      if (page === 2) {
        setPageStart(page - 1);
      } else {
        setPageStart(page - 2);
      }
    }
  };

  const handleToFistPage = () => {
    onPageChange(1);
    setPageStart(1);
  };

  const handleToLastPage = () => {
    onPageChange(totalPages);
    setPageStart(totalPages - 4);
  };

  useEffect(() => {
    router.push(
      `${pathName}?filter=${filterParams}&search=${searchParams}&skip=${
        (currentPage - 1) * 7
      }&take=7`
    );
  }, [currentPage]);

  const handleMoreData = () => {
    try {
      setLoading(true);
      const newMobileData = Math.min(mobileData + 7, lengthData);
      setMobileData(newMobileData);
      const newUrl = `${pathName}?filter=${filterParams}&search=${searchParams}&skip=0&take=${newMobileData}`;
      router.replace(newUrl, { scroll: false });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-2 mobile:hidden tablet:flex laptop:flex">
        <div className="join">
          <ActionButton
            action={handleToFistPage}
            styles={"join-item btn btn-sm btn-neutral"}
            disabled={currentPage === 1}
          >
            {" "}
            {"<<"}
          </ActionButton>
          <ActionButton
            action={handlePrev}
            styles={"join-item btn btn-sm btn-neutral"}
            disabled={currentPage === 1}
          >
            {"<"}
          </ActionButton>
          {pages.map((page) => (
            <div key={page}>
              <ActionButton
                action={() => handleCurrentPage(page)}
                styles={`join-item btn btn-sm ${
                  currentPage === page
                    ? "btn-accent text-accent-content"
                    : "btn-neutral"
                }`}
              >
                {String(page)}
              </ActionButton>
            </div>
          ))}
          <ActionButton
            action={handleNext}
            styles={"join-item btn btn-sm btn-neutral"}
            disabled={currentPage === totalPages}
          >
            {">"}
          </ActionButton>
          <ActionButton
            action={handleToLastPage}
            styles={"join-item btn btn-sm btn-neutral"}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </ActionButton>
        </div>
        <p className="mt-3">
          {lengthData === 0 ? (
            <span>Not found data</span>
          ) : (
            <span>
              {currentPage} of {totalPages}
            </span>
          )}
        </p>
      </div>

      {/* Bottom section for loading more data */}
      <div className="flex justify-center laptop:hidden tablet:hidden mb-5">
        {loading ? (
          <span className="loading loading-dots loading-xs"></span>
        ) : (
          <ActionButton
            action={handleMoreData}
            styles={"btn btn-xl btn-primary"}
            disabled={loading || mobileData >= lengthData}
          >
            {mobileData < lengthData ? "Load more" : "No more data"}
          </ActionButton>
        )}
      </div>
    </>
  );
}
