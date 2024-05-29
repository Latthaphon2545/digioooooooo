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
}

let ITEMPERPAGE = 8;

export default function TablePageProductHistory({
  data,
  dataCustomer,
  editor,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMPERPAGE);

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
          totalPages={totalPages}
          lengthData={data.length}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
