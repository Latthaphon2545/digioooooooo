import React, { useState, useEffect } from "react";
import ViewImg from "./historyProductViewImg";
import Modal from "../../modal";
import { ConvertTime } from "../../dateTime";
import { ConvertStatus } from "../../convertStatusAndRole";
import { ColorProductStatus } from "../color";

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
    const { formattedDate, displayTime } = ConvertTime(item.time);
    return (
      <tr key={item.id}>
        <td className={`py-2 px-4 h-[8vh]`}>
          <span>
            <h1 className="text-sm">{formattedDate}</h1>
            <h1 className="text-sm">{displayTime}</h1>
          </span>
        </td>
        <td className={`py-2 px-4 h-[8vh]`}>
          {item?.description.length > 20 ? (
            <Modal
              title={`${item.description.slice(0, 20)}...`}
              content={item.description}
              id={item.id}
              boolClose={true}
            />
          ) : (
            handleShowManyCheckInstock(item.description)
          )}
        </td>
        <td className={`py-2 px-4 h-[8vh]`}>{item.user}</td>
        <td className={`py-2 px-4 h-[8vh]`}>
          <div
            className={`badge badge-${ColorProductStatus(
              ConvertStatus(item.category)
            )} badge-outline badge-md`}
          >
            <p>{ConvertStatus(item.category)}</p>
          </div>
        </td>
        <td className={`py-2 px-4 h-[8vh]`}>
          <ViewImg id={item.id} image={item.imageProv} />
        </td>
        {editor && (
          <td className={`py-2 px-4 h-[8vh]`}>
            <button onClick={() => handleEditData(item)}>Edit</button>
          </td>
        )}
      </tr>
    );
  };

  const mobileData = ({ item }: { item: any }) => {
    const { formattedDate, displayTime } = ConvertTime(item.time);
    return (
      <div className="card w-[90vw] bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <div className="card-title flex-col">
            <div className="flex w-full justify-between items-center">
              <h1 className=" text-gray-500 text-sm">{formattedDate}</h1>
              <h1 className=" text-gray-500 text-sm">{displayTime}</h1>
            </div>
            <div className="divider my-0"></div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-base">
              {handleShowManyCheckInstock(item.description)}
            </div>

            <div className="flex flex-col justify-between gap-2">
              <div className="flex justify-between items-center">
                <div>User</div>
                <div>{item.user}</div>
              </div>

              <div className="flex justify-between items-center">
                <div>Image</div>
                <div>
                  <ViewImg id={item.id} image={item.imageProv} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mobile:hidden tablet:hidden laptop:block">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              <th></th>
              {/* <th></th> */}
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

      <div className="mobile:block tablet:block laptop:hidden pb-5">
        {dataForCurrentPage.map((item) => (
          <div key={item.id} className="mt-3">
            {mobileData({ item })}
          </div>
        ))}
      </div>
    </>
  );
}
