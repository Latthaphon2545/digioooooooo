"use client";

import { useState } from "react";
import Pagination from "./pagination";
import Table from "./table";
import SearchBar from "./searchBar";

interface TablePageProps {
    data: {
        [key: string]: any;
    }[],
    colorStatus: string;
}

const ITEMPERPAGE = 8;

export default function TablePage({ data, colorStatus }: TablePageProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / ITEMPERPAGE);
    let dataForCurrentPage = data.slice((currentPage - 1) * ITEMPERPAGE, currentPage * ITEMPERPAGE);

    const colorUserStatus = (status: string) => {
        status = status.toLocaleLowerCase()
        let color = ""
        if (colorStatus === "user") {
            if (status === "active") {
                color = "success"
            } else if (status === "inactive") {
                color = ""
            } else if (status === "restricted") {
                color = "error"
            } else if (status === "pending") {
                color = "neutral"
            }
        }
        return color
    }

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <div className="container mx-auto my-5 px-4 py-4 border-2 border-black">
                <SearchBar />
                <Table dataForCurrentPage={dataForCurrentPage} colorUserStatus={colorUserStatus} />
                <Pagination currentPage={currentPage} totalPages={totalPages} lengthData={data.length} onPageChange={onPageChange} />
            </div>
        </>
    )
}
