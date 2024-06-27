import React from "react";
import MobileInputField from "../mobileInputField";
import { Model } from "@/lib/types";

type FormValues = {
  model: string;
  sn: string;
}[];

type mobileInputProps = {
  index: number;
  formValues: FormValues;
  handleInputChange: (
    index: number,
    field: any
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  models: Model[];
};

export default function MobileInput({
  index,
  formValues,
  handleInputChange,
  models,
}: mobileInputProps) {
  return (
    <div>
      <label className="border p-1 rounded-lg flex items-center gap-2 m-1">
        <select
          className="grow bg-white"
          value={formValues[index].model}
          onChange={handleInputChange(index, "model")}
        >
          <option disabled={true} value="">
            Select Model
          </option>
          {models.map((model, index) => (
            <option key={index} value={model.id}>
              {model.series}
            </option>
          ))}
        </select>
      </label>
      <MobileInputField
        placeholder="Serial Number"
        value={formValues[index].sn}
        onChange={handleInputChange(index, "sn")}
      />
    </div>
  );
}
