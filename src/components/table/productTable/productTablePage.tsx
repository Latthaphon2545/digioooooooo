"use client";

import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import Pagination from "../pagination/pagination";
import { itemPage } from "../compo/staticPropsInTable";
import Table from "./bodyProduct";
import { getDataBank } from "@/lib/actions/getDataBankfillter/action";
import { currentPageCal, getLengthTable } from "../compo/getLength";
import { TablePageProps } from "../compo/TableProps";

export default function TablePageProduct({
  data,
  editor,
  totalLength,
  skip,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(
    currentPageCal({ itemPage, skip })
  );
  const [totalPages, setTotalPages] = useState(0);
  const [bank, setBank] = useState<any[]>([]);

  const action = async () => {
    const res = await getDataBank();
    setBank(res);
  };

  useEffect(() => {
    getLengthTable({
      totalLength,
      setTotalPages,
      setCurrentPage,
      action,
      itemPage,
    });
  }, [totalLength, itemPage]);

  return (
    <>
      <div className="ml-[3vw]">
        <Header option="Product" />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <Table dataForCurrentPage={data} bankData={bank} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          lengthData={totalLength}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
