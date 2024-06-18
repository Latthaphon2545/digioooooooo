"use client";

import { useState } from "react";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import AlertDialog, { Error, Success, Warning } from "../../alertDialog";
import axios from "axios";

export default function Scanner() {
  const [code, setCode] = useState("");
  const [process, setProcess] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const showAlert = (title: string, styles: string, icon?: React.ReactNode) => {
    setAlertTitle(title);
    setAlertStyles(styles);
    setAlertIcon(icon);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const checkStock = async (code: string) => {
    try {
      setProcess(true);
      setCode(code);
      const res = await axios.post("/api/products/checkStock", {
        sn: code,
        user: "6650666b7e05719e52aabef7",
      });
      const data = await res.data;
      if (res.status === 200) {
        showAlert(data.message, "alert-success mobile:bg-success", Success);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 404) {
        showAlert(
          error.response.data.message,
          "alert-error mobile:bg-error",
          Error
        );
      } else if (error.response.status === 400) {
        showAlert(
          error.response.data.message,
          "alert-warning mobile:bg-warning",
          Warning
        );
      }
    } finally {
      setTimeout(() => {
        setProcess(false);
        setCode("");
      }, 500);
    }
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
        <BarcodeScanner
          options={{ formats: ["code_128"] }}
          onCapture={(code) => {
            checkStock(code.rawValue);
          }}
        />
      )}
      <div>
        {alert && (
          <AlertDialog
            title={alertTitle}
            styles={alertStyles}
            icon={alertIcon}
          />
        )}
      </div>
    </div>
  );
}
