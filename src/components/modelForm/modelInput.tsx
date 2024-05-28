"use client";
import { StatusProduct } from "@/lib/types";
import ModelInputField from "./modelInputField";
import { RiImageAddLine } from "react-icons/ri";
import Alert from "../alert";
import axios from "axios";
import SubmitPopupButton from "../submitPopupButton";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const model = {
      series: e.currentTarget.series.value,
      information: INFORMATION_FIELD.reduce(
        (infoObj: { [key: string]: string }, field) => {
          infoObj[field] = e.currentTarget[field].value;
          return infoObj;
        },
        {}
      ),
      status: Object.values(StatusProduct).reduce(
        (statusObj: Record<StatusProduct, number>, status: StatusProduct) => {
          statusObj[status] = 0;
          return statusObj;
        },
        {
          [StatusProduct.INSTOCK]: 0,
          [StatusProduct.LOST]: 0,
          [StatusProduct.DAMAGED]: 0,
          [StatusProduct.REPARING]: 0,
          [StatusProduct.WAITREPAIR]: 0,
          [StatusProduct.INSTALLED]: 0,
          [StatusProduct.INSTALLING]: 0,
        }
      ),
    };
    if (model.series && model.information) {
      submitModel(model);
    } else {
      console.error("Please fill in all fields");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <button className="btn btn-primary w-fit">Pick an Image</button>
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
