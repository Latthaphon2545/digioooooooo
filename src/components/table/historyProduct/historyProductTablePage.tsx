"use client";

import React, { useEffect, useState } from "react";
import Table from "./historyProductTable";
import Header from "./historyProductHeader";
import Pagination from "../pagination";
import { itemPage } from "../staticPropsInTable";
import Link from "next/link";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  dataCustomer: {
    [key: string]: any;
  };
  editor?: boolean;
  lengthHistory: number;
}

export default function TablePageProductHistory({
  data,
  dataCustomer,
  editor,
  lengthHistory,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(1);
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
