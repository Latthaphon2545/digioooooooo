"use client";

import ActionButton from "@/components/actionButton";
import FloatingActionButton from "@/components/floatingActionButton";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";
import TablePageMerchants from "@/components/table/merchantsTable/merchantsTablePage";
import { decode } from "@/lib/generateRandomHref";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function productmanagement() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [isEditor, setIseditor] = useState(true);

  const [loading, setLoading] = useState(true);

  const path = useSearchParams();
  const { filter, search, skip, take } = decode(path.toString());

  useEffect(() => {
    const updateData = async () => {
      try {
        const res = await axios.get(
          `/api/merchants/getMerchant?search=${search}&skip=${skip}&take=${take}`
        );
        setData(res.data.merchant);
        setDataLength(res.data.totalMerchant);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    updateData();
  }, [search, skip, take]);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5 mt-5 mb-1 h-14 mobile:hidden laptop:flex">
            <h1 className="text-3xl font-bold">Merchant</h1>
            <div className={`${isEditor ? "" : "cursor-not-allowed"}`}>
              <Link href="/merchants/add">
                <ActionButton
                  action={() => {}}
                  styles={`btn-primary`}
                  disabled={!isEditor}
                >
                  Add Merchant
                </ActionButton>
              </Link>
            </div>
          </div>
          <FloatingActionButton page="merchant" />
          <div className="flex justify-end mx-5"></div>
          {loading ? (
            <TablePageLoading Type="Merchant" />
          ) : (
            <TablePageMerchants
              data={data}
              editor={isEditor}
              totalLength={dataLength}
              skip={parseInt(skip)}
            />
          )}
        </div>
      </div>
    </>
  );
}
