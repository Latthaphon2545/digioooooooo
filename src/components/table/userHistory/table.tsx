import React, { useState } from "react";
import ViewImg from "../historyProduct/historyProductViewImg";
import { ConvertTime } from "@/components/dateTime";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import Link from "next/link";
import { ColorProductStatus } from "../color";
import { stringToHex } from "@/lib/generateRandomHref";

import TableRow from "./tableRow";
import { ShowAlert } from "../showAlert";
import { updateUserHistory } from "./action/updateUserHistory";
import AlertDialog from "@/components/alertDialog";

type TableUserHistoryProps = {
  historyData: {
    [key: string]: any;
  }[];
  isEditor: boolean;
};

export default function TableUserHistory({
  historyData,
  isEditor,
}: TableUserHistoryProps) {
  const [updateAlert, setUpdateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  const handleUpdateWrapper = async (
    id: string,
    history: { description: string; category: string }
  ) => {
    await updateUserHistory(id, history, {
      historyData,
      setUpdateAlert,
      showAlert: ShowAlert,
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setIsEditing,
    });
  };

  return (
    <>
      <div className="mobile:hidden tablet:hidden laptop:block">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              <th>Time</th>
              <th>Description</th>
              <th>Status</th>
              <th>Product</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => {
              return (
                <TableRow
                  key={item.id}
                  item={item}
                  isEditor={isEditor}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  handleUpdateUserHistory={handleUpdateWrapper}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mobile:block laptop:hidden">
        {historyData.map((item) => {
          const { formattedDate } = ConvertTime(item.createdAt);
          return (
            <div key={item.id} className="mt-3 card bg-base-100 w-96 shadow-xl">
              <div className="card-body">
                <div className="card-title flex justify-between">
                  <Link
                    href={`/products/history/${stringToHex(
                      item.product.serialNumber
                    )}?skip=0&take=7`}
                    className="link link-primary"
                  >
                    {item.product.serialNumber.slice(0, 6) + "XXXX"}
                  </Link>
                  <div>
                    <h2 className="text-sm">{formattedDate}</h2>
                  </div>
                </div>
                <p>{item.description}</p>
                <div className="flex justify-between">
                  <div
                    className={`badge badge-${ColorProductStatus(
                      ConvertStatus(item.category)
                    )} badge-outline badge-md`}
                  >
                    <p>{ConvertStatus(item.category)}</p>
                  </div>
                  <ViewImg id={item.id} image={item.imageProve} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-4 left-[15%] w-[20%]">
        {updateAlert && (
          <AlertDialog
            title={alertTitle}
            styles={alertStyles}
            icon={alertIcon}
          />
        )}
      </div>
    </>
  );
}
