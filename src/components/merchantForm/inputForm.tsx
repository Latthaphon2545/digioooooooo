"use client";
import React, { useState } from "react";
import InputHeader from "../usersForm/inputHeader";
import { MdAddShoppingCart } from "react-icons/md";
import { DataItem } from "@/lib/types";
import MerchantInput from "./merchantInput";
import GroupUpload from "../groupUpload";
import AlertDialog from "../alertDialog";
import { BiError } from "react-icons/bi";
import Alert from "../alert";
import axios from "axios";

type FormValues = {
  name: string;
  address: string;
  contact: string;
}[];

export default function MerchantInputForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [groupData, setGroupData] = useState<Array<DataItem>>([]);
  const [formValues, setFormValues] = useState<FormValues>([
    { name: "", contact: "", address: "" },
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
              ({ name, contact, address }) => name || contact || address
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
      { name: "", contact: "", address: "" },
    ]);
    setGroupData([]);
  };

  return (
    <div className="relative">
      <InputHeader
        icon={<MdAddShoppingCart />}
        title="Add Merchant"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="min-h-[68vh]">
        {activeTab === 0 && (
          <MerchantInput
            formValues={formValues}
            setFormValues={setFormValues}
          />
        )}
        {activeTab === 1 && (
          <GroupUpload
            setHasError={setHasError}
            headers={["name", "address", "contact"]}
            setGroupData={setGroupData}
            page="merchant"
            uploading={uploading}
            setUploading={setUploading}
          />
        )}
      </div>
      {submitting && (
        <div className="">
          <div className="loading loading-spinner loading-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
        </div>
      )}
      {errorOnSubmit && (
        <AlertDialog
          title={errorOnSubmit}
          styles="alert-error absolute w-fit mx-10 py-3 bottom-3"
          icon={<BiError size={20} />}
        />
      )}
      <div className="flex justify-end mr-10">
        <Alert
          styles="btn-primary px-10"
          alertHeader="Add User"
          alertDescroption="Are you sure you want to add these user?"
          id="add_user"
          disabled={uploading}
          action={handleSubmit}
        >
          Add
        </Alert>
      </div>
    </div>
  );
}