import React from "react";
import TableLoading from "../loadingTable/table";

export default function LoadingHistory() {
  return (
    <div className="flex flex-col items-center py-5  h-full">
      <div>
        <div className="stats shadow-lg mobile:stats-vertical tablet:stats-horizontal laptop:stats-horizontal">
          <div className="stat flex justify-center items-center">
            <div className="w-24 h-16 rounded-full skeleton bg-opacity-10"></div>
            <div className="flex flex-col gap-1 ml-2 w-full">
              <div className="stat-value skeleton h-10 bg-opacity-10"></div>
              <div className="stat-title">Model</div>
              <div className="stat-desc skeleton h-5 bg-opacity-10"></div>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Status</div>
            <div className="stat-value skeleton h-12 w-32 bg-opacity-10"></div>
          </div>

          <div className="stat">
            <div className="stat-title">Merchant</div>
            <div className="stat-value skeleton h-12 w-32 bg-opacity-10"></div>
          </div>
        </div>
      </div>

      <TableLoading Type="History" length={7} />
    </div>
  );
}
