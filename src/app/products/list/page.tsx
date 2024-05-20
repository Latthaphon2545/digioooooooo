import TablePageProduct from "@/components/productTable/productTablePage";
import { randomInt } from "crypto";
import React from "react";

export default function prodictList() {
  const data = Array.from({ length: 33 }, (_, i) => ({
    model: `Model ${i + 1}`,
    serialNumber: randomInt(1000000000, 9999999999),
    status: [
      "Installed",
      "In Stock",
      "Lost",
      "Damaged",
      "Repairing",
      "Waiting for Repair",
    ][randomInt(0, 6)],
    merchant: `Merchant ${i + 1}`,
    bank: `Bank ${i + 1}`,
  }));

  return (
    <>
      <div className="flex flex-row min-h-screen">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5 ">
            <h1
              className="
            text-3xl
            font-bold
            mt-5
            mb-5
          "
            >
              Product List
            </h1>
          </div>
          <TablePageProduct data={data} colorStatus="product" editor={false} />
        </div>
      </div>
    </>
  );
}
