import {
  Error,
  ErrorStyle,
  Success,
  SuccessStyle,
} from "@/components/alertDialog";
import axios from "axios";

export const updateMerchant = async (
  id: string,
  merchant: { name: string; address: string; contact: string },
  setIsUpdating: any,
  setIsEditing: any,
  isUpdating: any,
  isEditing: any,
  dataForCurrentPage: {
    [key: string]: any;
  }[],
  setAlertTitle: any,
  setAlertStyles: any,
  setAlertIcon: any
) => {
  try {
    setIsUpdating({ ...isUpdating, [id]: true });
    setIsEditing({ ...isEditing, [id]: false });
    const res = await axios.patch(
      `/api/merchants/updateMerchant/${id}`,
      merchant
    );
    if (res.status === 200) {
      setAlertTitle(`Merchant:${merchant.name} updated successfully`);
      setAlertStyles(SuccessStyle);
      setAlertIcon(Success);
      dataForCurrentPage.map((item) => {
        if (item.id === id) {
          item.name = merchant.name;
          item.address = merchant.address;
          item.contact = merchant.contact;
        }
      });
    }
  } catch (error) {
    console.error(error);
    setAlertTitle(`Merchant:${merchant.name} failed to update`);
    setAlertStyles(ErrorStyle);
    setAlertIcon(Error);
  } finally {
    setIsUpdating({ ...isUpdating, [id]: false });
    setIsEditing({ ...isEditing, [id]: false });
  }
};
