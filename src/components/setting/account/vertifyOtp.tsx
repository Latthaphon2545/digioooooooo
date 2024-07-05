"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { sendOtp } from "../../../lib/sentOTP";

interface VerifyOtpProps {
  phoneNumber: string;
  referenceNumber: string;
  setShowModal: (value: boolean) => void;
  setValue: (value: string) => void;
  email: string;
}

export function VertifyOtp({
  phoneNumber,
  referenceNumber,
  setShowModal,
  setValue,
  email,
}: VerifyOtpProps) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [reSendOtp, setResendOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [refNum, setRefNum] = useState(referenceNumber);

  useEffect(() => {
    if (timeLeft === 0) {
      setResendOtp(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (error) {
      const setErrorTimeout = setTimeout(() => {
        setError(false);
      }, 4000);
      return () => clearTimeout(setErrorTimeout);
    }
  }, [error]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log(otp);
      const res = await axios.post("/api/otp/verifyOTP", {
        otp: otp,
        refNum: refNum,
      });

      if (res.status === 200) {
        setValue(phoneNumber);
        setShowModal(false);
      }
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-2 px-5">
      <div className="flex flex-col justify-center items-center gap-2">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-xs">
              Please enter the OTP sent to your mobile number
            </span>
          </div>
          <input
            type="number"
            className={`input input-bordered w-full max-w-xs text-center ${
              error ? "input-error" : ""
            }`}
            placeholder="XXXXXX"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            min={0}
            max={999999}
          />
          <div className="label">
            <span className="label-text-alt text-error">
              {error && "OTP verification failed"}
            </span>
          </div>
        </label>
      </div>

      <div className="flex flex-row gap-2 text-xs">
        <div>
          <span className="text-xs">Ref Number: </span>
          <span className="text-xs text-primary">{refNum}</span>
        </div>
      </div>

      <div className="flex flex-row gap-2 text-xs">
        <div>
          <span className="countdown font-mono text-4xl">{timeLeft}</span>
          sec
        </div>
      </div>

      <div className="flex flex-row gap-2 text-xs">
        <button
          className={`btn btn-xs ${!reSendOtp && "btn-disabled"}`}
          onClick={async () => {
            setResendLoading(true);
            await sendOtp({
              email: email,
              setRefNum,
              setTimeLeft,
              setResendOtp,
            });
            setResendLoading(false);
          }}
        >
          {resendLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <span>Resend OTP</span>
          )}
        </button>
      </div>

      <button
        className={`btn btn-sm btn-success`}
        onClick={handleSubmit}
        disabled={reSendOtp}
      >
        {loading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <span>Submit</span>
        )}
      </button>
    </div>
  );
}
