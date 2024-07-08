"use client";

import BarcodeScan from "@/components/scaner/barcodeScan";
import axios from "axios";
import { useState } from "react";
import { BarcodeScanner } from "react-barcode-scanner";

export default function Scanner({
  setNextStep,
  setCode,
  setMessage,
  setFindingProduct,
}: {
  setNextStep: (value: boolean) => void;
  setCode: (value: string) => void;
  setMessage: (value: string) => void;
  setFindingProduct: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);

  const checkProduct = async (code: string) => {
    try {
      setLoading(true);
      setFindingProduct(true);
      const res = await axios.get(
        `/api/products/getProduct/findProduct?sn=${code}`
      );
      if (res.status === 200) {
        setMessage("Click next to continue");
        setFindingProduct(true);
      }
    } catch (error: any) {
      setMessage(error.response.data.error);
      setFindingProduct(false);
    } finally {
      setTimeout(() => {
        setNextStep(true);
        setCode(code);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-dots loading-lg"></div>
          <p className="text-center flex flex-col gap-3">Checking product...</p>
        </div>
      ) : (
        <BarcodeScan
          action={(code) => {
            checkProduct(code);
          }}
        />
      )}
    </div>
  );
}
