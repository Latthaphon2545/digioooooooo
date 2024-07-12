"use client";

import React, { useEffect, useState } from "react";
import Table from "./historyProductBody";
import Header from "./historyProductHeader";
import Pagination from "../pagination/pagination";
import { itemPage } from "../compo/staticPropsInTable";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  dataCustomer: {
    [key: string]: any;
  };
  editor?: boolean;
  lengthHistory: number;
  skip: number;
}

export default function TablePageProductHistory({
  data,
  dataCustomer,
  editor,
  lengthHistory,
  skip,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(
    skip === 0 ? 1 : Math.ceil(skip / itemPage) + 1
  );
  const [totalPages, setTotalPages] = useState(0);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getLengthUsers = async () => {
      if (lengthHistory === 0) return;
      const totalPages = Math.ceil(lengthHistory / itemPage);
      setTotalPages(totalPages);
    };
    getLengthUsers();
  }, [lengthHistory, itemPage]);

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
            lengthData={lengthHistory}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}
