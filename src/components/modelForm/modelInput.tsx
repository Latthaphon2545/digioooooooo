import ModelInputField from "./modelInputField";
import axios from "axios";
import SubmitPopupButton from "../submitPopupButton";
import { createModel } from "@/app/action/model/actions";

const ModelInput = () => {
  const INFORMATION_FIELD = [
    "operating_system",
    "processor",
    "display",
    "connectivity",
    "battery",
    "cameras",
    "payment_features",
  ];

  const submitModel = async (model: any) => {
    try {
      const response = await axios.post("/api/model/createModel", model);
      console.log("data", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form action={createModel} className="flex flex-col space-y-3">
        <label htmlFor="image">Image URL</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="image"
          name="image"
        />
        <ModelInputField title="series" fieldset={false} />
        <fieldset className="flex flex-col space-y-3">
          <legend className="ml-2 capitalize font-semibold">Information</legend>
          {INFORMATION_FIELD.map((field, index) => (
            <ModelInputField key={index} title={field} fieldset={true} />
          ))}
        </fieldset>
        <SubmitPopupButton
          styles="btn-primary px-10"
          header="Add New Model"
          description="Are you sure you want to add this model"
          id="add_model"
        >
          Add
        </SubmitPopupButton>
      </form>
    </div>
  );
};

export default ModelInput;
