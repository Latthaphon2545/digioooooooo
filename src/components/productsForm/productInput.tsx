import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import ProductInputField from "./productInputField";
import { Model } from "@/lib/types";
import MobileButtonInput from "../usersForm/mobileButtonInput";
import MobileInput from "./mobileInput";

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

  const endOfForm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (endOfForm.current) {
        endOfForm.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [formValues.length]);

  const deleteRow = () => {
    const newFormValues = [...formValues];
    newFormValues.pop();
    setFormValues(newFormValues);
  };

  const addRow = () => {
    setFormValues([...formValues, { sn: "", model: "" }]);
  };

  return (
    <div>
      <div className="overflow-hidden mobile:max-h-[72vh] tablet:max-h-[75vh] mobile:hidden sm:block">
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
      <div className="sm:hidden max-h-[65vh] overflow-scroll">
        <form action="">
          <div className="flex flex-col gap-5">
            {formValues.map((_, index) => {
              return (
                <MobileInput
                  key={index}
                  index={index}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  models={models}
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

export default ProductInput;
