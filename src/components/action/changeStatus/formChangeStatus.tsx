import React, { useState } from "react";

const statuses = [
  "In Stock",
  "Lost",
  "Damaged",
  "Repairing",
  "Wait Repair",
  "Installed",
  "Installing",
];

export default function FormChangeStatus() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null); // Changed to store a single File instead of FileList
  const [activeStatus, setActiveStatus] = useState("In Stock");

  const tapStatus = (status: string) => (
    <a
      role="tab"
      key={status}
      className={`tab ${status === activeStatus ? "bg-white text-black" : ""}`}
      onClick={() => setActiveStatus(status)}
    >
      {status}
    </a>
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); // Store the first selected file
    }
  };

  const submit = () => {
    console.log(description, file, activeStatus);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 h-[25vw] w-[40vw]">
        {/* Description */}
        <textarea
          className="textarea textarea-bordered h-[60%] w-full"
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Status */}
        <div role="tablist" className="tabs tabs-boxed w-full  bg-info">
          {statuses.map(tapStatus)}
        </div>

        {/* File */}
        <input
          type="file"
          className="file-input file-input-bordered w-full file-input-info"
          onChange={handleFileChange}
        />
      </div>
      <button className="btn w-3/6 btn-primary btn-lg" onClick={submit}>
        Submit
      </button>
    </>
  );
}
