"use client";

import {
  Error,
  ErrorStyle,
  Success,
  SuccessStyle,
} from "@/components/alertDialog";
import axios from "axios";

export const handleSearchMerchant = async ({
  merchantSearch,
  setLoadingSearch,
}: {
  merchantSearch: string;
  setLoadingSearch: (value: boolean) => void;
}) => {
  try {
    setLoadingSearch(true);
    const res = await axios.get(
      `/api/merchants/getMerchantByNameContact?name=${merchantSearch}`
    );
    return res.data.merchant;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingSearch(false);
  }
};

export const handleAddMerchantToProduct = async ({
  dataForCurrentPage,
  productID,
  merchantID,
  setLoadingAdd,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
}: {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  productID: string;
  merchantID: string;
  setLoadingAdd: (value: boolean) => void;
  setAlertTitle: (value: string) => void;
  setAlertStyles: (value: string) => void;
  setAlertIcon: (value: React.ReactNode) => void;
}) => {
  try {
    setLoadingAdd(true);
    console.log("productID", productID);
    const response = await axios.patch(`/api/products/addMerchant`, {
      productId: productID,
      merchantId: merchantID,
    });
    if (response.status === 200) {
      setAlertTitle(
        `Merchant of product ${
          productID.slice(0, 6) + "XXXX"
        } added successfully`
      );
      setAlertStyles(SuccessStyle);
      setAlertIcon(Success);
      dataForCurrentPage.map((item) => {
        if (item.id === productID) {
          item.merchantId = merchantID;
          item.merchant = response.data.updatedMerchant;
        }
      });
    }
  } catch (e) {
    console.log(e);
    setAlertTitle(
      `Error adding merchant of product ${productID.slice(0, 6) + "XXXX"}`
    );
    setAlertStyles(ErrorStyle);
    setAlertIcon(Error);
  } finally {
    setLoadingAdd(false);
  }
};
