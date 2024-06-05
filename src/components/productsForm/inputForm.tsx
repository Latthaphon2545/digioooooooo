"use client";
import React, { useState } from "react";
import InputHeader from "../usersForm/inputHeader";
import { IoMdAddCircle } from "react-icons/io";
import GroupUpload from "../groupUpload";
import Alert from "../alert";
import ProductInput from "./productInput";
import { DataItem, Model } from "@/lib/types";
import axios from "axios";
import { checkFormatInput } from "@/lib/inputUtils";
import AlertDialog from "../alertDialog";
import { useRouter } from "next/navigation";

const InputForm = ({ models }: { models: Model[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [groupData, setGroupData] = useState<Array<DataItem>>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState([
    { model: "", sn: "" },
    { model: "", sn: "" },
    { model: "", sn: "" },
  ]);
  const router = useRouter();

  const handleSubmit = async () => {
    setSubmitting(true);
    groupData.forEach((item) => {
      item.model = models.find(
        (model) =>
          model.series.toLowerCase() === checkFormatInput(item.model ?? "")
      )?.id;
    });
    try {
      const filledOutInputs =
        activeTab === 0
          ? formValues.filter(({ model, sn }) => sn || model)
          : groupData;
      const res = await axios.post(
        "/api/products/createProduct",
        filledOutInputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) {
        console.log("Create Products Success", res.data);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("alert", "Products added successfully");
        router.replace(
          `/products?filter=&search=&skip=0&take=8&${urlParams.toString()}`
        );
      } else {
        console.error("Failed to create products:", res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
      clearForm();
    }
  };

  const clearForm = () => {
    setFormValues([
      { model: "", sn: "" },
      { model: "", sn: "" },
      { model: "", sn: "" },
    ]);
    setGroupData([]);
  };

  return (
    <div className="relative">
      <InputHeader
        icon={<IoMdAddCircle />}
        title="Add Product"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="min-h-[68vh]">
        {activeTab === 0 && (
          <ProductInput
            formValues={formValues}
            setFormValues={setFormValues}
            models={models}
          />
        )}
        {activeTab === 1 && (
          <GroupUpload
            setHasError={setHasError}
            headers={["model", "sn"]}
            models={models}
            setGroupData={setGroupData}
            page="product"
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
      {submitted && (
        <AlertDialog
          title="Products added successfully"
          styles="alert-success absolute w-[50vh] mx-10"
        />
      )}
      <div className="flex justify-end mr-10">
        <Alert
          styles="btn-primary px-10"
          alertHeader="Add Product"
          alertDescroption="Are you sure you want to add these products?"
          id="add_product"
          disabled={hasError || uploading}
          action={handleSubmit}
        >
          Add
        </Alert>
      </div>
    </div>
  );
};

export default InputForm;
