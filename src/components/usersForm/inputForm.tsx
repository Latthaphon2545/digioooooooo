"use client";
import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import Alert from "../alert";
import InputHeader from "./inputHeader";
import UserInput from "../userInput";
import GroupUpload from "../groupUpload";

const InputForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hasError, setHasError] = useState(false);

  return (
    <div>
      <InputHeader
        icon={<IoPersonAddSharp />}
        title="Add User"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="min-h-[75vh]">
        {activeTab === 0 && <UserInput />}
        {activeTab === 1 && (
          <GroupUpload
            setHasError={setHasError}
            headers={["email", "name", "contact"]}
          />
        )}
      </div>
      <div className="flex justify-end mr-10">
        <Alert
          styles="btn-primary px-10"
          alertHeader="Add User"
          alertDescroption="Are you sure you want to add this user?"
          id="add_user"
          disabled={hasError}
        >
          Add
        </Alert>
      </div>
    </div>
  );
};

export default InputForm;
