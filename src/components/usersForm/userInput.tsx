import { Dispatch, SetStateAction, useState } from "react";
import UserInputField from "./userInputField";
import { IoAddCircleOutline } from "react-icons/io5";

type FormValues = {
  email: string;
  username: string;
  contact: string;
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
      newFormValues[index][field] = event.target.value;
      setFormValues(newFormValues);
    };

  const addRow = () => {
    setFormValues([...formValues, { email: "", username: "", contact: "" }]);
  };

  return (
    <div>
      <form action={""}>
        <table className="table-auto inline-table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Email</th>
              <th>Name</th>
              <th>Contact</th>
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
