import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import ProductInputField from "./productInputField";
import axios from "axios";
import { Model } from "@/lib/types";
import MobileInput from "../usersForm/mobileInput";
import { IoMdRemoveCircleOutline } from "react-icons/io";

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

  // const deleteRow = (index: number) => {
  //   setFormValues(prevFormValues => prevFormValues.filter((value, i) => i !== index));
  // };

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
<<<<<<< Updated upstream
      <form action={""}>
        <table className="table-auto inline-table w-full">
          <thead>
            <tr>
              {/* <th>No.</th>
              <th className="w-[25%]">Model</th>
              <th>S/N</th> */}
            </tr>
          </thead>
          <tbody className="p-2 ml-2 ">
=======
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
      <div className="sm:hidden max-h-[75vh] overflow-scroll">
        <form action="">
          <div className="flex flex-col gap-5">
>>>>>>> Stashed changes
            {formValues.map((_, index) => {
              return (
                <MobileInput
                  key={index}
                  page="product"
                  index={index}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  models={models}
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

export default ProductInput;
