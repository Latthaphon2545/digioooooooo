import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import MerchantInputField from "./merchantInputField";
import MobileInput from "./mobileInput";
import { IoMdRemoveCircleOutline } from "react-icons/io";

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
  const endOfForm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfForm.current) {
      endOfForm.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formValues.length]);

  const deleteRow = () => {
    const newFormValues = [...formValues];
    newFormValues.pop();
    setFormValues(newFormValues);
  };

  return (
    <div>
      <div className="overflow-hidden mobile:max-h-[72vh] tablet:max-h-[75vh] mobile:hidden sm:block">
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
      <div className="sm:hidden max-h-[75vh] overflow-scroll">
        <form action="">
          <div className="flex flex-col gap-5">
            {formValues.map((_, index) => {
              return (
                <MobileInput
                  key={index}
                  index={index}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                />
              );
            })}
          </div>
          <div
            className={`flex items-center justify-center mt-2 fixed bottom-5 left-4 ${
              formValues.length < 10 ? "space-x-3" : "space-x-1"
            }`}
          >
            <button
              type="button"
              onClick={deleteRow}
              disabled={formValues.length === 1}
            >
              <IoMdRemoveCircleOutline size={40} />
            </button>
            <div className="text-2xl font-semibold">{formValues.length}</div>
            <button type="button" onClick={addRow}>
              <IoAddCircleOutline size={40} />
            </button>
          </div>
          <div ref={endOfForm} />
        </form>
      </div>
    </div>
  );
};

export default MerchantInput;
