import React from "react";

type InputFieldProps = {
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

export default function MerchantInputField({
  index,
  formValues,
  handleInputChange,
}: InputFieldProps) {
  return (
    <tr key={index}>
      <td>
        <p className="text-center text-xl font-semibold">{index + 1}</p>
      </td>
      <td className="w-[25%]">
        <label className="input input-sm input-bordered flex items-center gap-2 m-2 relative">
          <input
            type="text"
            className="grow"
            placeholder="Name"
            value={formValues[index].name}
            onChange={handleInputChange(index, "name")}
          />
        </label>
      </td>
      <td className="w-[50%]">
        <label className="input input-sm input-bordered flex items-center gap-2 m-1">
          <input
            type="text"
            className="grow"
            placeholder="Address"
            value={formValues[index].address}
            onChange={handleInputChange(index, "address")}
          />
        </label>
      </td>
      <td className="w-[25%]">
        <label className="input input-sm input-bordered flex items-center gap-2 m-1">
          <input
            type="text"
            className="grow"
            placeholder="Contact"
            value={formValues[index].contact}
            onChange={handleInputChange(index, "contact")}
          />
        </label>
      </td>
    </tr>
  );
}
