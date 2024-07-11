import {
  Error,
  ErrorStyle,
  Success,
  SuccessStyle,
} from "@/components/alertDialog";
import { ShowAlert } from "@/components/showAlert";
import axios from "axios";

interface IForgotPassword {
  email?: string;
  phoneNumber?: string;
  setLoading: (loading: boolean) => void;
  setForgotPassword?: (forgotPassword: boolean) => void;
  setAlertTitle?: (alertTitle: string) => void;
  setAlertStyles?: (alertStyles: string) => void;
  setAlertIcon?: (value: React.ReactNode) => void;
  setAlertOpen?: (alertOpen: boolean) => void;
}

export const ForgotPassword = async ({
  email,
  phoneNumber,
  setLoading,
  setForgotPassword,
  setAlertIcon,
  setAlertOpen,
  setAlertStyles,
  setAlertTitle,
}: IForgotPassword) => {
  try {
    setLoading(true);
    const updatedEmail = email + "@digio.co.th";
    const res = await axios.patch("/api/auth/forgotPassword", {
      email: updatedEmail,
      phoneNumber: phoneNumber,
    });
    if (res.status === 201) {
      if (setForgotPassword) setForgotPassword(true);
      if (setAlertOpen && setAlertIcon && setAlertStyles && setAlertTitle) {
        ShowAlert(
          "Link sent successfully",
          SuccessStyle,
          setAlertTitle,
          setAlertStyles,
          setAlertIcon,
          setAlertOpen,
          Success
        );
      }
    }
  } catch (e: any) {
    console.log(e);
    if (e.response.status === 404) {
      if (setAlertOpen && setAlertIcon && setAlertStyles && setAlertTitle) {
        ShowAlert(
          "User not found",
          ErrorStyle,
          setAlertTitle,
          setAlertStyles,
          setAlertIcon,
          setAlertOpen,
          Error
        );
      }
    }
  } finally {
    setLoading(false);
  }
};
