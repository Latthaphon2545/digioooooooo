"use client";

import React, { useState, useEffect } from "react";
import Pagination from "../pagination";
import Table from "./usersTable";
import Header from "../header";
import { itemPage } from "../staticPropsInTable";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  colorStatus: string;
  editor: boolean;
  totalLength: number;
}

export default function TablePage({
  data,
  colorStatus,
  editor,
  totalLength,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(1);
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
        <Header option="User" />
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
