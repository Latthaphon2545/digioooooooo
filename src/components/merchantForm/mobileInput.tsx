import React from "react";

type mobileInputProps = {
  index: number;
  formValues: {
    name: string;
    address: string;
    contact: string;
  }[];
  handleInputChange: (
    index: number,
    field: "address" | "contact" | "name"
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function MobileInput({
  index,
  formValues,
  handleInputChange,
}: mobileInputProps) {
  return (
    <div>
      <div className="text-2xl font-bold flex items-center justify-center btn btn-circle mx-auto mb-3">
        <p>{index + 1}</p>
      </div>
      <div className="w-full">
        <div className=" w-full h-full rounded   place-content-center">
          <label className="input  input-bordered input-sm flex items-center gap-2 m-1">
            <input
              type="text"
              className="grow"
              placeholder="Name"
              value={formValues[index].name}
              onChange={handleInputChange(index, "name")}
            />
          </label>
        </div>
        <div className=" w-full h-full rounded   place-content-center">
          <label className="input  input-bordered input-sm flex items-center gap-2 m-1">
            <input
              type="text"
              className="grow"
              placeholder="Address"
              value={formValues[index].address}
              onChange={handleInputChange(index, "address")}
            />
          </label>
        </div>
        <div className=" w-full h-full rounded   place-content-center">
          <label className="input  input-bordered input-sm flex items-center gap-2 m-1">
            <input
              type="text"
              className="grow"
              placeholder="Contact"
              value={formValues[index].contact}
              onChange={handleInputChange(index, "contact")}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
