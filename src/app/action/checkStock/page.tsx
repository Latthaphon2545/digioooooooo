import CheckStockPage from "@/components/checkStock/checkStockPage";
import React from "react";

export default function CheckStock() {
  return (
    <>
      <div className="flex flex-row mx-5">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mt-5 mb-1 h-14">
            <h1 className="text-3xl font-bold">Check Stock</h1>
          </div>
          <div className="flex justify-end mx-5"></div>
          <CheckStockPage />
        </div>
      </div>
    </>
  );
}
