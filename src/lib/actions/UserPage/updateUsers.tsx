import axios from "axios";
import {
  Error,
  ErrorStyle,
  Success,
  SuccessStyle,
} from "@/components/alertDialog";
import { handleEditToggle } from "@/components/table/handleEditToggle";

interface HandleUpdateProps {
  id: string;
  user: { name: string; role: string; status: string; contact: string };
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  setAlertTitle: (title: string) => void;
  setAlertStyles: (style: string) => void;
  setAlertIcon: (icon: React.ReactNode) => void;
  setIsEditing: any;
  setLoadings: (loadings: { [key: string]: boolean }) => void;
}

export const handleUpdate = async ({
  id,
  user,
  dataForCurrentPage,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
  setIsEditing,
  setLoadings,
}: HandleUpdateProps) => {
  try {
    setLoadings({ ...setLoadings, [id]: true });
    const res = await axios.patch(`/api/users/updateUsers/${id}`, user);
    if (res.status === 200) {
      setAlertTitle(`${user.name} updated successfully`);
      setAlertStyles(SuccessStyle);
      setAlertIcon(Success);
      dataForCurrentPage.map((item) => {
        if (item.id === id) {
          item.name = user.name;
          item.role = user.role;
          item.status = user.status;
          item.contact = user.contact;
        }
      });
      return res;
    }
  } catch (err) {
    console.log(err);
    setAlertTitle(`${user.name} failed to update`);
    setAlertStyles(ErrorStyle);
    setAlertIcon(Error);
    return err;
  } finally {
    handleEditToggle(id, setIsEditing);
    setLoadings({ ...setLoadings, [id]: false });
  }
};
