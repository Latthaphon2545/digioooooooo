"use client";
import React from "react";
import SubmitPopupButton from "../submitPopupButton";
import ImageRenderer from "../imageRenderer";
import { useFormState } from "react-dom";
import AlertDialog, { ErrorStyle } from "../alertDialog";
import { BiError } from "react-icons/bi";
import { createBank } from "@/lib/actions/bank/actions";
import BankInputField from "./bankInputField";

export default function BankInput() {
  const [state, formAction] = useFormState(createBank, { errors: [] });
  return (
    <div className="flex justify-center items-center  h-full  my-auto">
      <form
        action={formAction}
        className="flex flex-col mobile:space-y-8 lg:space-y-0   w-full overflow-hidden justify-center items-center"
      >
        <div className="w-full  flex flex-col justify-center">
          <div className="flex flex-row items-center">
            <ImageRenderer />
          </div>
        </div>
        <div className="flex relative flex-col space-y-3 items-center justify-center px-10 pt-4 w-[50vh]">
          <BankInputField
            title="Name"
            placeholder="Kasikorn Bank"
            name="name"
          />
          <BankInputField
            title="Abbreviation"
            placeholder="Kasikorn Bank = KBank"
            name="bankAbbreviation"
          />
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
          <AlertDialog
            alertTitle={state.errors[0]}
            styles={ErrorStyle}
            id="ErrorAddBank"
            icon={<BiError size={20} />}
          />
        </div>
      </form>
    </div>
  );
}
