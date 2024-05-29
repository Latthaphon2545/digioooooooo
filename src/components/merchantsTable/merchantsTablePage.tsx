"use client";

import React, { useEffect, useState } from "react";
import Pagination from "../table/pagination";
import Table from "./merchantsTable";
import Header from "../table/header";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  editor: boolean;
  totalLength: number;
}

const getItemPerPage = (height: number) => {
  return 8;
};

export default function TablePageMerchants({
  data,
  editor,
  totalLength,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(getItemPerPage(1));
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getLengthUsers = async () => {
      if (totalLength === 0) return;
      const totalPages = Math.ceil(totalLength / itemPerPage);
      setTotalPages(totalPages);
    };
    getLengthUsers();
  }, [totalLength, itemPerPage]);

  const colorProductStatus = (status: string) => {
    status = status.toLocaleLowerCase();
    let color = "";
    return color;
  };

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="ml-[3vw]">
        <Header option="" />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <Table
          dataForCurrentPage={data}
          colorProductStatus={colorProductStatus}
          editor={editor}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          lengthData={totalLength}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
