"use client";

import { useState } from "react";
import AlertDialog from "../../alertDialog";
import BarcodeScan from "@/components/scaner/barcodeScan";
import { CheckStock } from "@/lib/actions/checkStock/action";

export default function Scanner() {
  const [code, setCode] = useState("");
  const [process, setProcess] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const handleCheckStock = async (code: string) => {
    const res = await CheckStock({
      setProcess,
      setCode,
      code,
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
    });
  };

  return (
    <div>
      {process ? (
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-dots loading-lg"></div>
          <p className="text-center flex flex-col gap-3">
            <span className="text-sm text-gray-500">
              Checking stock for barcode:{" "}
            </span>
            <span className="font-bold text-xl">{code}</span>
            <span className="text-sm text-warning">
              process will take a few seconds, please wait...
            </span>
          </p>
        </div>
      ) : (
        <BarcodeScan
          action={(code) => {
            handleCheckStock(code);
          }}
        />
      )}

      <AlertDialog
        alertTitle={alertTitle}
        styles={alertStyles}
        icon={alertIcon}
        id="alertScanner"
        setAlertTitle={setAlertTitle}
      />
    </div>
  );
}
