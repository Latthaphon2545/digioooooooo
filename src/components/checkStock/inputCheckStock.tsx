"use client";

import { useState } from "react";
import { RiQrScan2Line } from "react-icons/ri";
import Scanner from "./scanner";

export default function InputCheckStock() {
  const [barcodes, setBarcodes] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newBarcodes = [...barcodes];
    newBarcodes[index] = e.target.value;
    setBarcodes(newBarcodes);
  };

  const setCode = (code: string) => {
    if (currentIndex !== null) {
      const newBarcodes = [...barcodes];
      newBarcodes[currentIndex] = code;
      setBarcodes(newBarcodes);
    }
  };

  const submit = () => {
    const nonEmptyBarcodes = barcodes.filter((barcode) => barcode !== "");

    if (window.confirm("Are you sure you want to submit?")) {
      console.log("Submitted");
      console.log(nonEmptyBarcodes);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        {barcodes.map((barcode, index) => (
          <li key={index} className="flex flex-col gap-2">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow w-full"
                placeholder="Serial Number...."
                value={barcode}
                onChange={(e) => handleInputChange(e, index)}
              />
              {/* <div className="tooltip" data-tip="Scan Barcode">
                <label
                  htmlFor={`scanner-modal-${index}`}
                  className="cursor-pointer text-xl"
                  onClick={() => setCurrentIndex(index)}
                >
                  <RiQrScan2Line />
                </label>
              </div> */}
            </label>
          </li>
        ))}
      </div>

      {/* {currentIndex !== null && (
        <input
          type="checkbox"
          id={`scanner-modal-${currentIndex}`}
          className="modal-toggle"
        />
      )}

      {currentIndex !== null && (
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Scan QR Code</h3>
            <div className="py-2 text-sm text-start">
              <Scanner
                setCode={setCode}
                setActive={(active: boolean) =>
                  setCurrentIndex(active ? currentIndex : null)
                }
              />
            </div>
            <div className="modal-action">
              <label
                htmlFor={`scanner-modal-${currentIndex}`}
                className="btn"
                onClick={() => setCurrentIndex(null)}
              >
                Close
              </label>
            </div>
          </div>
          <label
            className="modal-backdrop"
            htmlFor={`scanner-modal-${currentIndex}`}
          >
            Close
          </label>
        </div>
      )} */}

      <button className="btn btn-primary" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
