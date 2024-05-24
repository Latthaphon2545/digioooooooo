import TablePageProduct from "@/components/productTable/productTablePage";
import { randomInt } from "crypto";
import Link from "next/link";
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
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5 mt-5 mb-1 h-14">
            <h1 className="text-3xl font-bold">User Management</h1>
            <Link href={"/users/add"}>
              <button className="btn btn-primary w-40 text-lg">
                Add Product
              </button>
            </Link>
          </div>
          <div className="flex justify-end mx-5"></div>
          <TablePageProduct data={data} colorStatus="product" editor={true} />
        </div>
      </div>
    </>
  );
}
