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
  imageToDelete: string[],
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

    if (imageToDelete && imageToDelete.length > 0) {
      imageToDelete.forEach((image) =>
        formData.append("imagesToDelete", image)
      );
    }

    const updatedData = await updateUserHistoryOnServer(id, formData);
    console.log("Updated data", updatedData);
    // historyData.map((item) => {
    //   if (item.id === id) {
    //     item.description = updatedData && updatedData.description;
    //     item.category = updatedData && updatedData.category;
    //     item.imageProve = updatedData && updatedData.imageProve;
    //   }
    // });
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
    return;
  } finally {
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
