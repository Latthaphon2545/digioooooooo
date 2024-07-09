"use client";

import { Error, Success } from "@/components/alertDialog";
import Modal from "@/components/modal";
import SubmitPopupButton from "@/components/submitPopupButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

export interface HandleUpdateProps {
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

export default function ModalMerchant({
  productId,
  dataForCurrentPage,
  setUpdateAlert,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
  ShowAlert,
}: HandleUpdateProps) {
  const [merchant, setMerchant] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [searchBool, setSearchBool] = useState(false);

  const handleSearch = async (merchantSearch: string) => {
    try {
      setSearchBool(true);
      const res = await axios.get(
        `/api/merchants/getMerchantByNameContact?name=${merchantSearch}`
      );
      setMerchant(res.data.merchant);
    } catch (e) {
      console.log(e);
    } finally {
      setSearchBool(false);
    }
  };

  const handleAdd = async ({
    productID,
    merchantID,
    merchantName,
  }: {
    productID: string;
    merchantID: string;
    merchantName: string;
  }) => {
    try {
      setLoadingAdd(true);
      await axios.patch(`/api/products/addMerchant`, {
        productId: productID,
        merchantId: merchantID,
      });
      ShowAlert(
        "Merchant added successfully",
        "alert-success mobile:bg-success tablet:bg-success",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert,
        Success
      );
      setUpdateAlert(true);
    } catch (e) {
      console.log(e);
      ShowAlert(
        "Failed to delete bank",
        "alert-error mobile:bg-error tablet:bg-error",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert,
        Error
      );
    } finally {
      setLoadingAdd(false);
      dataForCurrentPage.map((item) => {
        if (item.id === productId) {
          item.merchantId = merchantID;
          item.merchant = merchantName;
        }
      });
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
        handleSearch,
        merchant,
        loadingAdd,
        handleAdd,
        productId,
        searchBool
      )}
    />
  );
}

const uiModalMerchant = (
  handleSearch: any,
  merchant: any[],
  loading: boolean,
  handleAdd: any,
  productId: string,
  searchBool: boolean
) => {
  const [merchantId, setMerchantId] = useState("");
  const [merchantSelect, setMerchantSelect] = useState<any>([]);
  const [search, setSearch] = useState("");

  return (
    <div className="px-5 flex flex-col gap-5 items-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-5 justify-center">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Merchant ID"
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            <div>
              {searchBool && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </div>
          </label>
        </div>
      </div>

      <div className="text-center h-60">
        {merchant.length === 0 && search.length === 0 && (
          <p>Please search for a merchant.</p>
        )}

        {merchant.length === 0 && search.length > 0 && (
          <p>No merchant found.</p>
        )}

        {merchant.length >= 1 && search.length >= 1 && (
          <div className="overflow-y-auto max-h-60 w-96">
            <table className="table text-center">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {merchant.map((m) => (
                  <tr key={m.id}>
                    <td className="w-1/12">
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={m.id}
                          onClick={() => {
                            if (merchantId === m.id) {
                              setMerchantId("");
                              setMerchantSelect([]);
                              return;
                            }
                            setMerchantId(m.id);
                            setMerchantSelect(m);
                          }}
                          checked={merchantId === m.id}
                        />
                      </label>
                    </td>
                    <td className="w-10/12">{m.name}</td>
                    <td className="w-1/12">{m.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-2 items-center">
        <p>{merchantSelect ? merchantSelect.name : ""}</p>
        {merchantId && (
          <button
            className="link link-error"
            onClick={() => {
              setMerchantId("");
              setMerchantSelect([]);
            }}
          >
            Clear
          </button>
        )}
      </div>

      <SubmitPopupButton
        action={() =>
          handleAdd({
            productID: productId,
            merchantID: merchantId,
            merchantName: merchantSelect,
          })
        }
        header="Add Merchant"
        styles={`btn-primary w-full ${merchantId === "" ? "btn-disabled" : ""}`}
        description={`Are you sure you want to add ${merchantSelect.name} as a merchant?`}
        id={`add-merchant`}
        confirmString={
          loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Confirm"
          )
        }
        confirmStyle="btn-success"
      >
        {loading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          "Add Merchant"
        )}
      </SubmitPopupButton>
    </div>
  );
};
