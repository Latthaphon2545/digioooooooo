"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Error, I, Success, Warning } from "../../alertDialog";

export default function InputCheckStock() {
  const [sn, setSn] = useState(["", "", "", "", "", "", "", "", ""]);
  const [status, setStatus] = useState(Array(9).fill("")); // New state to track status
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

  const submit = async () => {
    if (!confirm("Are you sure you want to submit?")) return;

    try {
      setLoading(true);
      await Promise.all(
        sn.map(async (sn, index) => {
          try {
            if (!sn) {
              handleSetStatus(index, I);
              return; // Skip further processing
            }

            const res = await axios.post("/api/products/checkStock", {
              sn: sn,
              user: "6650666b7e05719e52aabef7",
            });
            handleSetStatus(index, Success);
            handleInputChange({ target: { value: "" } } as any, index);
          } catch (error: any) {
            if (error.response.status === 404) {
              handleSetStatus(index, Error);
            } else if (error.response.status === 400) {
              handleSetStatus(index, Warning);
            }
          }
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
    <div className="flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        {sn.map((barcode, index) => (
          <li key={index} className="flex flex-col gap-2">
            <label className="input input-bordered flex items-center gap-2">
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
        className={`btn btn-${loading ? "block" : "primary"}`}
        onClick={submit}
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
