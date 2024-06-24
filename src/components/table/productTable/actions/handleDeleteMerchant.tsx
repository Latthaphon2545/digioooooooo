import { Error, Success } from "@/components/alertDialog";
import axios from "axios";

export interface HandleDeleteProps {
  productId: string;
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  setUpdateAlert: any;
  setAlertTitle: any;
  setAlertStyles: any;
  setAlertIcon: any;
  ShowAlert: any;
}

export const deleteMerchant = async ({
  productId,
  dataForCurrentPage,
  setUpdateAlert,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
  ShowAlert,
}: HandleDeleteProps) => {
  try {
    const response = await axios.delete(`/api/products/deleteMerchant`, {
      data: { productId },
    });
    ShowAlert(
      "Merchant deleted successfully",
      "alert-success mobile:bg-success tablet:bg-success",
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setUpdateAlert
    );
    setUpdateAlert(true);
  } catch (err) {
    console.log(err);
    ShowAlert(
      "Failed to delete merchant",
      "alert-error mobile:bg-error tablet:bg-error",
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setUpdateAlert,
      Error
    );
  } finally {
    dataForCurrentPage.map((item) => {
      if (item.id === productId) {
        item.merchant = null;
      }
    });
  }
};
