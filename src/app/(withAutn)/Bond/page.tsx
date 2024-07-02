import ModelInputForm from "@/components/modelForm/inputForm";
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
        <ModelInputForm />
      </div>
    </div>
  );
};

export default BondPage;
