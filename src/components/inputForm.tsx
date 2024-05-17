"use client";
import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import UserInput from "./userInput";
import InputHeader from "./inputHeader";

const InputForm = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <InputHeader
        icon={<IoPersonAddSharp />}
        title="Add User"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 0 && <UserInput />}
      {activeTab === 1 && <p>Tab 2</p>}
    </div>
  );
};

export default InputForm;
