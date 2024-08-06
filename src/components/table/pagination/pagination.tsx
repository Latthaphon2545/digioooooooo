import { useEffect, useState } from "react";
import ActionButton from "../../actionButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { decode, encode } from "@/lib/generateRandomHref";
import Modal from "../../modal";
import { itemPage } from "../compo/staticPropsInTable";

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

  const router = useRouter();
  const pathName = usePathname();
  const params = useSearchParams();
  const { filter, search } = decode(params.toString());

  const [open, setOpen] = useState(false);

  const updatePageRange = (page: number) => {
    let start = Math.max(page - 2, 1);
    let end = Math.min(page + 2, totalPages);
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(start + 4, totalPages);
      } else if (end === totalPages) {
        start = Math.max(end - 4, 1);
      }
    }
    setPageStart(start);
  };

  useEffect(() => {
    updatePageRange(currentPage);
  }, [currentPage, totalPages]);

  const pages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => pageStart + i
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleCurrentPage = (page: number) => {
    onPageChange(page);
  };

  const handleToFirstPage = () => {
    onPageChange(1);
    setPageStart(1);
  };

  const handleToLastPage = () => {
    onPageChange(totalPages);
    setPageStart(Math.max(totalPages - 4, 1));
  };

  useEffect(() => {
    const skipPage = (currentPage - 1) * itemPage;
    const newUrl = `${pathName}?${encode(
      `filter=${filter}&search=${search}&skip=${skipPage}&take=${itemPage}`
    )}`;
    router.replace(newUrl, { scroll: true });
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-2">
        <div className="join cursor-not-allowed">
          <ActionButton
            action={handleToFirstPage}
            styles={`${btnClass} mobile:hidden tablet:hidden laptop:block`}
            disabled={currentPage === 1 || lengthData === 0}
          >
            {"<<"}
          </ActionButton>
          <ActionButton
            action={handlePrev}
            styles={btnClass}
            disabled={currentPage === 1 || lengthData === 0}
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
              NameBtn={currentPage}
              styleBtn={btnClass}
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
                          setOpen(false);
                          console.log("close");
                        }}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
              }
              setOpen={setOpen}
              open={open}
              id="Select page"
            />
          </div>

          <ActionButton
            action={handleNext}
            styles={btnClass}
            disabled={currentPage === totalPages || lengthData === 0}
          >
            {">"}
          </ActionButton>
          <ActionButton
            action={handleToLastPage}
            styles={`${btnClass} mobile:hidden tablet:hidden laptop:block`}
            disabled={currentPage === totalPages || lengthData === 0}
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
    </>
  );
}
