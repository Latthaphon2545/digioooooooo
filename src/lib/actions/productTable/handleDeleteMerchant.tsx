import { Error, Success, SuccessStyle } from "@/components/alertDialog";
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

export const deleteMerchant = async ({
  productId,
  dataForCurrentPage,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
  setLoadingDelete,
}: HandleDeleteProps) => {
  try {
    setLoadingDelete(true);
    const response = await axios.delete(`/api/products/deleteMerchant`, {
      data: { productId },
    });
    if (response.status === 200) {
      setAlertTitle(
        `Merchant of product ${
          productId.slice(0, 6) + "XXXX"
        } deleted successfully`
      );
      setAlertStyles(SuccessStyle);
      setAlertIcon(Success);
      dataForCurrentPage.map((item) => {
        if (item.id === productId) {
          item.merchant = null;
        }
      });
    }
  } catch (err) {
    console.log(err);
    setAlertTitle(
      `Error deleting merchant of product ${productId.slice(0, 6) + "XXXX"}`
    );
    setAlertStyles(Error);
    setAlertIcon(Error);
  } finally {
    setLoadingDelete(false);
  }
};
