import ViewImg from "@/components/historyProduct/historyProductViewImg";
import SubmitPopupButton from "@/components/submitPopupButton";
import { changeStatus } from "@/lib/actions/changeStatus/action";
import Image from "next/image";
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

export default function FormChangeStatus({ sn }: { sn: string }) {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [activeStatus, setActiveStatus] = useState("In Stock");

  const changeProductStatus = changeStatus.bind(null, sn);

  const tapStatus = (status: string) => (
    <a
      role="tab"
      key={status}
      className={`tab ${status === activeStatus ? "bg-white text-black" : ""}`}
      onClick={() => setActiveStatus(status)}
    >
      {status}
      <input type="text" hidden value={activeStatus} name="status" />
    </a>
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const submit = () => {
    console.log(description, files, activeStatus);
  };

  return (
    <>
      <form action={changeProductStatus}>
        <div className="flex flex-col justify-center items-center gap-5 h-[25vw] w-[40vw]">
          {/* Description */}
          <textarea
            className="textarea textarea-bordered h-[60%] w-full"
            placeholder="Description..."
            //onChange={(e) => setDescription(e.target.value)}
            name="description"
          ></textarea>

          {/* Status */}
          <div role="tablist" className="tabs tabs-boxed w-full  bg-info">
            {statuses.map(tapStatus)}
          </div>

          {/* File */}
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full file-input-info"
            onChange={handleFileChange}
            multiple
            name="images"
          />

          {/* <ViewImg images={files.map((file, index) => URL.createObjectURL(file))} /> */}
        </div>
        {/* <button className="btn w-full btn-primary btn-lg" type="submit">
          Submit
        </button> */}
        <SubmitPopupButton
          header="Change Status"
          description="Are you sure you want to change the status of this product?"
          id="change_status"
          styles="btn w-full btn-primary btn-lg"
        >
          Submit
        </SubmitPopupButton>
      </form>
    </>
  );
}
