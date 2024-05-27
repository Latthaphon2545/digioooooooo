import { TbDeviceMobilePlus } from "react-icons/tb";

export default function ModelInputHeader() {
  return (
    <div className="flex flex-row items-center space-x-5">
      <TbDeviceMobilePlus className="" size={80} />
      <h1 className="text-3xl font-bold">Add Model</h1>
    </div>
  );
}
