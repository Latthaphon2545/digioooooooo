import { useEffect, useState } from "react";
import ActionButton from "../actionButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer"; // Import useInView hook
import { itemPage } from "./staticPropsInTable";
import { encode } from "@/lib/generateRandomHref";
import Modal from "../modal";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  lengthData: number;
  onPageChange: (pageNumber: number) => void;
}

const btnClass = "btn btn-sm btn-base-100 join-item";

export default function Pagination({
  currentPage,
  totalPages,
  lengthData,
  onPageChange,
}: PaginationProps) {
  const [pageStart, setPageStart] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  // const [mobileData, setMobileData] = useState(itemPage);
  // const [loading, setLoading] = useState(false);
  // const [debouncedWidth, setDebouncedWidth] = useState(sizeWindow.width);
  let skip = 0;
  let take = itemPage;

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

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

  const handleToFirstPage = () => {
    onPageChange(1);
    setPageStart(1);
  };

  const handleToLastPage = () => {
    onPageChange(totalPages);
    setPageStart(totalPages - 4);
  };

  useEffect(() => {
    const skip = (currentPage - 1) * itemPage;
  }, [currentPage]);

  useEffect(() => {
    skip = (currentPage - 1) * itemPage;
    const newUrl = `${pathName}?${encode(
      `filter=${filterParams}&search=${searchParams}&skip=${skip}&take=${take}`
    )}`;
    router.replace(newUrl, { scroll: true });
  }, [currentPage]);

  // const handleMoreData = () => {
  //   try {
  //     setLoading(true);
  //     take = Math.min(mobileData + itemPage, lengthData);
  //     setMobileData(take);
  //     const newUrl = `${pathName}?${encode(
  //       `filter=${filterParams}&search=${searchParams}&skip=0&take=${take}`
  //     )}`;
  //     router.replace(newUrl, { scroll: false });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   }
  // };

  // useEffect(() => {
  //   if (inView && !loading && mobileData < lengthData) {
  //     handleMoreData();
  //     onPageChange(currentPage + 1);
  //     console.log(currentPage);
  //   }
  // }, [inView, loading, mobileData, lengthData]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setDebouncedWidth(sizeWindow.width);
  //   };

  //   const debounceResize = setTimeout(handleResize, 200);

  //   return () => clearTimeout(debounceResize);
  // }, [sizeWindow]);

  // useEffect(() => {
  //   if (debouncedWidth <= isLaptop) {
  //     skip = 0;
  //     take = itemPage;
  //     // console.log("mobile", skip, take);
  //   } else {
  //     take = itemPage;
  //     skip = (currentPage - 1) * itemPage;
  //     // console.log("laptop", skip, take);
  //   }
  // }, [debouncedWidth, mobileData, currentPage]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-2">
        <div className="join">
          <ActionButton
            action={handleToFirstPage}
            styles={`${btnClass} mobile:hidden tablet:hidden laptop:block`}
            disabled={currentPage === 1}
          >
            {"<<"}
          </ActionButton>
          <ActionButton
            action={handlePrev}
            styles={btnClass}
            disabled={currentPage === 1}
          >
            {"<"}
          </ActionButton>

          {/* In desktop */}
          {pages.map((page) => (
            <div
              key={page}
              className="mobile:hidden tablet:hidden laptop:block"
            >
              <ActionButton
                action={() => handleCurrentPage(page)}
                styles={`${btnClass} ${currentPage === page && "btn-accent"}`}
              >
                {String(page)}
              </ActionButton>
            </div>
          ))}

          {/* In mobile */}
          <div className="mobile:block tablet:block laptop:hidden mb-5">
            <Modal
              title={currentPage}
              style={btnClass}
              titleContent="Select page"
              content={
                <div className="wrap flex flex-nowrap overflow-x-auto gap-1 py-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`btn btn-sm ${
                          currentPage === page ? "btn-accent" : ""
                        }`}
                        onClick={() => {
                          handleCurrentPage(page);
                          setModalOpen(false);
                        }}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
              }
              id="Select page"
              boolClose={true}
            />
          </div>

          <ActionButton
            action={handleNext}
            styles={btnClass}
            disabled={currentPage === totalPages}
          >
            {">"}
          </ActionButton>
          <ActionButton
            action={handleToLastPage}
            styles={`${btnClass} mobile:hidden tablet:hidden laptop:block`}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </ActionButton>
        </div>
        <p className="mt-3 mobile:hidden tablet:hidden laptop:block">
          {lengthData === 0 ? (
            <span>Not found data</span>
          ) : (
            <span>
              {currentPage} of {totalPages}
            </span>
          )}
        </p>
      </div>

      {/* <div className="flex justify-center mobile:flex tablet:flex laptop:hidden mb-5">
        {loading ? (
          <span className="loading loading-dots loading-xs"></span>
        ) : (
          <>
            {mobileData < lengthData ? (
              <ActionButton
                action={handleMoreData}
                styles={"btn btn-xl btn-primary"}
                disabled={loading || mobileData >= lengthData}
              >
                Load more
              </ActionButton>
            ) : (
              <span>No more data</span>
            )}
          </>
        )}
      </div>

      <div className="mobile:block tablet:block laptop:hidden">
        <div ref={ref} className="h"></div>
      </div> */}
    </>
  );
}
