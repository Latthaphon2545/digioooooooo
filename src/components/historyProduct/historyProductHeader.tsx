import React, { useEffect, useState } from "react";

interface HeaderProps {
  data: any;
}

export default function Header({ data }: HeaderProps) {
  const [serialNumber, setSerialNumber] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("");
  const [merchantName, setMerchantName] = useState("");

  useEffect(() => {
    if (data) {
      setSerialNumber(data.serialNumber || "");
      setModel((data.model && data.model.series) || "");
      setStatus(data.status || "");
      setMerchantName((data.merchant && data.merchant.name) || "");
    }
  }, [data]);

  return (
    <div className="card card-side bg-base-100 shadow-xl w-1/3 mt-3">
      <figure className="w-28 h-[18vh]">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          alt="Movie"
          className="h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {model}
          <span className="text-xs text-gray-400">({serialNumber})</span>
        </h2>
        <p className="flex flex-col gap-2">
          <span>{convertStatus(status)}</span>
          <span>{merchantName}</span>
        </p>
      </div>
    </div>
  );
}

const convertStatus = (status: string) => {
  let showStatus = "";
  if (status === "INSTOCK") {
    showStatus = "In Stock";
  } else if (status === "LOST") {
    showStatus = "Lost";
  } else if (status === "DAMAGED") {
    showStatus = "Damaged";
  } else if (status === "REPARING") {
    showStatus = "Repairing";
  } else if (status === "WAITREPAIR") {
    showStatus = "Waiting For Repair";
  } else if (status === "INSTALLED") {
    showStatus = "Installed";
  } else if (status === "INSTALLING") {
    showStatus = "Installing";
  }
  return showStatus;
};
