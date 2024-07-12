"use client";
import ModelInputField from "./modelInputField";
import SubmitPopupButton from "../submitPopupButton";
import ImageRenderer from "../imageRenderer";
import { createModel } from "@/lib/actions/model/action";
import AlertDialog, { ErrorStyle } from "../alertDialog";
import { BiError } from "react-icons/bi";
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
              <ModelInputField title="series" textarea={false} />
            </span>
          </label>
          <label htmlFor="" className="lg:ml-2 font-semibold">
            Description:
            <ModelInputField title="description" textarea={true} />
          </label>
          <fieldset className="flex flex-col space-y-1">
            <legend className="lg:ml-2 capitalize font-semibold">
              Specification:
            </legend>
            <div className="flex flex-col space-y-2 justify-start lg:ml-2">
              {INFORMATION_FIELD.map((field, index) => (
                <p key={index} className="text-sm">
                  <ModelInputField title={field} textarea={false} />
                </p>
              ))}
            </div>
          </fieldset>
          <div className="flex justify-center tablet:justify-end w-full">
            <SubmitPopupButton
              styles="btn-primary mb-4 btn-wide lg:btn-square lg:px-14 sm:btn-md rounded-xl"
              header="Add New Model"
              description="Are you sure you want to add this model"
              id="add_model"
              disabled={false}
              confirmString="Add"
            >
              Add
            </SubmitPopupButton>
          </div>
        </div>
      </form>
      <AlertDialog
        alertTitle={state.errors[0]}
        styles={ErrorStyle}
        icon={<BiError size={20} />}
        id="modelAddError"
      />
    </div>
  );
};

export default ModelInput;
