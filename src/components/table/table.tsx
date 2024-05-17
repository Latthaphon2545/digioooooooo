import React from "react";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  colorUserStatus: (status: string) => string;
}

export default function Table({
  dataForCurrentPage,
  colorUserStatus,
}: TableProps) {
  return (
    <div className="min-h-[70vh]">
      <table className="table">
        <thead>
          <tr className="text-center">
            <th className="min-w-[18vw]">Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {dataForCurrentPage.map((item) => {
            return (
              <tr className="content-start">
                <td>
                  <span>
                    <p className="text-base">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.email}</p>
                  </span>
                </td>
                <td className="text-center">{item.role}</td>
                <td className="text-center">
                  <span
                    className={`badge badge-${colorUserStatus(
                      item.status
                    )} badge-outline`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-center">{item.Contact}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
