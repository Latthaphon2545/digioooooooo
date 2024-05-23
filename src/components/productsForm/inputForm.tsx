import React, { useState } from "react";
import InputHeader from "../usersForm/inputHeader";
import { IoMdAddCircle } from "react-icons/io";
import GroupUpload from "../groupUpload";
import Alert from "../alert";

const InputForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hasError, setHasError] = useState(false);

  return (
    <div>
      <InputHeader
        icon={<IoMdAddCircle />}
        title="Add Producr"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="min-h-[75vh]">
        {activeTab === 0 && <p></p>}
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
          id="add_product"
          disabled={hasError}
        >
          Add
        </Alert>
      </div>
    </div>
  );
};

export default InputForm;
