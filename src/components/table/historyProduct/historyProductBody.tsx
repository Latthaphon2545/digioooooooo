import React, { useState, useEffect } from "react";
import ViewImg from "./view/historyProductViewImg";
import Modal from "../../modal";
import { ConvertTime } from "../../dateTime";
import { ConvertStatus } from "../../convertStatusAndRole";
import { ColorProductStatus } from "../color";
import { DesktopView } from "./view/desktopView";
import { MobileData } from "./view/mobileView";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  editor?: boolean;
}

export default function Table({ dataForCurrentPage, editor }: TableProps) {
  const [bool, setBool] = useState(false);
  const [boolEdit, setBoolEdit] = useState(editor);
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
    console.log(data);
  };

  return (
    <>
      <div className="min-h-[63vh] mt-3 w-[80vw] mobile:hidden tablet:hidden laptop:block">
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
              return (
                <DesktopView
                  key={item.id}
                  item={item}
                  manyCheckInstock={manyCheckInstock}
                  editor={editor}
                  handleEditData={handleEditData}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mobile:block tablet:block laptop:hidden pb-5">
        {dataForCurrentPage.map((item) => (
          <div key={item.id} className="mt-3">
            return (
            <MobileData item={item} manyCheckInstock={manyCheckInstock} />
            );
          </div>
        ))}
      </div>
    </>
  );
}
