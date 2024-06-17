"use client";

import React, { useState } from "react";
import InputCheckStock from "./inputCheckStock";
import { BiBarcodeReader } from "react-icons/bi";
import Scanner from "./scanner";

export default function CheckStockPage() {
  const [scanner, setScanner] = useState(false);
  return (
    <div className="gap-4 mx-5 my-3 ">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-around">
          <div className="w-3/6">
            <p className="mb-5">Type the barcode to check the stock</p>
            <div className="pr-[20%] pl-[5%]">
              <InputCheckStock />
            </div>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="w-3/6 flex flex-col justify-center items-center gap-5">
            <p>Scan the barcode to check the stock</p>
            <div className="flex justify-center items-center h-[25vw] w-[25vw]">
              {scanner ? (
                <Scanner />
              ) : (
                <BiBarcodeReader className="text-[25vw]" />
              )}
            </div>
            <div
              className={`btn w-3/6 btn-primary btn-lg`}
              onClick={() => {
                setScanner(!scanner);
              }}
            >
              {scanner ? "Stop Scanner" : "Start Scanner"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
