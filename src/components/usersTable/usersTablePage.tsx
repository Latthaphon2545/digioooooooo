"use client";

import React, { useState, useEffect } from "react";
import Pagination from "./usersPagination";
import Table from "./usersTable";
import Header from "./usersHeader";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  colorStatus: string;
  editor: boolean;
}

const getItemPerPage = (height: number) => {
  // if (height > 1000) return 10;
  return 8;
};

export default function TablePage({
  data,
  colorStatus,
  editor,
}: TablePageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(getItemPerPage(1));

  const totalPages = Math.ceil(data.length / itemPerPage);
  let dataForCurrentPage = data.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
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
        color = "secondary";
      }
    }
    return color;
  };

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="ml-[3vw]">
        <Header />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
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
