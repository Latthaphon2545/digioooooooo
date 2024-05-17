import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";

const UserInput = () => {
  const [inputList, setInputList] = useState([
    { placeholder: "email" },
    { placeholder: "name" },
    { placeholder: "contact" },
  ]);

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { placeholder: "email" },
      { placeholder: "name" },
      { placeholder: "contact" },
    ]);
  };

  const inputField = (input: { placeholder: string }) => {
    return input.placeholder === "email" ? (
      <div className="flex justify-between border-2 border-gray-300 rounded-lg w-full">
        <input
          name={input.placeholder}
          type="text"
          placeholder={input.placeholder}
          className="pl-3 placeholder:capitalize flex-grow"
        />
        <span className="bg-primary p-[0.8rem] rounded-r-lg">@digio.co.th</span>
      </div>
    ) : (
      <input
        name={input.placeholder}
        type="text"
        placeholder={input.placeholder}
        className="placeholder:capitalize p-3 border-2 border-gray-300 rounded-lg w-full"
      />
    );
  };

  return (
    <div className="flex flex-col space-y-3 items-center">
      {inputList.map((input, index) => {
        return (
          <label className="flex items-center w-full" key={index}>
            {inputField(input)}
          </label>
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
