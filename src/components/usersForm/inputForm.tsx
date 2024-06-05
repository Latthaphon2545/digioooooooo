"use client";
import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import Alert from "../alert";
import InputHeader from "./inputHeader";
import UserInput from "./userInput";
import GroupUpload from "../groupUpload";
import { DataItem, Role } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import AlertDialog from "../alertDialog";

type FormValues = {
  email: string;
  name: string;
  contact: string;
  role: Role | null;
}[];

type PrismaErrorProps = {
  code: string;
  meta: {
    target: string[];
  };
};

const InputForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [groupData, setGroupData] = useState<Array<DataItem>>([]);
  const [formValues, setFormValues] = useState<FormValues>([
    { email: "", name: "", contact: "", role: null },
    { email: "", name: "", contact: "", role: null },
    { email: "", name: "", contact: "", role: null },
  ]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      groupData.forEach((value) => {
        value.role = value.role?.toUpperCase().replace(/ +/g, "") as Role;
      });
      const filledOutInputs =
        activeTab === 0
          ? formValues
              .filter(
                ({ email, name, contact, role }) =>
                  email || name || contact || role
              )
              .map((value) => ({
                ...value,
                email: value.email + "@digio.co.th",
              }))
          : groupData;

      console.log("Sending data:", filledOutInputs);

      const res = await axios.post("/api/users/createUsers", filledOutInputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", res.status);
      if (res.data.code === "P2002") {
        setErrorOnSubmit("Duplicate email found");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        const prismaError = axiosError.response.data as PrismaErrorProps;
        if (prismaError.code === "P2002") {
          setErrorOnSubmit("Duplicate email found");
          console.error("A user with this email already exists");
        } else {
          setErrorOnSubmit("Error creating users");
          console.error("Error creating users:", axiosError);
        }
      }
    } finally {
      setSubmitting(false);
      clearForm();
      if (errorOnSubmit) {
        setTimeout(() => {
          setErrorOnSubmit("");
          router.refresh();
        }, 2000);
      }
    }
  };

  const clearForm = () => {
    setFormValues([
      { email: "", name: "", contact: "", role: null },
      { email: "", name: "", contact: "", role: null },
      { email: "", name: "", contact: "", role: null },
    ]);
    setGroupData([]);
  };

  return (
    <div className="relative">
      <InputHeader
        icon={<IoPersonAddSharp />}
        title="Add User"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="min-h-[68vh]">
        {activeTab === 0 && (
          <UserInput formValues={formValues} setFormValues={setFormValues} />
        )}
        {activeTab === 1 && (
          <GroupUpload
            setHasError={setHasError}
            headers={["email", "name", "contact", "role"]}
            setGroupData={setGroupData}
            page="user"
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
          styles="alert-error absolute w-[50vh] mx-10"
        />
      )}
      <div className="flex justify-end mr-10">
        <Alert
          styles="btn-primary px-10"
          alertHeader="Add User"
          alertDescroption="Are you sure you want to add these user?"
          id="add_user"
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
