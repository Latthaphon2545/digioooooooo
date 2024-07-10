"use client";

import { Error, Success } from "@/components/alertDialog";
import Modal from "@/components/modal";
import SubmitPopupButton from "@/components/submitPopupButton";
import axios from "axios";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export interface HandleAddProps {
  productId: string;
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  banks: any[];
  setUpdateAlert: any;
  setAlertTitle: any;
  setAlertStyles: any;
  setAlertIcon: any;
  ShowAlert: any;
}

export default function BankAdd({
  productId,
  dataForCurrentPage,
  banks,
  setUpdateAlert,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
  ShowAlert,
}: HandleAddProps) {
  const [bankId, setBankId] = useState("");
  const [bankSelect, setBankSelect] = useState("");
  const [productSelect, setProductSelect] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelect = (bankId: string) => {
    setBankId(bankId);
    setProductSelect(productId);
  };

  const submitAddBank = async () => {
    try {
      setLoading(true);
      const response = await axios.patch("/api/products/addBank", {
        productId: productSelect,
        bankId: bankId,
      });
      ShowAlert(
        "Bank added successfully",
        "alert-success mobile:bg-success tablet:bg-success",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert,
        Success
      );
      setUpdateAlert(true);
    } catch (error) {
      console.error("[PATCH MERCHANT]", error);
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
      setLoading(false);
      dataForCurrentPage.map((item) => {
        if (item.id === productId) {
          item.bankId = bankId;
          item.bank = bankSelect;
        }
      });
    }
  };

  return (
    <>
      <Modal
        title={<IoMdAdd />}
        style=" text-xl btn-ghost"
        titleContent="Select Bank"
        id={`modal-bank-${productId}`}
        boolClose={true}
        content={
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="grid grid-cols-2 gap-2 justify-items-center w-full">
              {banks.map((bank, index) => {
                const isSelected = bankId === bank.id;
                return (
                  <div
                    key={index}
                    className={`flex flex-col p-2 w-full  btn btn-outline btn-base-100 h-32 ${
                      isSelected ? "btn-primary border-2" : ""
                    } hover:btn-primary`}
                    onClick={() => {
                      handleSelect(bank.id);
                      setBankSelect(bank);
                    }}
                  >
                    <img
                      src={bank.image}
                      alt={bank.image}
                      className="w-14 h-14 rounded-lg"
                    />
                    <h2 className="text-center p-2 mobile:hidden tablet:block">
                      {bank.name}
                    </h2>
                    <h2 className="text-center p-2 tablet:hidden mobile:block">
                      {bank.bankAbbreviations}
                    </h2>
                  </div>
                );
              })}
            </div>
            <SubmitPopupButton
              action={() => submitAddBank()}
              styles={`${bankSelect ? "btn-primary" : "btn-disabled"} btn`}
              header="Clear Selection"
              description="Are you sure you want to clear the selection?"
              id={`modal-bank-${productId}`}
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
                "Add Bank"
              )}
            </SubmitPopupButton>
          </div>
        }
      />
    </>
  );
}
