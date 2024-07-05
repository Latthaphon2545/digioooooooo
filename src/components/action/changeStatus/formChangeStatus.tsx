import SubmitPopupButton from "@/components/submitPopupButton";
import ViewImg from "@/components/table/historyProduct/view/historyProductViewImg";
import { changeStatus } from "@/lib/actions/changeStatus/action";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState } from "react-dom";

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
    </a>
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <>
      <form action={changeProductStatus}>
        <div className="flex flex-col items-center gap-5 laptop:h-[25vw] laptop:w-full mobile:w-80 tablet:w-full">
          {/* Description */}
          <textarea
            className="textarea textarea-bordered laptop:h-56 desktop:h-80 mobile:h-44 w-full"
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
            autoFocus={false}
            name="description"
          ></textarea>

          {/* Status not mobile */}
          <div>
            <div
              role="tablist"
              className="tabs tabs-boxed w-full bg-info block text-center"
            >
              {statuses.map(tapStatus)}
            </div>
            <input type="hidden" value={activeStatus} name="status" />
          </div>

          {/* File */}
          <div className="flex w-full items-center justify-center space-x-4">
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full file-input-info"
              onChange={handleFileChange}
              multiple
              name="images"
            />
            {files.length > 0 && (
              <ViewImg
                id="change_status_image"
                image={files.map((file, index) => URL.createObjectURL(file))}
              />
            )}
          </div>
        </div>
        {/* <button className="btn w-full btn-primary btn-lg" type="submit">
          Submit
        </button> */}
        <SubmitPopupButton
          header="Change Status"
          description="Are you sure you want to change the status of this product?"
          id="change_status"
          styles="btn w-full btn-primary btn-lg mobile:mt-5"
          confirmString="Confirm"
          confirmStyle="btn btn-success"
        >
          Submit
        </SubmitPopupButton>
      </form>
    </>
  );
}
