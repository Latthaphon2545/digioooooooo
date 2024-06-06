"use client";

import TablePageProductHistory from "@/components/historyProduct/historyProductTablePage";
import LoadingHistory from "@/components/loading/loadingHistory/loadingHistory";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

// /api/products/getHistory?sn=test4&skip=0&take=8

export default function Page({ params }: { params: { slug: string } }) {
  const [dataHistory, setDataHistory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get(
          `/api/products/getHistory?sn=${params.slug}&skip=0&take=5`
        );
        const data = res.data;
        const dataCustomer = data.productsHistory;
        const lengthHistory = data.lengthHistory;

        const transformedHistory = dataCustomer.map((item: any) => ({
          time: new Date(item.createdAt).toLocaleString(),
          description: item.description,
          user: item.user.name,
          category: [item.category],
        }));

        const productDetails = dataCustomer[0]?.product;

        setDataHistory(transformedHistory);
        setDataProduct(productDetails);
        setTotalPages(lengthHistory);
      } catch (error) {
        console.log("[GET TODO]", error);
      } finally {
        setLoading(false);
        console.log("GET TODO");
      }
    };

    getHistory();
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5 mt-5 mb-1 h-14">
            <h1 className="text-3xl font-bold">
              <Link href="/products" className="curser-pointer">
                Product
              </Link>
              <span className="font-normal">{` > ${params.slug}`}</span>
            </h1>
          </div>
          <div className="flex justify-end mx-5"></div>
          {loading ? (
            <LoadingHistory />
          ) : (
            <TablePageProductHistory
              data={dataHistory}
              dataCustomer={dataProduct}
              editor={false}
              lengthHistory={totalPages}
            />
          )}
        </div>
      </div>
    </>
  );
}
