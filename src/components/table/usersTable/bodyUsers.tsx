import React, { useState } from "react";
import AlertDialog from "../../alertDialog";
import { DesktopView } from "./view/desktopView";
import { MobileView } from "./view/mobileView";
import { TableUserBodyProps } from "../compo/TableProps";
import { handleUpdate } from "@/lib/actions/UserPage/updateUsers/action";

export default function BodyUsers({
  dataForCurrentPage,
  editor,
}: TableUserBodyProps) {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const handleUpdateWrapper = async (
    id: string,
    user: { name: string; role: string; status: string; contact: string },
    setLoadings: (loadings: { [key: string]: boolean }) => void
  ) => {
    const res = await handleUpdate({
      id,
      user,
      dataForCurrentPage,
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setIsEditing,
      setLoadings,
    });
    return res;
  };

  return (
    <>
      <div className="min-h-[63vh] mt-3 w-[80vw] mobile:hidden tablet:hidden laptop:block">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Contact</th>
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
              <DesktopView
                key={item.id}
                item={item}
                isEditing={isEditing}
                editor={editor}
                handleUpdate={handleUpdateWrapper}
                setIsEditing={setIsEditing}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile:block tablet:block laptop:hidden pb-5">
        {dataForCurrentPage.map((item) => (
          <div key={item.name} className="mt-3">
            <MobileView
              key={item.id}
              item={item}
              isEditing={isEditing}
              editor={editor}
              handleUpdate={handleUpdateWrapper}
              setIsEditing={setIsEditing}
            />
          </div>
        ))}
      </div>

      <AlertDialog
        alertTitle={alertTitle}
        styles={alertStyles}
        icon={alertIcon}
        id={"userUpdate"}
        setAlertTitle={setAlertTitle}
      />
    </>
  );
}
