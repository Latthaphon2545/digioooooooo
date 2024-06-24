import Modal from "@/components/modal";
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
    <Modal
      id={`modal-merchant-${productId}`}
      title={<IoMdAdd />}
      style=" text-xl btn-ghost"
      titleContent=""
      boolClose={true}
      content={uiModalMerchant(
        setMerchantId,
        handleSearch,
        merchantName,
        findMerchant,
        productId,
        merchantId,
        handleAdd
      )}
    />
  );
}

const uiModalMerchant = (
  setMerchantId: any,
  handleSearch: any,
  merchantName: any,
  findMerchant: any,
  productId: any,
  merchantId: any,
  handleAdd: any
) => {
  return (
    <div className="px-5 flex flex-col gap-5 items-center">
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
          {merchantName === "" && !findMerchant ? "Type the merchant ID" : ""}
          {findMerchant ? (
            <span className="loading loading-dots loading-xs text-black"></span>
          ) : (
            <span>{merchantName}</span>
          )}
        </div>
      </div>

      <SubmitPopupButton
        action={async () => {
          await handleAdd({ productID: productId, merchantID: merchantId });
          const modal = document.getElementById(`modal-merchant-${productId}`);
          const checkbox = modal?.nextElementSibling as HTMLInputElement;
          checkbox.checked = false;
        }}
        styles={`btn-xl btn-success ${
          merchantName === "" ||
          merchantName === "Merchant not found" ||
          merchantName === "Please enter merchant ID"
            ? "btn-disabled"
            : ""
        }`}
        confirmString="Update"
        isSubmitting={false}
        confirmStyle="btn-success btn-sm"
        header="Are you sure you want to update this user?"
        description={""}
        id={`modal-merchant-${productId}`}
      >
        Next
      </SubmitPopupButton>
    </div>
  );
};
