"use client";

import React, { useState } from "react";
import useBarcodeDetection from "use-barcode-detection";
import { MdMotionPhotosOn } from "react-icons/md";
import { MdMotionPhotosOff } from "react-icons/md";

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [barcodes, setBarcodes] = useState(
    "No barcode detected. Click 'Start' to scan."
  );

  const onDetected = (barcodes: string[]) => {
    setBarcodes(barcodes[0]);
    setIsScanning(false);
    // if (confirm(`Do you want to check the stock of ${barcodes[0]} ?`)) {
    //   console.log("Checking stock...");
    // }
  };

  const { ref } = useBarcodeDetection({
    interval: 150,
    active: isScanning,
    onDetected,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <video ref={ref} autoPlay playsInline muted className="mt-3" />
      <button onClick={() => setIsScanning(!isScanning)} className="btn">
        {isScanning ? (
          <>
            <MdMotionPhotosOff className="mr-2" size={30} />
            Stop
          </>
        ) : (
          <>
            <MdMotionPhotosOn className="mr-2" size={30} />
            Start
          </>
        )}
      </button>

      <p>{barcodes}</p>
    </div>
  );
}
