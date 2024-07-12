import {
  Error,
  ErrorStyle,
  Success,
  SuccessStyle,
} from "@/components/alertDialog";
import axios from "axios";

interface HandleBankAddProps {
  productId: string;
  bankId: string;
  setLoading: (value: boolean) => void;
  dataForCurrentPage: any[];
  setAlertTitle: (value: string) => void;
  setAlertStyles: (value: string) => void;
  setAlertIcon: (value: React.ReactNode) => void;
}

export const handleAddBankToProduct = async ({
  productId,
  bankId,
  setLoading,
  dataForCurrentPage,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
}: HandleBankAddProps) => {
  try {
    setLoading(true);
    const response = await axios.patch("/api/products/addBank", {
      productId,
      bankId,
    });
    console.log("[PATCH MERCHANT]", response);
    if (response.status === 200) {
      setAlertTitle("Bank Added");
      setAlertStyles(SuccessStyle);
      setAlertIcon(Success);
      dataForCurrentPage.map((item) => {
        if (item.id === productId) {
          item.bankId = bankId;
          item.bank = response.data.bank;
        }
      });
    }
  } catch (error) {
    console.error("[PATCH MERCHANT]", error);
    setAlertTitle("Internal Server Error");
    setAlertStyles(ErrorStyle);
    setAlertIcon(Error);
  } finally {
    setLoading(false);
  }
};
