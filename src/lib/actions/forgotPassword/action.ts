import {
  Error,
  ErrorStyle,
  Success,
  SuccessStyle,
} from "@/components/alertDialog";
import axios from "axios";

interface IForgotPassword {
  email?: string;
  phoneNumber?: string;
  setLoading: (loading: boolean) => void;
  setForgotPassword?: (forgotPassword: boolean) => void;
  setAlertTitle?: (alertTitle: string) => void;
  setAlertStyles?: (alertStyles: string) => void;
  setAlertIcon?: (value: React.ReactNode) => void;
}

export const ForgotPassword = async ({
  email,
  phoneNumber,
  setLoading,
  setForgotPassword,
  setAlertIcon,
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
      if (setAlertIcon && setAlertStyles && setAlertTitle) {
        setAlertTitle(`Reset password link sent to ${email}@digio.co.th`);
        setAlertStyles(SuccessStyle);
        setAlertIcon(Success);
      }
    }
  } catch (e: any) {
    console.log(e);
    if (e.response.status === 404) {
      if (setAlertIcon && setAlertStyles && setAlertTitle) {
        setAlertTitle(`${email}@digio.co.th not found`);
        setAlertStyles(ErrorStyle);
        setAlertIcon(Error);
      }
    }
  } finally {
    setLoading(false);
  }
};
