import React, { useState } from "react";
import { randomBytes } from "crypto";
import ViewImg from "./historyProductViewImg";
import HistoryProductEdit from "./historyProductEdit";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  editor?: boolean;
}

const USERSTATUS = [
  "Installed",
  "In Stock",
  "Lost",
  "Damaged",
  "Repairing",
  "Waiting for Repair",
];

export default function Table({ dataForCurrentPage, editor }: TableProps) {
  const [bool, setBool] = useState(false);
  const [boolEdit, setBoolEdit] = useState(editor);
  const [editingItem, setEditingItem] = useState(null);
  const [openedTooltip, setOpenedTooltip] = useState<{
    [key: string]: any;
  } | null>(null);
  const [openImg, setOpenImg] = useState<{ [key: string]: any } | null>(null);

  const handleEditData = (data: any) => {
    setBoolEdit(!boolEdit);
    setBool(!bool);
    setEditingItem(data);
    console.log(data);
  };

  const image = [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg",
  ];

  const widthTable = 12;
  return (
    <div className={`min-h-[63vh] mt-3`}>
      <table className="table">
        <thead className="text-center">
          <tr>
            <th>time</th>
            <th>description</th>
            <th>user</th>
            <th>category</th>
            <th>Image</th>
            {editor && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {dataForCurrentPage.map((item) => {
            const isEditing = editingItem === item;
            return (
              <tr key={randomBytes(5).toString("hex")}>
                {/* Time */}
                <td className={`text-center w-1/${widthTable}`}>
                  <p>{item.time}</p>
                </td>

                {/* Description */}
                <td className={`text-center w-6/${widthTable}`}>
                  <div
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
                  </div>
                </td>

                {/* User */}
                <td className={`text-center w-1/${widthTable}`}>{item.user}</td>

                {/* Category */}
                <td className={`text-center w-1/${widthTable}`}>
                  {item.category}
                </td>

                {/* Image */}
                <td className={`w-1/${widthTable} text-center`}>
                  <ViewImg />
                </td>

                {/* Action To Eidtor */}
                {editor && (
                  <td
                    className={`text-center h-24 ${
                      boolEdit ? `w-1/${widthTable}` : ""
                    }`}
                  >
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
