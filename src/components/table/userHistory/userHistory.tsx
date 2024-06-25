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
    <div className="">
      <TableUserHistory history={history} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        lengthData={totalHistory}
        onPageChange={onPageChange}
      />
    </div>
  );
}
