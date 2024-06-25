"use client";
import ModelInputField from "./modelInputField";
import SubmitPopupButton from "../submitPopupButton";
import ImageRenderer from "../imageRenderer";
import { createModel } from "@/lib/actions/model/action";
import { useFormState } from "react-dom";

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

  return (
    <div className="pt-4 sm:pt-0">
      <form
        action={formAction}
        className="flex mobile:flex-col lg:flex-row mobile:space-y-8 lg:space-y-0 lg:space-x-6 w-full overflow-hidden justify-center items-center"
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
              className={`lg:ml-7 mt-3 font-normal block p-2.5 lg:min-w-[70vh] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  w-full  `}
            ></textarea>
          </label>
          <fieldset className="flex flex-col space-y-1">
            <legend className="lg:ml-2 capitalize font-semibold">
              Specification:
            </legend>
            <div className="flex flex-col space-y-2 justify-start lg:ml-2">
              {INFORMATION_FIELD.map((field, index) => (
                <p className="text-sm">
                  <ModelInputField key={index} title={field} fieldset={true} />
                </p>
              ))}
            </div>
          </fieldset>
          <div className="flex justify-center tablet:justify-end">
            <SubmitPopupButton
              styles="btn-primary px-10 mb-4 sm:mb-4 w-full btn-wide"
              header="Add New Model"
              description="Are you sure you want to add this model"
              id="add_model"
            >
              Add
            </SubmitPopupButton>
          </div>
          <div className="absolute -bottom-5 left-0 grid grid-cols-3 ">
            {state.errors &&
              state.errors.map((error) => (
                <div key={error} className="text-error text-sm">
                  {error}
                </div>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModelInput;
