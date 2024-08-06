"use client";

import Container from "@/components/container/containerTable";
import FloatingActionButton from "@/components/floatingActionButton";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";
import TablePageMerchants from "@/components/table/merchantsTable/merchantsTablePage";
import { GetMerchant } from "@/lib/actions/merchantPage/getMerchant/action";
import { useEditor } from "@/lib/context/EditorProvider";
import { decode } from "@/lib/generateRandomHref";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function productmanagement() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);

  const [loading, setLoading] = useState(true);

  const path = useSearchParams();
  const { search, skip, take } = decode(path.toString());

  const isEditor = useEditor();

  useEffect(() => {
    const updateData = async () => {
      const res = await GetMerchant(search, skip, take, setLoading);
      setData(res.merchant);
      setDataLength(res.totalMerchant);
    };
    updateData();
  }, [search, skip, take]);

  return (
    <>
      <Container
        isEditor={isEditor}
        title="Merchant"
        Loading={loading}
        LoadingChild={<TablePageLoading Type="Merchant" />}
        Child={
          <TablePageMerchants
            data={data}
            editor={isEditor}
            totalLength={dataLength}
            skip={parseInt(skip)}
          />
        }
        NavigatorBtn="/merchants/add"
        textBtn="Add Merchant"
        AlertDialog={<></>}
        FloatingActionButton={<FloatingActionButton page="merchant" />}
      />
    </>
  );
}
