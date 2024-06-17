"use client";

import React, { useState } from "react";
import { BiBarcodeReader } from "react-icons/bi";
import Scanner from "./scanner";
import FormChangeStatus from "./formChangeStatus";

export default function ChangeStatusPage() {
  const [scanner, setScanner] = useState(false);
  const [nextStepBtn, setNextStepBtn] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [findingProduct, setFindingProduct] = useState(false);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleBack = () => {
    setNextStepBtn(false);
    setScanner(false);
    setNextStep(false);
    setFindingProduct(false);
  };

  return (
    <div>
      <p className="text-start mx-5 mb-10">
        Please scan the barcode to check the stock and change the status.
      </p>

      <div className="flex flex-col justify-center items-center gap-5 ">
        {!nextStepBtn && (
          <>
            <div className="flex justify-center items-center h-[25vw] w-[25vw]">
              {scanner ? (
                <Scanner
                  setNextStep={setNextStepBtn}
                  setCode={setCode}
                  setMessage={setMessage}
                  setFindingProduct={setFindingProduct}
                />
              ) : (
                <BiBarcodeReader className="text-[25vw]" />
              )}
            </div>
            <button
              className={`btn w-3/6 btn-primary btn-lg`}
              onClick={() => {
                setScanner(!scanner);
              }}
              disabled={findingProduct}
            >
              {findingProduct
                ? "Finding Product..."
                : scanner
                ? "Stop Scanner"
                : "Start Scanner"}
            </button>
          </>
        )}

        {nextStepBtn && !nextStep && (
          <>
            <div
              className={`flex flex-col justify-center items-center h-[25vw] w-[25vw] ${
                message === "Click next to continue"
                  ? "text-success"
                  : "text-error"
              }`}
            >
              <h1 className="text-3xl">{code}</h1>
              <h1>{message}</h1>
            </div>
            <button
              className="btn w-3/6 btn-primary btn-lg"
              onClick={() => {
                setNextStep(true);
              }}
              disabled={!findingProduct}
            >
              {findingProduct ? "Next" : "Please try again"}
            </button>
            <div className="link text-center w-3/6" onClick={handleBack}>
              Back
            </div>
          </>
        )}

        {nextStep && (
          <>
            <FormChangeStatus sn={code} />
            <div className="link text-center w-3/6" onClick={handleBack}>
              Back
            </div>
          </>
        )}
      </div>
    </div>
  );
}
