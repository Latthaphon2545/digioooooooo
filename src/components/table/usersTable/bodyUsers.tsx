import React, { useState } from "react";
import AlertDialog from "../../alertDialog";
import { TableView } from "./view/desktopView";

import { MobileView } from "./view/mobileView";
import { handleUpdate } from "./actions/handleUpdate";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  editor: boolean;
}

export default function BodyUsers({ dataForCurrentPage, editor }: TableProps) {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  const [updateAlert, setUpdateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);
  const [isLoad, setIsLoad] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleUpdateWrapper = async (
    id: string,
    users: { name: string; role: string; status: string; contact: string }
  ) => {
    // await handleUpdate(id, users, {
    //   dataForCurrentPage,
    //   setUpdateAlert,
    //   showAlert: ShowAlert,
    //   setAlertTitle,
    //   setAlertStyles,
    //   setAlertIcon,
    //   setIsEditing,
    // });
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
              <TableView
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
              item={item}
              editor={editor}
              setOpenEditModal={setOpenEditModal}
              openEditModal={openEditModal}
              handleUpdate={handleUpdateWrapper}
            />
          </div>
        ))}
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
