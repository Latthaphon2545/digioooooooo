import { Dispatch, SetStateAction, useState } from "react";
import UserInputField from "./userInputField";
import { IoAddCircleOutline } from "react-icons/io5";
import { Role } from "@/lib/types";

type FormValues = {
  email: string;
  name: string;
  contact: string;
  role: Role | null;
}[];

type UserInputProps = {
  formValues: FormValues;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
};

const UserInput = ({ formValues, setFormValues }: UserInputProps) => {
  const handleInputChange =
    (index: number, field: keyof (typeof formValues)[0]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFormValues = [...formValues];
      if (field === "role") {
        newFormValues[index][field] = event.target.value as Role;
      } else if (field === "name") {
        newFormValues[index][field] = event.target.value;
      } else {
        newFormValues[index][field] = event.target.value.trim();
      }
      setFormValues(newFormValues);
    };

  const handleRoleChange = (index: number, newRole: Role) => {
    const newFormValues = [...formValues];
    newFormValues[index].role = newRole;
    setFormValues(newFormValues);
  };

  const addRow = () => {
    setFormValues([
      ...formValues,
      { email: "", name: "", contact: "", role: null },
    ]);
  };

  return (
    <div>
      <form action={""}>
        <table className="w-full flex-nowrap overflow-hidden">
          <thead>
            <tr>
              <th>No.</th>
              <th>Email</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody className="p-2 ml-2 ">
            {formValues.map((_, index) => {
              return (
                <UserInputField
                  key={index}
                  index={index}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleRoleChange={handleRoleChange}
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

export default UserInput;
