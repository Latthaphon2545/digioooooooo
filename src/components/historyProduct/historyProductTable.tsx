import React, { useState } from "react";
import { randomBytes } from "crypto";
import ViewImg from "./historyProductViewImg";
import HistoryProductEdit from "./historyProductEdit";
import Modal from "../modal";

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

  const handleEditData = (data: any) => {
    setBoolEdit(!boolEdit);
    setBool(!bool);
    setEditingItem(data);
    console.log(data);
  };

  const TableRow = ({ item }: { item: any }) => {
    return (
      <tr key={item.id}>
        <td className={`py-2 px-4 h-[8vh]`}>{item.time}</td>
        <td className={`py-2 px-4 h-[8vh]`}>
          <Modal
            title={<p>Description</p>}
            titleContent={"Description"}
            content={<p>{item.description}</p>}
          />
        </td>
        <td className={`py-2 px-4 h-[8vh]`}>{item.user}</td>
        <td className={`py-2 px-4 h-[8vh]`}>{item.category}</td>
        <td className={`py-2 px-4 h-[8vh]`}>
          <ViewImg />
        </td>
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
