import TablePageProduct from "@/components/productTable/productTablePage";
import { randomInt } from "crypto";
import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function productmanagement() {
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
            mb-1
          "
            >
              Product Menagement
            </h1>
          </div>
          <div className="flex justify-end mx-5">
            <button className="btn btn-primary my-2 w-40 text-lg">
              Add Product
            </button>
          </div>
          <TablePageProduct data={data} colorStatus="product" editor={true} />
        </div>
      </div>
    </>
  );
}
