import React, { useState } from "react";
import { ShowAlert } from "../showAlert";
import { updateUserHistory } from "./action/updateUserHistory";
import AlertDialog from "@/components/alertDialog";
import UserHistoryMobileView from "./view/mobileView";
import { DesktopHistoryView } from "./view/desktopView";
import { isLaptop, isMobile, isTablet, useWindowSize } from "@/lib/windowSize";

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

  const windowSize = useWindowSize();

  const handleUpdateWrapper = async (
    id: string,
    history: { description: string; category: string; imageProves: File[] },
    imageToDelete: string[]
  ) => {
    await updateUserHistory(id, history, imageToDelete, {
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
      {windowSize.width >= isLaptop && (
        <div className="min-h-[63vh] mt-3 w-[80vw] mobile:hidden tablet:hidden laptop:block">
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
                  <DesktopHistoryView
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
      )}

      {windowSize.width >= isMobile && windowSize.width <= isTablet && (
        <div className="mobile:block laptop:hidden">
          {historyData.map((item) => {
            return (
              <UserHistoryMobileView
                key={item.id}
                item={item}
                isEditor={isEditor}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleUpdateUserHistory={handleUpdateWrapper}
              />
            );
          })}
        </div>
      )}
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
