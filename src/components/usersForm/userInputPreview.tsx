import { DataItem, Role } from "@/lib/types";
import React from "react";

export default function UserInputPreview({ data }: { data: DataItem[] }) {
  const checkEmail = (email: string, index: number) => {
    const isDuplicate = data
      .slice(0, index)
      .some((item) => item.email === email);
    return email.endsWith("@digio.co.th") && !isDuplicate;
  };

  const checkRole = (role: string) => {
    role = role.toUpperCase().replace(/ +/g, "");
    return Object.values(Role).includes(role as Role);
  };

  return (
    <div>
      <table className="table">
        <thead className="text-xl">
          <tr>
            <th>No.</th>
            <th>Email</th>
            <th className="hidden sm:block">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="text-xl font-medium">{index + 1}.</td>
              <td
                className={`text-xl font-medium ${
                  checkEmail(row.email ?? "", index)
                    ? "text-success"
                    : "text-error"
                }`}
              >
                {row.email}
              </td>
              <td
                className={`text-xl font-medium hidden sm:block ${
                  checkRole(row.role ?? "") ? "text-success" : "text-error"
                }`}
              >
                {row.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
