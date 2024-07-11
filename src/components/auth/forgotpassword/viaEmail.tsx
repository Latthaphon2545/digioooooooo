import React from "react";

export default function ViaEmail({
  setEmail,
  handleSMSClick,
}: {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSMSClick: () => void;
}) {
  return (
    <>
      <label className="input input-sm input-bordered flex items-center gap-2 relative">
        <input
          type="text"
          className="grow"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <span className="absolute top-[-1] right-0 bg-primary rounded-r-lg text-white laptop:px-5 mobile:px-1">
          @digio.co.th
        </span>
      </label>

      {/* <div className="flex items-center justify-center gap-2">
        <p>Can change send OTP to </p>
        <p onClick={handleSMSClick} className="link">
          SMS
        </p>
      </div> */}
    </>
  );
}
