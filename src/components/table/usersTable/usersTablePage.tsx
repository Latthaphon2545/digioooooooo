"use client";

import React, { useState, useEffect } from "react";
import Pagination from "../pagination/pagination";
import BodyUsers from "./bodyUsers";
import Header from "../Header/header";
import { itemPage } from "../compo/staticPropsInTable";
import { currentPageCal, getLengthTable } from "../compo/getLength";
import { TablePageProps } from "../compo/TableProps";

export default function TablePage({
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
        <Header option="User" />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <BodyUsers dataForCurrentPage={data} editor={editor} />
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
