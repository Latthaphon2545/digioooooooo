"use client";

import { Model } from "@/lib/types";
import React, { useState } from "react";
import { BarcodeScanner } from "react-barcode-scanner";
import { BiBarcodeReader } from "react-icons/bi";
import Modal from "../modal";
import BarcodeScan from "../scaner/barcodeScan";

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
}: InputFieldProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <tr key={index}>
      <td>
        <p className="text-center text-xl font-semibold">{index + 1}</p>
      </td>
      <td>
        <label className=" flex items-center gap-2 m-1">
          <select
            className="grow bg-transparent  select select-bordered select-sm"
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
          <div
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
            className="btn btn-xs btn-ghost text-xl"
          >
            <BiBarcodeReader />
          </div>
        </label>
      </td>
      <td>
        {" "}
        {modalOpen && (
          <dialog
            id={`scanModal${index}`}
            className={`modal modal-bottom sm:modal-middle modal-${
              modalOpen ? "open" : "close"
            }`}
          >
            <div className="modal-box">
              <label
                htmlFor={`scanModal${index}`}
                className="btn btn-xs btn-circle btn-error absolute right-4 top-2"
                onClick={() => setModalOpen(false)}
              >
                X
              </label>
              <div className="py-4">
                <BarcodeScan
                  action={(code) => {
                    handleInputChange(
                      index,
                      "sn"
                    )({
                      target: {
                        value: code,
                      },
                    } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);

                    setModalOpen(false);
                  }}
                />
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setModalOpen(false)}>close</button>
            </form>
          </dialog>
        )}
      </td>
    </tr>
  );
};

export default ProductInputField;
