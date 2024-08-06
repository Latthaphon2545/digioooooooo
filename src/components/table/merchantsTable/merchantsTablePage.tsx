"use client";

import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import Table from "./merchantsBody";
import Pagination from "../pagination/pagination";
import { itemPage } from "../compo/staticPropsInTable";
import { currentPageCal, getLengthTable } from "../compo/getLength";

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
    currentPageCal({ itemPage, skip })
  );
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getLengthTable({
      totalLength,
      setTotalPages,
      setCurrentPage,
      itemPage,
    });
  }, [totalLength, itemPage]);

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
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
