import React from "react";
import { BarcodeScanner } from "react-barcode-scanner";

export default function BarcodeScan({
  action,
}: {
  action: (code: string) => void;
}) {
  return (
    <BarcodeScanner
      options={{ formats: ["code_128"] }}
      onCapture={(code) => {
        action(code.rawValue);
      }}
    />
  );
}
