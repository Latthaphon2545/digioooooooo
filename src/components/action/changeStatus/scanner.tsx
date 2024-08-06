"use client";

import BarcodeScan from "@/components/scaner/barcodeScan";
import { FindProductWhenChangeStatus } from "@/lib/actions/FindProductWhenChangeStatus/action";
import axios from "axios";
import { useState } from "react";

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
    const res = await FindProductWhenChangeStatus({
      code,
      setLoading,
      setFindingProduct,
      setMessage,
      setNextStep,
      setCode,
    });
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
