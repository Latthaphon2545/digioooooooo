"use client";

import TablePageProduct from "@/components/productTable/productTablePage";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function productmanagement() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const path = useSearchParams();
  const filter = path.get("filter") || "";
  const search = path.get("search") || "";
  const skip = path.get("skip") || "";
  const take = path.get("take") || "";

  useEffect(() => {
    const updateData = async () => {
      try {
        const res = await axios.get(
          `/api/products/getProduct?filter=${filter}&search=${search}&skip=${skip}&take=${take}`
        );
        setData(res.data.products);
        setDataLength(res.data.totalProducts);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    updateData();
  }, [filter, search, skip, take]);

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
          <TablePageProduct
            data={data}
            editor={false}
            totalLength={dataLength}
          />
        </div>
      </div>
    </>
  );
}
