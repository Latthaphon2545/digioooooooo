"use client";
import ModelInputField from "./modelInputField";
import SubmitPopupButton from "../submitPopupButton";
import ImageRenderer from "../imageRenderer";
import { createModel } from "@/lib/actions/model/action";
import AlertDialog from "../alertDialog";
import { BiError } from "react-icons/bi";
import { useFormState } from "react-dom";
import { useState } from "react";

const ModelInput = () => {
  const INFORMATION_FIELD = [
    "operating_system",
    "processor",
    "display",
    "connectivity",
    "battery",
    "payment_features",
    "cameras",
  ];
  const [state, formAction] = useFormState(createModel, { errors: [] });
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="pt-4 sm:pt-0 h-full">
      <form
        action={formAction}
        className="flex mobile:flex-col lg:flex-row mobile:space-y-8 lg:space-y-0 lg:space-x-6 w-full overflow-hidden justify-center items-center h-full"
      >
        <div className="w-[50vh]  flex flex-col justify-center">
          <div className="flex flex-row items-center">
            <ImageRenderer />
          </div>
        </div>
        <div className="w-full flex relative flex-col space-y-3 justify-center px-6 sm:px-10">
          <label htmlFor="" className="lg:ml-2">
            <span className="font-semibold">Series:</span>
            <span className="text-sm">
              <ModelInputField title="series" fieldset={false} />
            </span>
          </label>
          <label htmlFor="" className="lg:ml-2 font-semibold">
            Description:
            <textarea
              name="description"
              id=""
              rows={2}
              placeholder="Description"
              className={`lg:ml-7 mt-3 font-normal block p-2.5 lg:min-w-[70vh] text-sm text-base-content bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  w-full  bg-transparent`}
            ></textarea>
          </label>
          <fieldset className="flex flex-col space-y-1">
            <legend className="lg:ml-2 capitalize font-semibold">
              Specification:
            </legend>
            <div className="flex flex-col space-y-2 justify-start lg:ml-2">
              {INFORMATION_FIELD.map((field, index) => (
                <p key={index} className="text-sm">
                  <ModelInputField title={field} fieldset={true} />
                </p>
              ))}
            </div>
          </fieldset>
          <div className="flex justify-center tablet:justify-end w-full">
            <SubmitPopupButton
              styles="btn-primary mb-4 btn-wide sm:btn-md rounded-xl"
              header="Add New Model"
              description="Are you sure you want to add this model"
              id="add_model"
              disabled={false}
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
      {state.errors.length > 0 && (
        <AlertDialog
          title={state.errors[0]}
          styles="alert-error absolute w-fit mx-10 py-3 bottom-3"
          icon={<BiError size={20} />}
        />
      )}
    </div>
  );
};

export default ModelInput;
