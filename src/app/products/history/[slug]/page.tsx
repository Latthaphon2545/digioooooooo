"use client";

import TablePageProductHistory from "@/components/table/historyProduct/historyProductTablePage";
import LoadingHistory from "@/components/loading/loadingHistory/loadingHistory";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { hexToString, decode } from "@/lib/generateRandomHref";

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
        const dataCustomer = data.productsHistory;
        const lengthHistory = data.lengthHistory;

        const transformedHistory = dataCustomer.map((item: any) => ({
          time: new Date(item.createdAt).toString(),
          description: item.description,
          user: item.user.name,
          category: item.category,
          id: item.id,
          imageProv: item.imageProve,
        }));

        const productDetails = dataCustomer[0]?.product;

        setDataHistory(transformedHistory);
        setDataProduct(productDetails);
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
            lengthHistory={totalPages}
          />
        )}
      </div>
    </>
  );
}
