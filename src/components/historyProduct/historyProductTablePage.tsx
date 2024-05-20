"use client";

import React, { useState } from "react";
import Table from "./historyProductTable";
import { usePathname } from "next/navigation";
import Header from "./historyProductHeader";
import Pagination from "./historyProductPagination";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  dataCustomer: {
    [key: string]: any;
  }[];
  colorStatus: string;
editor?: boolean;
}

let ITEMPERPAGE = 5;

export default function TablePageProductHistory({
  data,
  colorStatus,
  dataCustomer,
  editor,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMPERPAGE);
  let dataForCurrentPage = data.slice(
    (currentPage - 1) * ITEMPERPAGE,
    currentPage * ITEMPERPAGE
  );

  const pathname = usePathname();
  ITEMPERPAGE = pathname === "/products/list" ? 8 : ITEMPERPAGE;

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <Header data={dataCustomer} />
        <Table
          dataForCurrentPage={dataForCurrentPage}
          editor={editor}
        />
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
