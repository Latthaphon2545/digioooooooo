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

  console.log(dataForCurrentPage);

  const handleEditData = (data: any) => {
    setBoolEdit(!boolEdit);
    setBool(!bool);
    setEditingItem(data);
    console.log(data);
  };

  return (
    <div className={`min-h-[50vh] mt-3`}>
      <table className="table table-fixed w-full">
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
            // const isEditing = editingItem === item;
            return (
              <tr key={item.time}>
                {/* Time */}
                <td>
                  <p>{item.time}</p>
                </td>

                {/* Description */}
                <td>
                  {/* <div
                    className={`tooltip ${
                      openedTooltip === item ? "tooltip-open" : ""
                    } tooltip-right`}
                    data-tip={item.description}
                  >
                    <button
                      className={`btn ${
                        openedTooltip === item ? "btn-success" : ""
                      } hover:btn-success`}
                      onClick={() =>
                        setOpenedTooltip(openedTooltip === item ? null : item)
                      }
                    >
                      Open Description
                    </button>
                    <p className="text-xs">hover or click</p>
                  </div> */}
                  <Modal
                    title={<p>Description</p>}
                    titleContent={"Description"}
                    content={<p>{item.description}</p>}
                  />
                </td>

                {/* User */}
                <td>{item.user}</td>

                {/* Category */}
                <td>{item.category}</td>

                {/* Image */}
                <td>
                  <ViewImg />
                </td>

                {/* Action To Eidtor */}
                {editor && (
                  <td className={`text-center h-24`}>
                    {boolEdit && <HistoryProductEdit data={[item]} />}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
