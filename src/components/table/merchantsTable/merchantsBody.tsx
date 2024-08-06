import React, { useState } from "react";
import AlertDialog from "@/components/alertDialog";
import { handleEditToggle } from "../handleEditToggle";
import { DestopView } from "./view/DestopView";
import { MobileView } from "./view/MobileView";
import { updateMerchant } from "@/lib/actions/merchantPage/updateMerchant/action";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  editor?: boolean;
}

export default function Table({ dataForCurrentPage, editor }: TableProps) {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [isUpdating, setIsUpdating] = useState<{ [key: string]: boolean }>({});

  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const handleUpdate = async (
    id: string,
    merchant: { name: string; address: string; contact: string }
  ) => {
    const res = await updateMerchant(
      id,
      merchant,
      setIsUpdating,
      setIsEditing,
      isUpdating,
      isEditing,
      dataForCurrentPage,
      setAlertTitle,
      setAlertStyles,
      setAlertIcon
    );
  };

  return (
    <>
      <div className="min-h-[63vh] mt-3 w-[80vw] mobile:hidden tablet:hidden laptop:block">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Product Serial Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataForCurrentPage.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-2 px-4 h-[8vh]">
                  No data available
                </td>
              </tr>
            )}
            {dataForCurrentPage.map((item) => (
              <DestopView
                key={item.id}
                item={item}
                isEditing={isEditing}
                editor={editor}
                setIsEditing={setIsEditing}
                handleUpdate={handleUpdate}
                isUpdating={isUpdating}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile:block tablet:block laptop:hidden pb-5">
        {dataForCurrentPage.map((item) => (
          <div key={item.id} className="mt-3">
            <MobileView
              item={item}
              editor={editor}
              setIsEditing={setIsEditing}
              handleUpdate={handleUpdate}
              isUpdating={isUpdating}
            />
          </div>
        ))}
      </div>

      <AlertDialog
        alertTitle={alertTitle}
        styles={alertStyles}
        icon={alertIcon}
        id={"alertMerchant"}
        setAlertTitle={setAlertTitle}
      />
    </>
  );
}
