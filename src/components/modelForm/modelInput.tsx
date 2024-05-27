import { StatusProduct } from "@/lib/types";
import ModelInputField from "./modelInputField";
import { RiImageAddLine } from "react-icons/ri";
import Alert from "../alert";

const ModelInput = () => {
  const FIELD = Array(5).fill({
    series: "",
    information: "",
    imageUrl: "",
    status: {
      [StatusProduct.INSTOCK]: 0,
      [StatusProduct.LOST]: 0,
      [StatusProduct.DAMAGED]: 0,
      [StatusProduct.REPARING]: 0,
      [StatusProduct.WAITREPAIR]: 0,
      [StatusProduct.INSTALLED]: 0,
      [StatusProduct.INSTALLING]: 0,
    },
  });

  const INFORMATION_FIELD = [
    "operating_system",
    "processor",
    "display",
    "connectivity",
    "battery",
    "cameras",
    "payment_features",
  ];

  return (
    <div>
      <form action={""} className="flex flex-col space-y-3">
        <button className="btn btn-primary w-fit">Pick an Image</button>
        <ModelInputField title="series" fieldset={false} />
        <fieldset className="flex flex-col space-y-3">
          <legend className="ml-2 capitalize font-semibold">Information</legend>
          {INFORMATION_FIELD.map((field, index) => (
            <ModelInputField key={index} title={field} fieldset={true} />
          ))}
        </fieldset>
      </form>
      <Alert
        styles="btn-primary"
        alertHeader="Add New Model"
        alertDescroption="Are you sure you want to add this model?"
        id="add_model"
      >
        Submit
      </Alert>
    </div>
  );
};

export default ModelInput;
