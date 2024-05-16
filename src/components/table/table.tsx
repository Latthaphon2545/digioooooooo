"use client";

import { useState } from "react";
import Pagination from "./pagination";

export default function Table() {
    const data = Array.from({ length: 100 }, (_, i) => ({
        name: `Person ${i + 1}`,
        email: `person${i + 1}@digio.co.th`,
        role: i % 2 === 0 ? "Admin" : "Operator",
        status: ["Pending", "Active", "Restricted", "Inactive"][i % 4],
        Contact: `081-234-567${i % 10}`
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    let dataForCurrentPage = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const colorUserStatus = (status: string) => {
        status = status.toLocaleLowerCase()
        let color = ""
        if (status === "active") {
            color = "success"
        } else if (status === "inactive") {
            color = ""
        } else if (status === "restricted") {
            color = "error"
        } else if (status === "pending") {
            color = "neutral"
        }
        return color
    }

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <div className="container mx-auto my-5 px-4 py-4 border-2 border-black">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-base-200 text-center">
                                <th>Name</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        {dataForCurrentPage.map((item) => {
                            return (
                                <tbody key={item.name}>
                                    <tr>
                                        <td>
                                            <span>
                                                <p className="text-base">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.email}</p>
                                            </span>
                                        </td>
                                        <td className="text-center">{item.role}</td>
                                        <td className="text-center">
                                            <span className={`badge badge-${colorUserStatus(item.status)} badge-outline`}>{item.status}</span>
                                        </td>
                                        <td className="text-center">{item.Contact}</td>
                                    </tr>
                                </tbody>
                            )
                        }
                        )}
                    </table>
                </div>
                <div className="flex justify-center mt-5">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                </div>
            </div>
        </>
    )
}
