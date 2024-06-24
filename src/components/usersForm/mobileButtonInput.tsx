import React from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

type mobileButtonInputProps = {
  formValues: any;
  addFunction: () => void;
  deleteFunction: () => void;
};

export default function MobileButtonInput({
  formValues,
  addFunction,
  deleteFunction,
}: mobileButtonInputProps) {
  return (
    <div
      className={`flex items-center w-1/3 z-20 justify-between mt-2 fixed bottom-5  ${
        formValues.length < 10 ? "space-x-3" : "space-x-1"
      }`}
    >
      <button
        type="button"
        onClick={deleteFunction}
        disabled={formValues.length === 1}
      >
        <IoMdRemoveCircleOutline size={40} />
      </button>
      <div className="text-2xl font-semibold">{formValues.length}</div>
      <button type="button" onClick={addFunction}>
        <IoAddCircleOutline size={40} />
      </button>
    </div>
  );
}
