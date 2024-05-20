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
    <div className="flex flex-row min-h-screen">
      <div className="w-full p-5">
        <InputForm />
      </div>
    </div>
  );
};

export default BondPage;
