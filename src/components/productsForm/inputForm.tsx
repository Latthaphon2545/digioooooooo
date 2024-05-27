"use client";
import React, { useEffect, useState } from "react";
import InputHeader from "../usersForm/inputHeader";
import { IoMdAddCircle } from "react-icons/io";
import GroupUpload from "../groupUpload";
import Alert from "../alert";
import ProductInput from "./productInput";
import { DataItem } from "@/lib/types";
import axios from "axios";

const getNameModel = async () => {
  const res = await axios.get("/api/model/getNameModel");
  return res.data.seriesModel;
};

const InputForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [model, setModel] = useState([]);
  const [groupData, setGroupData] = useState<Array<DataItem>>([]);
  const [formValues, setFormValues] = useState([
    { model: "", sn: "" },
    { model: "", sn: "" },
    { model: "", sn: "" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNameModel();
      setModel(res);
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    const filledOutInputs =
      activeTab === 0
        ? formValues.filter(({ model, sn }) => sn || model)
        : groupData;
    const res = axios.post("/api/users/createUsers", filledOutInputs);
    console.log(res);
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
          <GroupUpload
            setHasError={setHasError}
            headers={["model", "sn"]}
            model={model}
            setGroupData={setGroupData}
            page="product"
          />
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
