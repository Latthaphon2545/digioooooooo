import axios from "axios";
import { Error, ErrorStyle } from "@/components/alertDialog";

interface ChangePasswordProps {
  userId: string;
  oldPassword: string;
  newPassword: string;
  setLoadingChangePassword: (loading: boolean) => void;
  setSuccessChangePassword: (success: boolean) => void;
  setAlertTitle: (title: string) => void;
  setAlertStyles: (styles: string) => void;
  setAlertIcon: (icon: React.ReactNode) => void;
  handleClear: () => void;
}

export const ChangePassword = async ({
  userId,
  oldPassword,
  newPassword,
  setLoadingChangePassword,
  setSuccessChangePassword,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
  handleClear,
}: ChangePasswordProps) => {
  try {
    setLoadingChangePassword(true);
    const res = await axios.patch("/api/users/changePassword", {
      userId,
      oldPassword,
      newPassword,
    });
    console.log(res);
    if (res.status === 200) {
      console.log("Password changed successfully");
      setSuccessChangePassword(true);
    }
  } catch (e) {
    console.log(e);
    setAlertTitle("Icorrect old password");
    setAlertStyles(ErrorStyle);
    setAlertIcon(Error);
    handleClear();
  } finally {
    setLoadingChangePassword(false);
  }
};
