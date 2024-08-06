"use client";

import React, { useEffect, useState } from "react";
import Table from "./historyProductBody";
import Header from "./historyProductHeader";
import Pagination from "../pagination/pagination";
import { itemPage } from "../compo/staticPropsInTable";
import { currentPageCal, getLengthTable } from "../compo/getLength";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  dataCustomer: {
    [key: string]: any;
  };
  editor?: boolean;
  totalLength: number;
  skip: number;
}

export default function TablePageProductHistory({
  data,
  dataCustomer,
  editor,
  totalLength,
  skip,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(
    currentPageCal({ itemPage, skip })
  );
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getLengthTable({
      totalLength,
      setTotalPages,
      setCurrentPage,
      itemPage,
    });
  }, [totalLength, itemPage]);

  return (
    <>
      <div className="flex flex-col px-5 py-5 gap-4 items-center justify-center h-full overflow-x-hidden">
        <div>
          <Header data={dataCustomer} />
        </div>
        <div className="flex flex-col h-full justify-between">
          <Table dataForCurrentPage={data} editor={editor} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            lengthData={totalLength}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
