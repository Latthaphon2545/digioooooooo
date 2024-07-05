import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import UserInputField from "./userInputField";
import { IoAddCircleOutline } from "react-icons/io5";
import { Role } from "@/lib/types";
import MobileInput from "./mobileInput";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import MobileButtonInput from "./mobileButtonInput";

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

  const endOfForm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (endOfForm.current) {
        endOfForm.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [formValues.length]);

  // const deleteRow = (index: number) => {
  //   setFormValues(prevFormValues => prevFormValues.filter((value, i) => i !== index));
  // };

  const deleteRow = () => {
    const newFormValues = [...formValues];
    newFormValues.pop();
    setFormValues(newFormValues);
  };

  const handleChangeFormValues = (newLength: number) => {
    if (newLength < formValues.length) {
      setFormValues((prevFormValues) => prevFormValues.slice(0, newLength));
    } else {
      const newFormValues = [...formValues];
      while (newFormValues.length < newLength) {
        newFormValues.push({ email: "", name: "", contact: "", role: null });
      }
      setFormValues(newFormValues);
    }
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
    <div className="">
      <div className="overflow-hidden mobile:max-h-[72vh] tablet:max-h-[75vh] mobile:hidden sm:block">
        <form action={""}>
          <table className="w-full flex-nowrap">
            <thead>
              <tr>
                {/* <th>No.</th>
                <th>Email</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Role</th> */}
              </tr>
            </thead>
            <tbody>
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
            <button
              type="button"
              onClick={addRow}
              disabled={formValues.length >= 10}
              className="disabled:opacity-20"
            >
              <IoAddCircleOutline size={40} />
            </button>
          </div>
        </form>
      </div>
      <div className="sm:hidden max-h-[85vh] overflow-scroll w-full">
        <form action="">
          <div className="flex flex-col gap-5">
            {formValues.map((_, index) => {
              return (
                <MobileInput
                  key={index}
                  index={index}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleRoleChange={handleRoleChange}
                />
              );
            })}
          </div>
          <MobileButtonInput
            formValues={formValues}
            addFunction={addRow}
            deleteFunction={deleteRow}
          />
          <div ref={endOfForm} />
        </form>
      </div>
    </div>
  );
};

export default UserInput;
