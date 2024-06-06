import { DataItem, Role } from "@/lib/types";
import React from "react";

export default function MerchantInputPreview({ data }: { data: DataItem[] }) {
  return (
    <div>
      <table className="table">
        <thead className="text-xl">
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="text-xl font-medium">{index + 1}.</td>
              <td
                className={`overflow-scroll p-2  flex flex-row space-x-4 text-lg`}
              >
                {row.name}
              </td>
              <td className={`text-xl font-medium`}>{row.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
