import ModelInputField from "./modelInputField";
import SubmitPopupButton from "../submitPopupButton";
import ImageRenderer from "../imageRenderer";
import { createModel } from "@/lib/actions/model/action";

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

  return (
    <div>
      <form action={createModel} className="flex flex-row space-x-6">
        <div className="w-[50vh]  flex flex-col justify-center">
          <div className="flex flex-row items-center">
            <ImageRenderer />
          </div>
        </div>
        <div className="w-full flex flex-col space-y-3 justify-center px-10">
          <label htmlFor="" className="ml-2 font-semibold">
            Series:
            <ModelInputField title="series" fieldset={false} />
          </label>
          <label htmlFor="" className="ml-2 font-semibold">
            Description:
            <textarea
              name="description"
              id=""
              rows={2}
              placeholder="Description"
              className={`ml-7 mt-3 font-normal block p-2.5 min-w-[70vh] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  w-full  `}
            ></textarea>
          </label>
          <fieldset className="flex flex-col space-y-1">
            <legend className="ml-2 capitalize font-semibold">
              Specification:
            </legend>
            <div className="flex flex-col space-y-2 justify-start  ">
              {INFORMATION_FIELD.map((field, index) => (
                <ModelInputField key={index} title={field} fieldset={true} />
              ))}
            </div>
          </fieldset>
          <div className="flex justify-end">
            <SubmitPopupButton
              styles="btn-primary px-10"
              header="Add New Model"
              description="Are you sure you want to add this model"
              id="add_model"
            >
              Add
            </SubmitPopupButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModelInput;
