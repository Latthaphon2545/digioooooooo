import {
  Error,
  ErrorStyle,
  Success,
  SuccessStyle,
} from "@/components/alertDialog";
import axios from "axios";

export interface HandleDeleteProps {
  productId: string;
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  setAlertTitle: any;
  setAlertStyles: any;
  setAlertIcon: any;
  setLoadingDelete: (value: boolean) => void;
}

export const deleteBank = async ({
  productId,
  dataForCurrentPage,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
  setLoadingDelete,
}: HandleDeleteProps) => {
  try {
    setLoadingDelete(true);
    const res = await axios.delete(`/api/products/deleteBank`, {
      data: { productId },
    });
    if (res.status === 200) {
      setAlertTitle("Bank deleted successfully");
      setAlertStyles(SuccessStyle);
      setAlertIcon(Success);
      dataForCurrentPage.map((item) => {
        if (item.id === productId) {
          item.bankId = null;
        }
      });
    }
  } catch (err) {
    console.log(err);
    setAlertTitle("Error deleting bank");
    setAlertStyles(ErrorStyle);
    setAlertIcon(Error);
  } finally {
    setLoadingDelete(false);
  }
};
