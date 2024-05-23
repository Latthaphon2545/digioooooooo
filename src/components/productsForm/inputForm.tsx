"use client";
import React, { useState } from "react";
import InputHeader from "../usersForm/inputHeader";
import { IoMdAddCircle } from "react-icons/io";
import GroupUpload from "../groupUpload";
import Alert from "../alert";
import ProductInput from "./productInput";

const InputForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [formValues, setFormValues] = useState([
    { model: "", sn: "" },
    { model: "", sn: "" },
    { model: "", sn: "" },
  ]);
  const model = ["A920", "A920 Pro", "A930", "A930 Pro"];

  const handleSubmit = () => {
    const filledOutInputs = formValues.filter(({ model, sn }) => sn || model);
    console.log(filledOutInputs);
  };

  return (
    <div>
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
            model={model}
          />
        )}
        {activeTab === 1 && (
          <GroupUpload setHasError={setHasError} headers={["sn", "model"]} />
        )}
      </div>
      <div className="flex justify-end mr-10">
        <Alert
          styles="btn-primary px-10"
          alertHeader="Add Product"
          alertDescroption="Are you sure you want to add these products?"
          id="add_product"
          disabled={hasError}
          action={handleSubmit}
        >
          Add
        </Alert>
      </div>
    </div>
  );
};

export default InputForm;
