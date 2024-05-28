"use client";

import { useState } from "react";

export default function InputCheckStock() {
  const [barcodes, setBarcodes] = useState([""]);

  const addInput = () => {
    setBarcodes([...barcodes, ""]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newBarcodes = [...barcodes];
    newBarcodes[index] = e.target.value;
    setBarcodes(newBarcodes);
  };

  const submit = () => {
    barcodes.forEach((barcode) => {
      if (barcode === "") {
        const index = barcodes.indexOf(barcode);
        if (index > -1) {
          barcodes.splice(index, 1);
        }
      }
    });
    console.log(barcodes);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {barcodes.map((barcode, index) => (
          <input
            key={index}
            type="text"
            placeholder="Serial Number"
            className="placeholder:capitalize p-3 border-2 border-gray-300 rounded-lg w-full"
            value={barcode}
            onChange={(e) => handleInputChange(e, index)}
          />
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <button className="btn" onClick={addInput}>
          Add Input
        </button>
        <button className="btn" onClick={submit}>
          Submit
        </button>
      </div>
    </>
  );
}
