import { Model } from "@/lib/types";
import React from "react";

type InputFieldProps = {
  index: number;
  formValues: {
    model: string;
    sn: string;
  }[];
  model: Model[];
  handleInputChange: (
    index: number,
    field: "model" | "sn"
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const ProductInputField = ({
  index,
  formValues,
  model,
  handleInputChange,
}: InputFieldProps) => (
  <tr key={index}>
    <td>
      <p className="text-center text-xl font-semibold">{index + 1}</p>
    </td>
    <td>
      <label className="border p-[0.35rem] rounded-lg flex items-center gap-2 m-1">
        <select
          className="grow bg-white"
          value={formValues[index].model}
          onChange={handleInputChange(index, "model")}
        >
          <option disabled={true} value="">
            Select Model
          </option>
          {model.map((model, index) => (
            <option key={index} value={model.id}>
              {model.series}
            </option>
          ))}
        </select>
      </label>
    </td>
    <td>
      <label className="input input-sm input-bordered flex items-center gap-2 m-2 relative">
        <input
          type="text"
          className="grow"
          placeholder="sn"
          value={formValues[index].sn}
          onChange={handleInputChange(index, "sn")}
        />
      </label>
    </td>
  </tr>
);

export default ProductInputField;
