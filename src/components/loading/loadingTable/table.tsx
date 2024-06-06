import React from "react";

const TableLoading = ({ Type, length }: { Type: string; length: number }) => {
  const columns: { [key: string]: string[] } = {
    User: ["Name", "Role", "Status", "Contact", "Action"],
    Product: [
      "Model",
      "Serial Number",
      "Status",
      "Merchant",
      "Bank",
      "History",
    ],
    Merchant: ["Name", "Address", "Contact", "Action"],
    History: ["Time", "Description", "User", "Category", "Image"],
  };

  const columnHeaders = columns[Type] || [];

  const TableRow: React.FC<{ item: number }> = ({ item }) => {
    return (
      <tr key={item}>
        {columnHeaders.map((header, index) => (
          <td key={index} className={`py-2 px-4 h-[8vh]`}>
            <div className="skeleton h-5 bg-opacity-10"></div>
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div
      className={`${
        Type === "History" ? "min-h-[50vh]" : "min-h-[70vh]"
      } mt-3 w-[80vw]`}
    >
      <table className="table table-fixed w-full text-center">
        <thead>
          <tr>
            {columnHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: length }).map((_, index) => (
            <TableRow key={index} item={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoading;
