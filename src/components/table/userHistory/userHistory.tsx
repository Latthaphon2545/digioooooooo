"use client";
import React, { useEffect, useState } from "react";
import TableUserHistory from "./table";
import { itemPage } from "../compo/staticPropsInTable";
import Pagination from "../pagination/pagination";

type UserHistoryProps = {
  history: any[];
  editor: boolean;
  totalHistory: number;
  skip: number;
};

export default function UserHistory({
  history,
  editor,
  totalHistory,
  skip,
}: UserHistoryProps) {
  const [currentPage, setCurrentPage] = useState(
    skip === 0 ? 1 : Math.ceil(skip / itemPage) + 1
  );
  const [totalPages, setTotalPages] = useState(0);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getLengthUsers = async () => {
      if (totalHistory === 0) return;
      const totalPages = Math.ceil(totalHistory / itemPage);
      setTotalPages(totalPages);
    };
    getLengthUsers();
  }, [totalHistory]);

  return (
    <div className="h-full">
      <div className="font-bold text-3xl pt-4 pl-4 hidden sm:block ">
        My history
      </div>
      <div className="flex flex-col items-center sm:pt-20 justify-start h-full">
        <TableUserHistory historyData={history} isEditor={editor} />
        <div className="">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            lengthData={totalHistory}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
