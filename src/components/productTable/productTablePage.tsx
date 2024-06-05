"use client";

import React, { useEffect, useState } from "react";
import Pagination from "../table/pagination";
import Table from "./productTable";
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

export default function TablePageProduct({
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

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="ml-[3vw]">
        <Header option="Product" />
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

export const colorProductStatus = (status: string) => {
  status = status.toLocaleLowerCase();
  let color = "";
  if (status === "installed") {
    color = "primary";
  } else if (status === "in stock") {
    color = "success";
  } else if (status === "lost") {
    color = "";
  } else if (status === "damaged") {
    color = "error";
  } else if (status === "reparing") {
    color = "warning";
  } else if (status === "waiting for repair") {
    color = "secondary";
  } else if (status === "installing") {
    color = "accent";
  }
  return color;
};
