import SubmitPopupButton from "@/components/submitPopupButton";
import axios from "axios";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function ModalMerchant({
  productId,
  onMerchantAdded,
}: {
  productId: string;
  onMerchantAdded: (merchant: any) => void;
}) {
  const [merchantName, setMerchantName] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [findMerchant, setFindMerchant] = useState(false);
  const [boolAddMerchant, setBoolAddMerchant] = useState(false);
  const [textAddMerchant, setTextAddMerchant] = useState("Add");

  const handleSearch = async () => {
    try {
      if (merchantId === "") {
        setMerchantName("Please enter merchant ID");
        return;
      }
      setFindMerchant(true);
      const res = await axios.get(
        `/api/merchants/getMerchantById?id=${merchantId}`
      );
      setMerchantName(res.data.merchant.name);
    } catch (e) {
      setFindMerchant(false);
      setMerchantName("Merchant not found");
    } finally {
      setFindMerchant(false);
    }
  };

  const handleAdd = async ({
    productID,
    merchantID,
  }: {
    productID: string;
    merchantID: string;
  }) => {
    try {
      setBoolAddMerchant(true);
      await axios.patch(`/api/products/addMerchant`, {
        productId: productID,
        merchantId: merchantID,
      });
    } catch (e) {
      console.log(e);
      onMerchantAdded({ success: false });
    } finally {
      onMerchantAdded({ id: merchantID, name: merchantName, success: true });
      setBoolAddMerchant(false);
      setTextAddMerchant("Added");
    }
  };

  return (
    <SubmitPopupButton
      id={`modal-merchant-${productId}`}
      styles="btn btn-xs text-xl btn-ghost"
      header="Merchant"
      confirmString="Add"
      confirmStyle="btn-success"
      disabled={
        merchantName === "" ||
        merchantName === "Merchant not found" ||
        merchantName === "Please enter merchant ID"
      }
      description={
        <div className="text-sm text-start">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 justify-center">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Merchant ID"
                  onChange={(e) => setMerchantId(e.target.value)}
                />
              </label>
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
            <div
              className={`text-center text-xl font-bold ${
                merchantName === "Merchant not found" ||
                merchantName === "Please enter merchant ID"
                  ? "text-error"
                  : merchantName === ""
                  ? ""
                  : "text-success"
              }`}
            >
              {merchantName === "" && !findMerchant
                ? "Type the merchant ID"
                : ""}
              {findMerchant ? (
                <span className="loading loading-dots loading-xs text-black"></span>
              ) : (
                <span>{merchantName}</span>
              )}
            </div>
          </div>
        </div>
      }
      action={() => handleAdd({ productID: productId, merchantID: merchantId })}
    >
      <IoMdAdd />
    </SubmitPopupButton>
  );
}
