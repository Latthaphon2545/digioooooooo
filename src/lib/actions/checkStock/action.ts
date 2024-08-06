import {
  Error,
  ErrorStyle,
  Success,
  SuccessStyle,
  Warning,
  WarningStyle,
} from "@/components/alertDialog";
import axios from "axios";

interface ICheckStock {
  setProcess?: (process: boolean) => void;
  setCode?: (code: string) => void;
  code: string;
  setAlertTitle?: (alertTitle: string) => void;
  setAlertStyles?: (alertStyles: string) => void;
  setAlertIcon?: (value: React.ReactNode) => void;
  handleSetStatus?: (index: number, newStatus: any) => void;
  handleInputChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  index?: number;
}

export const CheckStock = async ({
  setProcess,
  setCode,
  code,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
  handleSetStatus,
  handleInputChange,
  index,
}: ICheckStock) => {
  try {
    if (setProcess) setProcess(true);
    if (setCode) setCode(code);
    const res = await axios.post("/api/products/checkStock", {
      sn: code,
      user: "6650666b7e05719e52aabef7",
    });
    const data = await res.data;
    if (res.status === 200) {
      if (setAlertTitle && setAlertStyles && setAlertIcon) {
        setAlertTitle(data.message);
        setAlertStyles(SuccessStyle);
        setAlertIcon(Success);
      }
      if (handleSetStatus && index) handleSetStatus(index, Success);
      if (handleInputChange && index)
        handleInputChange({ target: { value: "" } } as any, index);
    }
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 404) {
      if (setAlertTitle && setAlertStyles && setAlertIcon) {
        setAlertTitle(error.response.data.message);
        setAlertStyles(ErrorStyle);
        setAlertIcon(Error);
      }
      if (handleSetStatus && index) handleSetStatus(index, Error);
    } else if (error.response.status === 400) {
      if (setAlertTitle && setAlertStyles && setAlertIcon) {
        setAlertTitle(error.response.data.message);
        setAlertStyles(WarningStyle);
        setAlertIcon(Warning);
      }
      if (handleSetStatus && index) handleSetStatus(index, Warning);
    }
  } finally {
    if (setProcess) setProcess(false);
  }
};
