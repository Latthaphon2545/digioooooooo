"use client";
import React, { useEffect, useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import Alert from "../alert";
import InputHeader from "./inputHeader";
import UserInput from "./userInput";
import GroupUpload from "../groupUpload";
import { DataItem, Role } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import AlertDialog from "../alertDialog";
import { BiError } from "react-icons/bi";

type FormValues = {
  email: string;
  name: string;
  contact: string;
  role: Role | null;
}[];

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

  useEffect(() => {
    if (errorOnSubmit) {
      const timer = setTimeout(() => {
        setErrorOnSubmit("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorOnSubmit]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (
        activeTab === 0 &&
        formValues.every(
          ({ email, name, contact, role }) =>
            !email && !name && !contact && !role
        )
      ) {
        setErrorOnSubmit("Please fill out the form");
        return;
      }

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

      for (let input of filledOutInputs) {
        if (!input.email || !input.name || !input.contact || !input.role) {
          setErrorOnSubmit("Please fill out all fields");
          return;
        }
      }

      console.log("Sending data:", filledOutInputs);

      const res = await axios.post("/api/users/createUsers", filledOutInputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.code === "P2002") {
        setErrorOnSubmit(
          "Duplicate email found, please check your data again!"
        );
        return;
      }
      if (res.status === 201) {
        router.push(
          "/users?filter=&search=&skip=0&take=8&alert=Users added successfully"
        );
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setSubmitting(false);
      clearForm();
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
          styles="alert-error absolute w-fit mx-10 py-3 bottom-0"
          icon={<BiError size={20} />}
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
