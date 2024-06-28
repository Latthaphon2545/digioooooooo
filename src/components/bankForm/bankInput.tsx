import React from "react";
import SubmitPopupButton from "../submitPopupButton";
import ImageRenderer from "../imageRenderer";
import { createBank } from "@/app/action/bank/actions";

export default function BankInput() {
  return (
    <div className="flex justify-center items-center  h-[100%]  my-auto">
      <form
        action={createBank}
        className="flex flex-col mobile:space-y-8 lg:space-y-0  w-full overflow-hidden justify-center items-center"
      >
        <div className="w-full  flex flex-col justify-center">
          <div className="flex flex-row items-center">
            <ImageRenderer />
          </div>
        </div>
        <div className="flex relative flex-col space-y-3 items-center justify-center px-10 pt-6 w-[50vh]">
          <label htmlFor="" className=" font-semibold w-full">
            Name:
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              className="mt-3 font-normal block p-2.5  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <div className="w-full">
            <SubmitPopupButton
              styles="btn-primary px-10 w-full"
              header="Add New Bank"
              description="Are you sure you want to add this Bank"
              id="add_bank"
            >
              Add
            </SubmitPopupButton>
          </div>
          {/* <div className="absolute -bottom-5 left-0 grid grid-cols-3 ">
        {state.errors &&
          state.errors.map((error) => (
            <div key={error} className="text-error text-sm">
              {error}
            </div>
          ))}
      </div> */}
        </div>
      </form>
    </div>
  );
}
