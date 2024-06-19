"use client";
import React, { useEffect, useState } from "react";
import InputHeader from "../usersForm/inputHeader";
import { IoMdAddCircle } from "react-icons/io";
import GroupUpload from "../groupUpload";
import Alert from "../alert";
import ProductInput from "./productInput";
import { DataItem, Model } from "@/lib/types";
import axios from "axios";
import { checkFormatInput } from "@/lib/inputUtils";
import AlertDialog from "../alertDialog";
import { BiError } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";

const InputForm = ({ models }: { models: Model[] }) => {
  const initialActiveTab = useSearchParams().get("activeTab") || 0;
  const [activeTab, setActiveTab] = useState(Number(initialActiveTab));
  const [hasError, setHasError] = useState(false);
  const [groupData, setGroupData] = useState<Array<DataItem>>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState("");
  const router = useRouter();
  const [formValues, setFormValues] = useState([
    { model: "", sn: "" },
    { model: "", sn: "" },
    { model: "", sn: "" },
  ]);

  useEffect(() => {
    if (errorOnSubmit) {
      const timer = setTimeout(() => {
        setErrorOnSubmit("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorOnSubmit]);

  const handleSubmit = async () => {
    if (activeTab === 1 && groupData.length === 0) {
      setErrorOnSubmit("Please upload a file before submitting");
      return;
    }

    if (activeTab === 0 && formValues.every(({ model, sn }) => !model && !sn)) {
      setErrorOnSubmit("Please fill out the form");
      return;
    }

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

      if (filledOutInputs.some((item) => !item.model || !item.sn)) {
        setSubmitting(false);
        setErrorOnSubmit("All fields are required!!");
        return;
      }

      const res = await axios.post(
        "/api/products/createProduct",
        filledOutInputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.errors) {
        setErrorOnSubmit(res.data.errors[0].message);
        return;
      }
      if (res.data) {
        router.push(
          "/products?filter=&search=&skip=0&take=8&alert=Products added successfully"
        );
      }
      clearForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrorOnSubmit(error.response.data.message);
        } else {
          setErrorOnSubmit("An error occurred while submitting the form");
        }
      }
    } finally {
      setSubmitting(false);
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
      <div className="min-h-[68vh] mobile:mt-5 laptop:mt-0 mobile:px-3 laptop:px-0">
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
            setErrorOnSubmit={setErrorOnSubmit}
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
          styles="bg-error"
          icon={<BiError size={20} />}
        />
      )}
      <div className="flex justify-end mr-10">
        <Alert
          styles="btn-primary px-10 w-full mobile:mt-5 laptop:mt-0 mobile:w-full laptop:w-auto btn-wide fixed mobile:bottom-0 mobile:right-0 laptop:bottom-5 laptop:right-10 mobile:text-xl laptop:text-lg"
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
