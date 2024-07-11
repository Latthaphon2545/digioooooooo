import React from "react";
import SubmitPopupButton from "../submitPopupButton";
import ImageRenderer from "../imageRenderer";
import { createBank } from "@/app/(withAutn)/action/bank/actions";

export default function BankInput() {
  return (
    <div className="flex justify-center items-center  h-full  my-auto">
      <form
        action={createBank}
        className="flex flex-col mobile:space-y-8 lg:space-y-0   w-full overflow-hidden justify-center items-center"
      >
        <div className="w-full  flex flex-col justify-center">
          <div className="flex flex-row items-center">
            <ImageRenderer />
          </div>
        </div>
        <div className="flex relative flex-col space-y-3 items-center justify-center px-10 pt-4 w-[50vh]">
          <label htmlFor="" className=" font-semibold w-full">
            Name:
            <input
              type="text"
              name="name"
              required
              placeholder="Kasikorn Bank"
              className="mt-3 font-normal block p-2.5  w-full text-sm text-base-content bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
            />
          </label>
          <label htmlFor="" className=" font-semibold w-full">
            Abbreviation:
            <input
              type="text"
              name="bankAbbreviation"
              required
              placeholder="Kasikorn Bank = KBANK"
              className="mt-3 font-normal block p-2.5  w-full text-sm text-base-content bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
            />
          </label>
          <div className="w-full">
            <SubmitPopupButton
              styles="btn-primary px-10 w-full"
              header="Add New Bank"
              description="Are you sure you want to add this Bank"
              id="add_bank"
              confirmString="Add"
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
