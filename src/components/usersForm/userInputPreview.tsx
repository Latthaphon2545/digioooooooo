import React from "react";

export default function UserInputPreview({
  data,
}: {
  data: {
    email?: string | undefined;
    name?: string | undefined;
    contact?: string | undefined;
    sn?: string | undefined;
    model?: string | undefined;
  }[];
}) {
  const checkEmail = (email: string) => {
    return email.endsWith("@digio.co.th");
  };
  return (
    <div>
      <table className="table">
        <thead className="text-xl">
          <tr>
            <th>No.</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="text-xl font-medium">{index + 1}.</td>
              <td
                className={`overflow-scroll p-2  flex flex-row space-x-4 text-lg ${
                  checkEmail(row.email ?? "") ? "text-success" : "text-error"
                }`}
              >
                {row.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
