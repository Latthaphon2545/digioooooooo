"use client";

import React, { useState } from "react";
import Pagination from "./pagination";
import Table from "./table";
import Header from "./header";
import { useRouter } from "next/navigation";
import { SearchContext } from "./searchContext";


interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  colorStatus: string;
}

const ITEMPERPAGE = 8;

export default function TablePage({ data, colorStatus }: TablePageProps) {
  const router = useRouter();
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

  // router.push(`/Game?filter=&search=`);

  return (
    <>
      <div className="container mx-auto my-5 px-4 py-4 border-2 border-black">
        <Header />
        <Table
          dataForCurrentPage={dataForCurrentPage}
          colorUserStatus={colorUserStatus}
          editor={true}
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
