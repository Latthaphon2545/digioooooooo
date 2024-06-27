import React from "react";
import Account from "./account/account";

export default function SettingPage() {
  return (
    <>
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
          <Account
            account={{
              email: "asd",
              password: "das",
              role: "asd",
              status: "asd",
              name: "asd",
              contact: "asd",
            }}
          />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Coming Soon Ja....."
        />
        <div role="tabpanel" className="tab-content p-10">
          Coming Soon Ja.........
        </div>
      </div>
    </>
  );
}
