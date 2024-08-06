"use client";

import TablePageProductHistory from "@/components/table/historyProduct/historyProductTablePage";
import LoadingHistory from "@/components/loading/loadingHistory/loadingHistory";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { hexToString, decode } from "@/lib/generateRandomHref";
import GetHistory from "@/app/(withAutn)/users/history/[id]/page";

export default function Page({ params }: { params: { slug: string } }) {
  const [dataHistory, setDataHistory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const path = useSearchParams();
  const { skip, take } = decode(path.toString());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get(
          `/api/products/getHistory?sn=${hexToString(
            params.slug
          )}&skip=${skip}&take=${take}`
        );

        const data = res.data;
        const dataCustomer = data.product;
        const history = data.productsHistory;
        const lengthHistory = data.lengthHistory;

        setDataHistory(history);
        setDataProduct(dataCustomer);
        setTotalPages(lengthHistory);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getHistory();
  }, [skip, take]);

  return (
    <>
      <div className="h-full">
        {loading ? (
          <LoadingHistory />
        ) : (
          <TablePageProductHistory
            data={dataHistory}
            dataCustomer={dataProduct}
            editor={false}
            totalLength={totalPages}
            skip={parseInt(skip)}
          />
        )}
      </div>
    </>
  );
}
