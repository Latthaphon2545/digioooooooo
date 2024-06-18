"use client";

import React, { useState } from "react";
import InputCheckStock from "./inputCheckStock";
import { BiBarcodeReader } from "react-icons/bi";
import Scanner from "./scanner";

export default function CheckStockPage() {
  const [scanner, setScanner] = useState(false);
  return (
    <div className="gap-4 mx-5 my-3 ">
      <div className="laptop:flex flex-row gap-4 justify-around">
        <div className="w-3/6 mobile:hidden laptop:block">
          <p className="mb-5">Type the barcode to check the stock</p>
          <div className="pr-[20%] pl-[5%]">
            <InputCheckStock />
          </div>
        </div>
        <div className="divider divider-horizontal mobile:hidden laptop:flex">
          OR
        </div>
        <div className="flex flex-col justify-center items-center gap-5 laptop:w-3/6 mobile:w-full">
          <p>Scan the barcode to check the stock</p>
          <div className="flex justify-center items-center mobile:h-[28rem] mobile:w-72 tablet:h-[45rem] tablet:w-96 laptop:h-full laptop:w-96">
            {scanner ? (
              <Scanner />
            ) : (
              <BiBarcodeReader className="text-[24rem]" />
            )}
          </div>
          <div
            className={`btn laptop:w-3/6 mobile:w-52 btn-primary btn-lg`}
            onClick={() => {
              setScanner(!scanner);
            }}
          >
            {scanner ? "Stop Scanner" : "Start Scanner"}
          </div>
        </div>
      </div>
    </div>
  );
}
