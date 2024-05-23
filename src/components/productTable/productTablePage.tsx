"use client";

import React, { useState } from "react";
import Pagination from "./productPagination";
import Table from "./productTable";
import Header from "./productHeader";
import { usePathname } from "next/navigation";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  colorStatus: string;
  editor: boolean;
}

let ITEMPERPAGE = 6;

export default function TablePageProduct({
  data,
  colorStatus,
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

  const colorUserStatus = (status: string) => {
    status = status.toLocaleLowerCase();
    let color = "";
    if (colorStatus === "product") {
      if (status === "installed") {
        color = "primary";
      } else if (status === "in stock") {
        color = "success";
      } else if (status === "Lost") {
        color = "";
      } else if (status === "damaged") {
        color = "error";
      } else if (status === "repairing") {
        color = "warning";
      } else if (status === "waiting for repair") {
        color = "neutral";
      }
    }
    return color;
  };

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <Header />
        <Table
          dataForCurrentPage={dataForCurrentPage}
          colorUserStatus={colorUserStatus}
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
