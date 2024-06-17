import React, { useState, useEffect } from "react";
import ViewImg from "./historyProductViewImg";
import HistoryProductEdit from "./historyProductEdit";
import Modal from "../modal";
import { convertStatus } from "../table/productTable/productTable";
import { colorProductStatus } from "../table/productTable/productTablePage";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  editor?: boolean;
}

export default function Table({ dataForCurrentPage, editor }: TableProps) {
  const [bool, setBool] = useState(false);
  const [boolEdit, setBoolEdit] = useState(editor);
  const [editingItem, setEditingItem] = useState(null);
  const [manyCheckInstock, setManyCheckInstock] = useState(0);

  useEffect(() => {
    const filterInstock = dataForCurrentPage.filter((item) =>
      item.category.includes("INSTOCK")
    );
    setManyCheckInstock(filterInstock.length);
  }, [dataForCurrentPage]);

  const handleEditData = (data: any) => {
    setBoolEdit(!boolEdit);
    setBool(!bool);
    setEditingItem(data);
    console.log(data);
  };

  const handleShowManyCheckInstock = (description: string) => {
    if (description === "Check stock") {
      return "Check stock" + ` (${manyCheckInstock - 1})`;
    }
    return description;
  };

  const TableRow = ({ item }: { item: any }) => {
    return (
      <tr key={item.id}>
        <td className={`py-2 px-4 h-[8vh]`}>{item.time}</td>
        <td className={`py-2 px-4 h-[8vh]`}>
          {handleShowManyCheckInstock(item.description)}
        </td>
        <td className={`py-2 px-4 h-[8vh]`}>{item.user}</td>
        <td className={`py-2 px-4 h-[8vh]`}>
          <div
            className={`badge badge-${colorProductStatus(
              convertStatus(item.category)
            )} badge-outline badge-md`}
          >
            <p>{convertStatus(item.category)}</p>
          </div>
        </td>
        <td className={`py-2 px-4 h-[8vh]`}>
          <ViewImg />
        </td>
        {editor && (
          <td className={`py-2 px-4 h-[8vh]`}>
            <button onClick={() => handleEditData(item)}>Edit</button>
          </td>
        )}
      </tr>
    );
  };

  return (
    <div className={`min-h-[50vh] mt-3`}>
      <table className="table table-fixed w-full text-center">
        <thead>
          <tr>
            <th>Time</th>
            <th>Description</th>
            <th>User</th>
            <th>Category</th>
            <th>Image</th>
            {editor && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {dataForCurrentPage.map((item) => {
            return <TableRow key={item.id} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
