import axios from "axios";
import { Error, Success } from "@/components/alertDialog";
import { handleEditToggle } from "../../handleEditToggle";

interface HandleUpdateProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  setUpdateAlert: any;
  showAlert: any;
  setAlertTitle: any;
  setAlertStyles: any;
  setAlertIcon: any;
  setIsEditing: any;
}

export const handleUpdate = async (
  id: string,
  users: { name: string; role: string; status: string; contact: string },
  {
    dataForCurrentPage,
    setUpdateAlert,
    showAlert,
    setAlertTitle,
    setAlertStyles,
    setAlertIcon,
    setIsEditing,
  }: HandleUpdateProps
) => {
  try {
    await axios.patch(`/api/users/updateUsers/${id}`, users);
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
    dataForCurrentPage.map((item) => {
      if (item.id === id) {
        item.name = users.name;
        item.role = users.role;
        item.status = users.status;
        item.contact = users.contact;
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
