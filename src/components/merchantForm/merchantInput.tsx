import { Dispatch, SetStateAction, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Role } from "@/lib/types";
import MerchantInputField from "./merchantInputField";

type FormValues = {
  name: string;
  address: string;
  contact: string;
}[];

type MerchantInputProps = {
  formValues: FormValues;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
};

const MerchantInput = ({ formValues, setFormValues }: MerchantInputProps) => {
  const handleInputChange =
    (index: number, field: "name" | "contact" | "address") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFormValues = [...formValues];
      if (field === "name" || field === "contact" || field === "address") {
        newFormValues[index][field] = event.target.value;
      }
      setFormValues(newFormValues);
    };

  const addRow = () => {
    setFormValues([...formValues, { name: "", address: "", contact: "" }]);
  };

  return (
    <div>
      <form action={""}>
        <table className="table-auto inline-table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody className="p-2 ml-2 ">
            {formValues.map((_, index) => {
              return (
                <MerchantInputField
                  key={index}
                  index={index}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
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

export default MerchantInput;
