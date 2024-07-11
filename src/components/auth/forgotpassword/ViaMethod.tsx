import React from "react";

export default function ViaMethod({
  handleEmailClick,
  handleSMSClick,
}: {
  handleEmailClick: () => void;
  handleSMSClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-value">Email</div>
          <div className="stat-desc">Send OTP to your email</div>
          <button
            className="stat-figure btn btn-primary btn-outline"
            onClick={handleEmailClick}
          >
            Choose
          </button>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-value">SMS</div>
          <div className="stat-desc">Send OTP to your phone</div>
          <button
            className="stat-figure btn btn-primary btn-outline cursor-not-allowed"
            onClick={handleSMSClick}
            disabled
          >
            Not Available
          </button>
        </div>
      </div>
    </div>
  );
}
