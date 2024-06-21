import React, { useEffect, useState } from "react";
import { ColorProductStatus } from "../table/color";
import { ConvertStatus } from "../convertStatusAndRole";

interface HeaderProps {
  data: any;
}

export default function Header({ data }: HeaderProps) {
  const [serialNumber, setSerialNumber] = useState("");
  const [model, setModel] = useState<any>({});
  const [status, setStatus] = useState("");
  const [merchantName, setMerchantName] = useState("");

  useEffect(() => {
    if (data) {
      setSerialNumber(data.serialNumber || "");
      setModel(data.model || {});
      setStatus(data.status || "");
      setMerchantName((data.merchant && data.merchant.name) || "");
    }
  }, [data]);

  return (
    <div className="stats shadow-lg mobile:stats-vertical tablet:stats-horizontal laptop:stats-horizontal">
      <div className="stat flex justify-center items-center">
        <div className="w-24 rounded-full">
          <img src={model.image} />
        </div>
        <div className="flex flex-col gap-1 ml-2 w-full">
          <div className="stat-value">{model.series}</div>
          <div className="stat-title">Model</div>
          <div className="stat-desc">{serialNumber.slice(0, 6) + "XXXX"}</div>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Status</div>
        <div
          className={`stat-value text-${ColorProductStatus(
            ConvertStatus(status)
          )}`}
        >
          {ConvertStatus(status)}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Merchant</div>
        <div className="stat-value text-primary">{`${
          merchantName.length > 10
            ? `${merchantName.slice(0, 10)}...`
            : merchantName
            ? merchantName
            : "-"
        }`}</div>
      </div>
    </div>
  );
}
