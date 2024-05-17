import React, { useState } from "react";

const UserInput = () => {
  const [inputList, setInputList] = useState([
    { placeholder: "name" },
    { placeholder: "contact" },
    { placeholder: "email" },
  ]);

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { placeholder: "name" },
      { placeholder: "contact" },
      { placeholder: "email" },
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
    <div className="flex flex-col space-y-3">
      {inputList.map((input, index) => {
        return (
          <label className="flex items-center" key={index}>
            {inputField(input)}
          </label>
        );
      })}
      <button className="btn btn-circle" onClick={handleAddClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default UserInput;
