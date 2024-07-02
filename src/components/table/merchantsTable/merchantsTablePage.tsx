"use client";

import React, { useEffect, useState } from "react";
import Header from "../header";
import Table from "./merchantsTable";
import Pagination from "../pagination";
import { itemPage } from "../staticPropsInTable";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  editor: boolean;
  totalLength: number;
  skip: number;
}

export default function TablePageMerchants({
  data,
  editor,
  totalLength,
  skip,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(
    skip === 0 ? 1 : Math.ceil(skip / itemPage) + 1
  );
  const [itemPerPage, setItemPerPage] = useState(itemPage);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getLengthUsers = async () => {
      if (totalLength === 0) return;
      const totalPages = Math.ceil(totalLength / itemPerPage);
      setTotalPages(totalPages);
    };
    getLengthUsers();
  }, [totalLength, itemPerPage]);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="ml-[3vw]">
        <Header option="" />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <Table dataForCurrentPage={data} editor={editor} />
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
