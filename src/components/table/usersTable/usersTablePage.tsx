"use client";

import React, { useState, useEffect } from "react";
import Pagination from "../pagination";
import Table from "./usersTable";
import Header from "../header";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  colorStatus: string;
  editor: boolean;
  totalLength: number;
}

const getItemPerPage = (height: number) => {
  return 8;
};

export default function TablePage({
  data,
  colorStatus,
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
        <Header option="User" />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <Table
          dataForCurrentPage={data}
          colorUserStatus={colorUserStatus}
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
