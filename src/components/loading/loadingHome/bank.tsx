import React from "react";

const status = [
  "INSTOCK",
  "INSTALLED",
  "INSTALLING",
  "REPARING",
  "DAMAGED",
  "LOST",
  "WAITREPAIR",
];

export default function BankHomeLoading() {
  return (
    <div className="py-5 flex flex-col justify-center laptop:rounded-tl-[1rem] laptop:min-w-full mobile:max-w-sm tablet:min-w-full">
      <div className="carousel rounded-box">
        <div
          className={`carousel-item relative w-full justify-center items-center`}
        >
          <div className="mx-10 skeleton opacity-25 w-[17vw] h-[30vh] rounded-full laptop:w-52 laptop:h-52 mobile:hidden tablet:block tablet:w-48 tablet:h-48 laptop:block "></div>
          <div className="mb-5">
            <div className="flex justify-center items-center">
              <div className="stats stats-horizontal grid gap-3 shadow-lg mobile:grid-rows-4 tablet:grid-rows-2 laptop:grid-rows-2">
                {status.map((status, index) => (
                  <div key={index} className="stat">
                    <div className="stat-title laptop:text-sm mobile:text-xs">
                      {status}
                    </div>
                    <div
                      className={`stat-value skeleton opacity-25  h-6 w-10`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SlidePaginationSkeleton />
    </div>
  );
}

const SlidePaginationSkeleton = () => {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <div className={`h-3 rounded-full cursor-pointer bg-primary w-7`}></div>
    </div>
  );
};
