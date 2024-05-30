"use client";
import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import Alert from "../alert";
import InputHeader from "./inputHeader";
import UserInput from "./userInput";
import GroupUpload from "../groupUpload";
import { DataItem, Role } from "@/lib/types";
import axios from "axios";

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

  const handleSubmit = async () => {
    try {
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
      console.log("Response data:", res.data);

      if (res.status === 201) {
        console.log("Users created successfully:", res.data);
      } else {
        console.error("Failed to create users:", res.data);
      }
    } catch (error) {
      console.error("Error creating users:", error);
    } finally {
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
    <div>
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
