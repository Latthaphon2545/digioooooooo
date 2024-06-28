import axios from "axios";
import { Error, Success } from "@/components/alertDialog";
import { handleEditToggle } from "../../handleEditToggle";

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
  history: { description: string; category: string },
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
    await axios.patch(`/api/users/updateUserHistory/${id}`, history);
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
    console.log("historyData", historyData);

    historyData.map((item) => {
      if (item.id === id) {
        item.description = history.description;
        item.status = history.category;
      }
    });
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
