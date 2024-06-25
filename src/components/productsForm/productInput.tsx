import { Dispatch, SetStateAction, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import ProductInputField from "./productInputField";
import axios from "axios";
import { Model } from "@/lib/types";

type FormValues = {
  sn: string;
  model: string;
}[];

type ProductInputProps = {
  formValues: FormValues;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
  models: Model[];
};

const ProductInput = ({
  formValues,
  setFormValues,
  models,
}: ProductInputProps) => {
  const handleInputChange =
    (index: number, field: keyof (typeof formValues)[0]) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const newFormValues = [...formValues];
      newFormValues[index][field] = event.target.value;
      setFormValues(newFormValues);
    };

  const addRow = () => {
    setFormValues([...formValues, { sn: "", model: "" }]);
  };

  return (
    <div>
      <form action={""}>
        <table className="table-auto inline-table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th className="w-[25%]">Model</th>
              <th>S/N</th>
            </tr>
          </thead>
          <tbody className="p-2 ml-2 ">
            {formValues.map((_, index) => {
              return (
                <ProductInputField
                  key={index}
                  index={index}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  model={models}
                />
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-center">
          <button type="button" onClick={addRow}>
            <IoAddCircleOutline size={40} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductInput;
