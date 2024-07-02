import axios from "axios";
import { Error, Success } from "@/components/alertDialog";
import { handleEditToggle } from "../../handleEditToggle";
import { updateUserHistoryOnServer } from "./serverUpdate";

interface UpdateUserHistoryProps {
  historyData: {
    [key: string]: any;
  }[];
  setUpdateAlert: any;
  showAlert: any;
  setAlertTitle: any;
  setAlertStyles: any;
  setAlertIcon: any;
  setIsEditing: any;
}

export const updateUserHistory = async (
  id: string,
  history: { description: string; category: string; imageProves: File[] },
  {
    historyData,
    setUpdateAlert,
    showAlert,
    setAlertTitle,
    setAlertStyles,
    setAlertIcon,
    setIsEditing,
  }: UpdateUserHistoryProps
) => {
  try {
    console.log("history", history);

    const formData = new FormData();
    formData.append("description", history.description);
    formData.append("category", history.category);
    history.imageProves.forEach((file) => formData.append("images", file));

    await updateUserHistoryOnServer(id, formData);
  } catch (err) {
    console.log(err);
    setUpdateAlert(true);
    showAlert(
      "Failed to update user",
      "alert-error mobile:bg-error tablet:bg-error",
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setUpdateAlert,
      Error
    );
  } finally {
    // historyData.map((item) => {
    //   if (item.id === id) {
    //     item.description = history.description;
    //     item.category = history.category;
    //     item.imageProve = history.imageProves;
    //   }
    // });
    handleEditToggle(id, setIsEditing);
    setUpdateAlert(true);
    showAlert(
      "User updated successfully",
      "alert-success  mobile:bg-success tablet:bg-success",
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setUpdateAlert,
      Success
    );
  }
};
