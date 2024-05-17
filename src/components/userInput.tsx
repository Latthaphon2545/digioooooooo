import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import InputField from "./inputField";

const UserInput = () => {
  const [inputList, setInputList] = useState([
    {
      id: 1,
      inputs: [
        { placeholder: "email" },
        { placeholder: "name" },
        { placeholder: "contact" },
      ],
    },
  ]);

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        id: inputList.length + 1,
        inputs: [
          { placeholder: "email" },
          { placeholder: "name" },
          { placeholder: "contact" },
        ],
      },
    ]);
  };

  return (
    <div className="flex flex-col space-y-3 items-center">
      {inputList.map((user, index) => {
        return (
          <div key={index} className="w-full">
            <div className="divider mb-8 font-semibold text-xl">
              User {user.id}
            </div>
            {user.inputs.map((input, index) => (
              <label className="flex items-center mb-5 w-full" key={index}>
                <InputField placeholder={input.placeholder} />
              </label>
            ))}
          </div>
        );
      })}
      <button
        className="btn btn-circle justify-center"
        onClick={handleAddClick}
      >
        <IoPersonAddSharp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default UserInput;
