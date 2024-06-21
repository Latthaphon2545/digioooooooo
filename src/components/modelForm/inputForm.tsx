import ServerSideInputHeader from "../serverSideInputHeader";
import InputHeader from "../usersForm/inputHeader";
import ModelInput from "./modelInput";
import { TbDeviceMobilePlus } from "react-icons/tb";

export default function ModelInputForm() {
  return (
    <div className="">
      <InputHeader
        icon={<TbDeviceMobilePlus size={80} />}
        title="Add Model"
        page="model"
      />
      <ModelInput />
    </div>
  );
}
