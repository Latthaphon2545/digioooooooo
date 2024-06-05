"use client";

import React, { useState } from "react";
import Table from "./historyProductTable";
import { usePathname } from "next/navigation";
import Header from "./historyProductHeader";
import Pagination from "../table/pagination";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  dataCustomer: {
    [key: string]: any;
  }[];
  editor?: boolean;
  lengthHistory: number;
}

let ITEMPERPAGE = 8;

export default function TablePageProductHistory({
  data,
  dataCustomer,
  editor,
  lengthHistory,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container px-4 mx-5">
        <Header data={dataCustomer} />
        <Table dataForCurrentPage={data} editor={editor} />
        <Pagination
          currentPage={currentPage}
          totalPages={lengthHistory}
          lengthData={data.length}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
