"use client";

import React, { useState } from "react";
import Pagination from "./pagination";
import Table from "./table";
import Header from "./header";
import { usePathname, useRouter } from "next/navigation";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  colorStatus: string;
  editor: boolean;
}

export default function TablePage({
  data,
  colorStatus,
  editor,
}: TablePageProps) {
  const pathname = usePathname();
  const ITEMPERPAGE = pathname === "/users/management" ? 7 : 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMPERPAGE);
  let dataForCurrentPage = data.slice(
    (currentPage - 1) * ITEMPERPAGE,
    currentPage * ITEMPERPAGE
  );

  const colorUserStatus = (status: string) => {
    status = status.toLocaleLowerCase();
    let color = "";
    if (colorStatus === "user") {
      if (status === "active") {
        color = "success";
      } else if (status === "inactive") {
        color = "";
      } else if (status === "restricted") {
        color = "error";
      } else if (status === "pending") {
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
