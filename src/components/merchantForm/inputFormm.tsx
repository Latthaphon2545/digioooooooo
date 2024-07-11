"use client";
import React, { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { DataItem } from "@/lib/types";
import MerchantInput from "./merchantInput";
import GroupUpload from "../groupUpload";
import AlertDialog from "../alertDialog";
import { BiError } from "react-icons/bi";
import Alert from "../alert";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { TabBar } from "../usersForm/tabBar";
import { isFormEmpty } from "@/lib/inputUtils";
import InputHeaderr from "../usersForm/inputHeaderr";

type FormValues = {
  name: string;
  address: string;
  contact: string;
}[];

export default function MerchantInputFormm() {
  const initialActiveTab = useSearchParams().get("activeTab") || 0;
  const [activeTab, setActiveTab] = useState(Number(initialActiveTab));
  const [hasError, setHasError] = useState(false);
  const [groupData, setGroupData] = useState<Array<DataItem>>([]);
  const [formValues, setFormValues] = useState<FormValues>([
    { name: "", contact: "", address: "" },
    { name: "", contact: "", address: "" },
  ]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState("");

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (
        activeTab === 0 &&
        formValues.every(
          ({ name, contact, address }) => !name && !contact && !address
        )
      ) {
        setErrorOnSubmit("Please fill out the form");
        return;
      }

      const filledOutInputs =
        activeTab === 0
          ? formValues.filter(
              ({ name, contact, address }) =>
                name.trim() || contact.trim() || address.trim()
            )
          : groupData;

      for (let input of filledOutInputs) {
        if (!input.name || !input.contact || !input.address) {
          setErrorOnSubmit("Please fill out all fields");
          return;
        }
      }

      console.log("Sending data:", filledOutInputs);

      const res = await axios.post(
        "/api/merchants/createMerchants",
        filledOutInputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setSubmitting(false);
      clearForm();
    }
  };

  const clearForm = () => {
    setFormValues([
      { name: "", contact: "", address: "" },
      { name: "", contact: "", address: "" },
    ]);
    setGroupData([]);
  };

  return (
    <div className="relative">
      <InputHeaderr
        icon={<MdAddShoppingCart />}
        title="Add Merchant"
        page="merchant"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div
        className={`tablet:min-h-[67vh] mobile:min-h-[75vh] mobile:mt-5 laptop:mt-0 mobile:px-3 laptop:px-0 ${
          activeTab === 1 ? "flex items-center" : ""
        } `}
      >
        {activeTab === 0 && (
          <MerchantInput
            formValues={formValues}
            setFormValues={setFormValues}
          />
        )}
        {activeTab === 1 && (
          <GroupUpload
            setHasError={setHasError}
            headers={["name", "contact", "address"]}
            setGroupData={setGroupData}
            page="merchant"
            uploading={uploading}
            setUploading={setUploading}
            setErrorOnSubmit={setErrorOnSubmit}
          />
        )}
      </div>
      {submitting && (
        <div className="">
          <div className="loading loading-spinner loading-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
        </div>
      )}
      {errorOnSubmit && (
        <AlertDialog
          title={errorOnSubmit}
          styles="alert-error absolute w-fit mx-10 py-3 bottom-3"
          icon={<BiError size={20} />}
        />
      )}
      <div className="flex justify-end w-full tablet:mr-10 align-bottom">
        <Alert
          styles={`btn-primary px-10 w-1/2 mobile:mt-5 lg:left-1/2 lg:transform lg:-translate-x-1/2 laptop:mt-0 ${
            activeTab === 0
              ? " right-5 bottom-4 w-1/2"
              : " w-2/3 left-1/2 transform -translate-x-1/2 bottom-4"
          } laptop:w-auto btn-wide fixed  lg:w-3/4  mobile:text-xl laptop:text-lg laptop:bottom-5 laptop:right-10 laptop:w-[20vh]  laptop:transform-none laptop:left-auto`}
          alertHeader="Add Merchant"
          alertDescription="Are you sure you want to add these merchants?"
          id="add_merchant"
          disabled={
            hasError || uploading || submitting || isFormEmpty(formValues)
          }
          action={handleSubmit}
        >
          Add
        </Alert>
      </div>
    </div>
  );
}
