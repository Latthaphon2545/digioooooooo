import Modal from "@/components/modal";
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
      setFindMerchant(true);
      const res = await axios.get(
        `/api/merchants/getMerchantById?id=${merchantId}`
      );
      setMerchantName(res.data.name);
    } catch (e) {
      console.log(e);
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
    <Modal
      title={<IoMdAdd />}
      titleContent="Merchant"
      content={
        <div className="py-2 text-sm text-start">
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
            <p className="text-center">
              {merchantName === "" && !findMerchant
                ? "Type the merchant ID"
                : ""}
              {findMerchant ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : (
                merchantName
              )}
            </p>
            <button
              className={`btn btn-${
                textAddMerchant === "Added" ? "success" : "primary"
              }`}
              disabled={merchantName === ""}
              onClick={() =>
                handleAdd({ productID: productId, merchantID: merchantId })
              }
            >
              {boolAddMerchant ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : (
                textAddMerchant
              )}
            </button>
          </div>
        </div>
      }
      style="btn text-xl btn-ghost"
    />
  );
}
