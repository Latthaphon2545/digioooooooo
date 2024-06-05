import { useState } from "react";

interface HaederProps {
  data: {
    [key: string]: any;
  };
}

export default function Header({ data }: HaederProps) {
  const [serialNumber, setSerialNumber] = useState(data.serialNumber);
  const [model, setModel] = useState(data.model);
  const [status, setStatus] = useState(data.status);
  const [merchant, setMerchant] = useState(data.merchant);
  const [series, setSeries] = useState(data.model.series);
  const [merchantName, setMerchantName] = useState(data.merchant.name || "");

  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl w-1/3 mt-3">
        <figure className="w-28">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
            width={50}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {series}
            <span className="text-xs text-gray-400">({serialNumber})</span>
          </h2>
          <p className="flex flex-col">
            <span>{convertStatus(status)}</span>
            <span>{merchantName}</span>
          </p>
        </div>
      </div>
    </>
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
    showStatus = "Reparing";
  } else if (status === "WAITREPAIR") {
    showStatus = "Waiting For Repair";
  } else if (status === "INSTALLED") {
    showStatus = "Installed";
  } else if (status === "INSTALLING") {
    showStatus = "Installing";
  }
  return showStatus;
};
