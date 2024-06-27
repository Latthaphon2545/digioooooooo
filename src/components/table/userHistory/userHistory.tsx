"use client";
import React, { useEffect, useState } from "react";
import Header from "../header";
import Pagination from "../pagination";
import TableUserHistory from "./table";
import { itemPage } from "../staticPropsInTable";

type UserHistoryProps = {
  history: any[];
  editor: boolean;
  totalHistory: number;
};

export default function UserHistory({
  history,
  editor,
  totalHistory,
}: UserHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
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
      <div className="font-bold text-3xl pt-4 pl-4">
        Halo Halo Good Good Good
      </div>
      <div className="flex flex-col items-center pt-20 justify-start h-full">
        <TableUserHistory history={history} isEditor={editor} />
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
