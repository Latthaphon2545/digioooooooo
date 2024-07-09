"use client";

import React, { useEffect, useState } from "react";
import Header from "../header";
import Pagination from "../pagination";
import { itemPage } from "../staticPropsInTable";
import Table from "./bodyProduct";
import { getDataBank } from "@/lib/actions/bangData/action";

interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  editor: boolean;
  totalLength: number;
  skip: number;
}

export default function TablePageProduct({
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
  const [bank, setBank] = useState<any[]>([]);

  useEffect(() => {
    const getLengthUsers = async () => {
      if (totalLength === 0) return;
      const totalPages = Math.ceil(totalLength / itemPerPage);
      setTotalPages(totalPages);
      const res = await getDataBank();
      setBank(res);
      onPageChange(1);
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
        <Table dataForCurrentPage={data} editor={editor} bankData={bank} />
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
