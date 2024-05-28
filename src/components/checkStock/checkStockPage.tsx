"use client";

import { useState } from "react";
import InputCheckStock from "./inputCheckStock";
import Scanner from "./scaner";

export default function CheckStockPage() {
  const [openScanner, setOpenScanner] = useState(false);
  return (
    <div className="flex flex-col gap-4 mx-5">
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setOpenScanner(!openScanner);
          }}
        >
          {openScanner ? "Input Serial Number" : "Scan Serial Number"}
        </button>
      </div>
      <div>
        {!openScanner && <InputCheckStock />}
        {openScanner && <Scanner />}
      </div>
    </div>
  );
}
