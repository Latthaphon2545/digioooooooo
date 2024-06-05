"use client";

import Header from "./header";
import Pagination from "./pagination";
import TableLoading from "./table";

export default function TablePageLoading({ Type }: { Type: string }) {
  return (
    <>
      <div className="ml-[3vw]">
        <Header Type={Type} />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <TableLoading Type={Type} />
        <Pagination />
      </div>
    </>
  );
}
