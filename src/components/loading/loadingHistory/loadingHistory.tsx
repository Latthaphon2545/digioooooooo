import React from "react";
import Pagination from "../loadingTable/pagination";
import TablePageLoading from "../loadingTable/tablePage";

export default function LoadingHistory() {
  return (
    <div className="container px-4 mx-5">
      <div className="card card-side bg-base-100 shadow-xl w-1/3 mt-3 ">
        <figure className="w-28 h-[18vh] skeleton opacity-30"></figure>
        <div className="card-body">
          <h2 className="card-title skeleton w-[8vw] h-5 opacity-30"></h2>
          <p className="flex flex-col gap-2">
            <span className="skeleton w-[8vw] h-5 opacity-30"></span>
            <span className="skeleton w-[8vw] h-5 opacity-30"></span>
          </p>
        </div>
      </div>
      <TablePageLoading Type="History" length={5} />
    </div>
  );
}
