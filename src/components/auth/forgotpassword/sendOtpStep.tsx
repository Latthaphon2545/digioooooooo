"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiPhone } from "react-icons/ci";

export const ViaStep = () => {
  const [viaEmail, setViaEmail] = useState(false);
  const [viaSMS, setViaSMS] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log(email, phone);
      const res = await axios.post("/api/auth/forgotPassword", {
        email,
        phoneNumber: phone,
      });
      setAlert(res.data.message);
    } catch (e: any) {
      console.log(e);
      setAlert(e.response.data.error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailClick = () => {
    setViaEmail(true);
    setViaSMS(false);
  };

  const handleSMSClick = () => {
    setViaEmail(false);
    setViaSMS(true);
  };

  return (
    <>
      <div className="text-base text-center">
        {!viaEmail && !viaSMS
          ? "Pick a method to reset your password"
          : " No worries, we'll send OTP to your reset password"}
      </div>

      {viaEmail === false && viaSMS === false ? (
        <div className="flex flex-col gap-5">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-value">Email</div>
              <div className="stat-desc">Send OTP to your email</div>
              <div
                className="stat-figure btn btn-primary btn-outline"
                onClick={handleEmailClick}
              >
                Choose
              </div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-value">SMS</div>
              <div className="stat-desc">Send OTP to your phone</div>
              <div
                className="stat-figure btn btn-primary btn-outline"
                onClick={handleSMSClick}
              >
                Choose
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {viaEmail && (
            <>
              <label className="input input-bordered flex items-center">
                <input
                  type="text"
                  className="grow"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <span className="badge badge-primary badge-lg">
                  @digio.co.th
                </span>
              </label>

              <div className="flex items-center gap-2">
                <p>Can change send OTP to </p>
                <p onClick={handleSMSClick} className="link">
                  SMS
                </p>
              </div>
            </>
          )}
          {viaSMS && (
            <>
              <label className="input input-bordered flex items-center gap-2">
                <CiPhone />
                <input
                  type="text"
                  className="grow"
                  placeholder="0XXXXXXX"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </label>

              <div className="flex items-center gap-2">
                <p>Can change send OTP to </p>
                <p onClick={handleEmailClick} className="link">
                  EMAIL
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col items-end">
          {alert && (
            <div
              className={`text-base ${error ? "text-error" : "text-success"}`}
            >
              {alert}
            </div>
          )}
        </div>
        <div>
          {viaEmail || viaSMS ? (
            <div className="flex flex-col gap-4 justify-center items-center">
              <button onClick={handleSubmit} className="btn btn-primary w-full">
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Send OTP"
                )}
              </button>
              <button
                onClick={() => {
                  router.push("/login");
                }}
                className="btn btn-sm btn-ghost w-fit"
              >
                Login
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
