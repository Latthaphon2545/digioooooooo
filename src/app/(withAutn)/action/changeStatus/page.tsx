import ChangeStatusPage from "@/components/action/changeStatus/changeStatusPage";
// import Modal from "@/components/modal";
import React from "react";

export default function page() {
  return (
    <>
      <div className="flex flex-row mx-5">
        <div className="flex flex-col w-full relative">
          <div className="flex items-center gap-2 mt-5 mb-1 h-14 mobile:hidden tablet:hidden laptop:flex desktop:flex">
            <h1 className="text-3xl font-bold">Change Status</h1>
            {/* <Modal
              title="i"
              titleContent="Example"
              content={
                <>
                  <p>
                    Please scan the barcode to check the stock. follow the
                    example below:
                  </p>
                  <ul>
                    <li>1. Scan the barcode or type the barcode</li>
                    <li>2. Click the submit button</li>
                  </ul>
                </>
              }
            /> */}
          </div>
          <div className="flex justify-end mx-5"></div>
          <ChangeStatusPage />
        </div>
      </div>
    </>
  );
}
