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
    <div>
      <div className="carousel rounded-box">
        <div
          className={`carousel-item relative w-full justify-center items-center`}
        >
          <div className="mx-10 skeleton opacity-25 w-[17vw] h-[30vh] rounded-full "></div>
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="stats stats-horizontal grid grid-rows-2 gap-4 shadow-xl">
              {status.map((status, index) => (
                <div key={index} className="stat">
                  <div className="stat-title text-sm">{status}</div>
                  <div className={`stat-value skeleton opacity-25  h-8`}></div>
                </div>
              ))}
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
    <div className="flex justify-center items-center gap-4">
      <div className="skeleton opacity-0 w-3 h-3 cursor-pointer rounded-full"></div>
    </div>
  );
};
