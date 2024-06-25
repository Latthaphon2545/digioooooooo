import React from "react";

export default function page() {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <div className="justify-between items-center mx-5 mt-5 mb-1 h-14  mobile:hidden laptop:flex">
            <h1 className="text-3xl font-bold">Setting</h1>
          </div>
          <div className="flex justify-end mx-5"></div>
        </div>
      </div>

      <div role="tablist" className="tabs tabs-bordered mx-5">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Account"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Coming soon....."
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 2
        </div>
      </div>
    </>
  );
}
