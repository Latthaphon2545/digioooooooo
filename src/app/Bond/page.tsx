import InputForm from "@/components/inputForm";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

const BondPage = () => {
  function test() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, 5000);
    });
  }

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-full p-5">
        {/* <AddHeader title="Add User" icon={<BsPersonAdd />} />
        <UserInput /> */}
        <InputForm />
      </div>
    </div>
  );
};

export default BondPage;
