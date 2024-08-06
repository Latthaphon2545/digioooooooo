"use client";

import { useEffect, useState } from "react";
import { Error, I, Success, Warning } from "../../alertDialog";
import { CheckStock } from "@/lib/actions/checkStock/action";

export default function InputCheckStock() {
  const [sn, setSn] = useState(Array(8).fill(""));
  const [status, setStatus] = useState(Array(8).fill("")); // New state to track status
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSn = [...sn];
    newSn[index] = e.target.value;
    setSn(newSn);
  };

  const handleSetStatus = (index: number, newStatus: any) => {
    setStatus((prevStatus) => {
      const newStatuses = [...prevStatus];
      newStatuses[index] = newStatus;
      return newStatuses;
    });
  };

  const handleCheckStock = async () => {
    try {
      setLoading(true);
      await Promise.all(
        sn.map(async (sn, index) => {
          if (!sn || sn === "") {
            handleSetStatus(index, I);
            return;
          }
          const res = await CheckStock({
            code: sn,
            handleSetStatus,
            index,
          });
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timers = status.map((status, index) => {
      if (status === Success) {
        return setTimeout(() => {
          setStatus((prevStatus) => {
            const newStatus = [...prevStatus];
            newStatus[index] = "";
            return newStatus;
          });
        }, 3000);
      }
      return null;
    });

    return () => {
      timers.forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [status]);

  const showTooltip = (status: any) => {
    if (status === I) return "Please enter a serial number";
    if (status === Error) return "Product not found";
    if (status === Warning)
      return "SN has been checked for stock within the past month";
  };

  return (
    <div className="flex flex-col justify-between items-center gap-4">
      <div className="flex flex-col gap-4">
        {sn.map((barcode, index) => (
          <li key={index} className="flex flex-col w-[30vw] ">
            <label className="input input-bordered flex items-center">
              <input
                type="text"
                className="grow w-full"
                placeholder="Serial Number...."
                value={barcode}
                onChange={(e) => handleInputChange(e, index)}
              />
              {status[index] && (
                <span
                  className={`ml-2 tooltip ${
                    status[index] === Success
                      ? "text-success"
                      : status[index] === Error
                      ? "text-error"
                      : status[index] === Warning
                      ? "text-warning"
                      : ""
                  }`}
                  data-tip={showTooltip(status[index])}
                >
                  <button>{status[index]}</button>
                </span>
              )}
            </label>
          </li>
        ))}
      </div>

      <button
        className={`btn btn-${
          loading ? "block" : "primary"
        } laptop:w-3/6 mobile:w-full tablet:w-full btn-primary btn-lg`}
        onClick={handleCheckStock}
        disabled={loading}
      >
        {loading ? (
          <div className="loading loading-dots loading-lg"></div>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
}
