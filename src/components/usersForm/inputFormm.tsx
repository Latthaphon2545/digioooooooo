"use client";
import React, { useEffect, useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import Alert from "../alert";
import UserInput from "./userInput";
import GroupUpload from "../groupUpload";
import { DataItem, Role } from "@/lib/types";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import AlertDialog, { ErrorStyle } from "../alertDialog";
import { BiError } from "react-icons/bi";
import { isFormEmpty } from "@/lib/inputUtils";
import InputHeaderr from "./inputHeaderr";

type FormValues = {
  email: string;
  name: string;
  contact: string;
  role: Role | null;
}[];

const InputFormm = () => {
  const router = useRouter();
  const initialActiveTab = useSearchParams().get("activeTab") || 0;
  const [activeTab, setActiveTab] = useState(Number(initialActiveTab));
  const [hasError, setHasError] = useState(false);
  const [groupData, setGroupData] = useState<Array<DataItem>>([]);
  const [formValues, setFormValues] = useState<FormValues>([
    { email: "", name: "", contact: "", role: null },
    { email: "", name: "", contact: "", role: null },
  ]);

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState("");

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      if (
        formValues.some(
          ({ email }) => email.includes("@") && !email.endsWith("@digio.co.th")
        )
      ) {
        setErrorOnSubmit("Please enter a digio email address");
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
                email: value.email.endsWith("@digio.co.th")
                  ? value.email
                  : value.email + "@digio.co.th",
              }))
          : groupData;

      for (let input of filledOutInputs) {
        if (!input.email || !input.name || !input.contact || !input.role) {
          setErrorOnSubmit("Please fill out all fields");
          return;
        }
      }

      //console.log("Sending data:", filledOutInputs);

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
        clearForm();
        router.push(
          "/users?filter=&search=&skip=0&take=8&alert=Users added successfully"
        );
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormValues([
      { email: "", name: "", contact: "", role: null },
      { email: "", name: "", contact: "", role: null },
    ]);
    setGroupData([]);
  };

  return (
    <div className="relative w-full ">
      <InputHeaderr
        icon={<IoPersonAddSharp />}
        title="Add User"
        page="user"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div
        className={`tablet:min-h-[67vh] mobile:min-h-[75vh] mobile:mt-5 laptop:mt-0 mobile:px-3 sm:px-10 `}
        //     ${activeTab === 1 ? "flex items-center" : ""}
        // `}
      >
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
      {/* {submitting && (
        <div>
          <div className="loading loading-spinner loading-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
        </div>
      )} */}
      <AlertDialog
        alertTitle={errorOnSubmit}
        id="userAddError"
        icon={<BiError size={20} />}
        styles={ErrorStyle}
        setAlertTitle={setErrorOnSubmit}
      />
      <div
        className={`flex ${
          activeTab === 1 ? "justify-center" : ""
        } lg:justify-end w-full tablet:mr-10 align-bottom `}
      >
        <Alert
          styles={`btn-primary px-10 w-1/2 mobile:mt-5 lg:left-1/2 lg:transform lg:-translate-x-1/2 laptop:mt-0 ${
            activeTab === 0
              ? " right-5 bottom-4 w-1/2"
              : " w-2/3 left-1/2 transform -translate-x-1/2 bottom-4"
          } laptop:w-auto btn-wide fixed  lg:w-3/4  mobile:text-xl laptop:text-lg laptop:bottom-5 laptop:right-10 laptop:w-[20vh]  laptop:transform-none laptop:left-auto`}
          alertHeader="Add User"
          alertDescription="Are you sure you want to add these user?"
          id="add_user"
          disabled={
            hasError ||
            uploading ||
            submitting ||
            isFormEmpty(activeTab === 0 ? formValues : groupData)
          }
          action={handleSubmit}
          loading={submitting}
        >
          Add
        </Alert>
      </div>
    </div>
  );
};

export default InputFormm;
