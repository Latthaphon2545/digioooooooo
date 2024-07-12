import React from "react";

type BankInputFieldProps = {
  title: string;
  placeholder: string;
  name: string;
};

export default function BankInputField({
  title,
  placeholder,
  name,
}: BankInputFieldProps) {
  return (
    <label htmlFor="" className=" font-semibold w-full">
      {title}:
      <input
        type="text"
        name={name}
        required
        placeholder={placeholder}
        className="mt-3 font-normal block p-2.5  w-full text-sm text-base-content bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
      />
    </label>
  );
}
